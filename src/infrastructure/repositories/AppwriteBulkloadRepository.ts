import { IBulkLoadRepository } from "../../domain/repositories/IBulkloadRepository";
import { BulkProductData, Product, UploadResult } from "../../types/types";
import appConfig from '../../config/appConfig';
import { databases } from "../../services/appwrite";
import { Query, ID } from "appwrite";


export class AppwriteBulkloadRepository implements IBulkLoadRepository {


    private databaseId = appConfig.appwrite.databaseId;
    private productsCollection = appConfig.appwrite.collections.products;
    private BATCH_SIZE = 50; // Appwrite limit per request
    private DELAY_BETWEEN_BATCHES = 100; // ms to avoid rate limiting

    async bulkload(products: BulkProductData[]): Promise<UploadResult> {

        const results: UploadResult = {
            success: { appwrite: [] },
            failed: []
        };

        // Process in batches
        for (let i = 0; i < products.length; i += this.BATCH_SIZE) {
            const batch = products.slice(i, i + this.BATCH_SIZE);
            console.log(`Processing batch ${Math.floor(i / this.BATCH_SIZE) + 1}/${Math.ceil(products.length / this.BATCH_SIZE)}`);

            // Process batch in parallel with rate limiting
            const batchResults = await Promise.allSettled(
                batch.map(product => this.uploadSingleProduct(product))
            );

            batchResults.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    results.success.appwrite?.push(result.value);
                } else {
                    results.failed.push({
                        data: batch[index],
                        error: result.reason.message,
                        step: 'appwrite'
                    });
                }
            });

            // Delay between batches to avoid rate limiting
            if (i + this.BATCH_SIZE < products.length) {
                await this.sleep(this.DELAY_BETWEEN_BATCHES);
            }
        }

        return results;
    }

    private async uploadSingleProduct(productData: BulkProductData): Promise<Product> {
        const payload = {
            title: productData.title,
            description: productData.description || '',
            price: productData.price,
            category_id: productData.category_id,
            in_stock: productData.in_stock,
            quantity: productData.quantity,
            image_url: `${appConfig.ipfsGatewayUrl}/ipfs/${productData.image_cid}`, // Or your preferred gateway
            barcode_id: productData.metadata_cid  // Use metadata CID as barcodeId
        };

        // Check if product with this barcodeId already exists
        const existing = await databases.listDocuments(
            this.databaseId,
            this.productsCollection,
            [Query.equal('barcode_id', productData.metadata_cid)]
        );

        if (existing.total > 0) {
            throw new Error(`Product with barcode_id ${productData.metadata_cid} already exists`);
        }

        const doc = await databases.createDocument(
            this.databaseId,
            this.productsCollection,
            ID.unique(),
            payload
        );

        return {
            id: doc.$id,
            name: doc.name || doc.title,
            title: doc.title,
            description: doc.description,
            price: doc.price,
            quantity: doc.quantity,
            image_url: doc.image_url,
            category_id: doc.category_id,
            in_stock: doc.in_stock,
            barcode_id: doc.barcode_id,
            digital_passport_url: doc.digital_passport_url || '',
            attributes: doc.attributes || '',
            discount_percentage: doc.discount_percentage || 0
        };
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

export const appwriteBulkloadRepository = new AppwriteBulkloadRepository();


