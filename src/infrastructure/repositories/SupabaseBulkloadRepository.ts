
import { IBulkLoadRepository } from "../../domain/repositories/IBulkloadRepository";
import { BulkProductData, UploadResult } from "../../types/types";
import appConfig from '../../config/appConfig';
import { supabase } from "../../services/supabase";


export class SupabaseBulkloadRepository implements IBulkLoadRepository {
    private BATCH_SIZE = 100;

    async bulkload(
        products: BulkProductData[],
    ): Promise<UploadResult> {
        const results: UploadResult = {
            success: { supabase: [] },
            failed: []
        };
        results.success.supabase = [];
        // Step 1: Upload to Supabase in batches
        console.log(`📦 Uploading ${products.length} products to Supabase...`);

        for (let i = 0; i < products.length; i += this.BATCH_SIZE) {
            const batch = products.slice(i, i + this.BATCH_SIZE);
            const batchNumber = Math.floor(i / this.BATCH_SIZE) + 1;
            const totalBatches = Math.ceil(products.length / this.BATCH_SIZE);

            console.log(`Processing Supabase batch ${batchNumber}/${totalBatches}`);

            const supabaseResults = await this.uploadToSupabaseBatch(batch);

            // Track Supabase successes and failures
            supabaseResults.success.forEach(result => {
                results.success.supabase!.push(result);
            });

            supabaseResults.failed.forEach(failure => {
                results.failed.push({
                    ...failure,
                    step: 'supabase'
                });
            });

            // Small delay between batches
            if (i + this.BATCH_SIZE < products.length) {
                await this.sleep(100);
            }
        }

        console.log(`✅ Supabase upload complete: ${results.success.supabase!.length} succeeded, ${results.failed.filter(f => f.step === 'supabase').length} failed`);
        return results;
    }

    private async uploadToSupabaseBatch(products: BulkProductData[]): Promise<{
        success: any[];
        failed: { data: BulkProductData; error: string }[];
    }> {
        const success = [];
        const failed = [];

        // Prepare data for Supabase
        const supabaseData = products.map(product => ({
            name: product.name,
            description: product.description || '',
            price: product.price,
            category_id: product.category_id,
            in_stock: product.in_stock,
            quantity: product.quantity,
            image_url: `${appConfig.ipfsGatewayUrl}/ipfs/${product.image_cid}`,
            barcode_id: product.metadata_cid,
            metadata: product.attributes || {},
            metadata_url: `${appConfig.ipfsGatewayUrl}/ipfs/${product.metadata_cid}`
        }));

        try {
            // Use Supabase's upsert to handle duplicates gracefully
            const { data, error } = await supabase
                .from('products')
                .upsert(supabaseData, {
                    onConflict: 'barcode_id', // Skip if barcode_id already exists
                    ignoreDuplicates: true
                })
                .select();

            if (error) {
                // If batch fails, try individual inserts
                console.warn('Batch insert failed, trying individual inserts...');

                for (const product of products) {
                    try {
                        const { data: singleData, error: singleError } = await supabase
                            .from('products')
                            .insert({
                                name: product.name,
                                description: product.description || '',
                                price: product.price,
                                category_id: product.category_id,
                                in_stock: product.in_stock,
                                quantity: product.quantity,
                                image_url: `${appConfig.ipfsGatewayUrl}/ipfs/${product.image_cid}`,
                                barcode_id: product.metadata_cid,
                                metadata: product.attributes || {},
                                metadata_url: `${appConfig.ipfsGatewayUrl}/ipfs/${product.metadata_cid}`
                            })
                            .select()
                            .single();

                        if (singleError) {
                            failed.push({ data: product, error: singleError.message });
                        } else {
                            success.push(singleData);
                        }
                    } catch (err) {
                        failed.push({ data: product, error: (err as Error).message });
                    }
                }
            } else {
                success.push(...(data || []));
            }
        } catch (err) {
            console.error('Batch upload error:', err);
            // Mark all products in batch as failed
            products.forEach(product => {
                failed.push({ data: product, error: (err as Error).message });
            });
        }

        return { success, failed };
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

export const supabaseBulkloadRepository = new SupabaseBulkloadRepository();


