import { LoadCatalogUseCase } from "../use-cases/catalog/LoadCatalogUseCase";
import { ManageOrdersUseCase } from "../use-cases/order/ManageOrdersUseCase";
import { Order, Product, Category } from "../../types/types";

export interface AppInitialData {
  catalog: {
    products: Product[];
    categories: Category[];
  };
  userContext: {
    recentOrders: Order[];
    isAuthenticated: boolean;
  };
}

/**
 * BFF (Backend-for-Frontend) Gateway / Application Orchestrator.
 * Aggregates multiple use cases and prepares data specifically for the UI.
 */
export class AppGateway {
  constructor(
    private loadCatalogUseCase: LoadCatalogUseCase,
    private manageOrdersUseCase: ManageOrdersUseCase
  ) {}

  /**
   * Aggregates all data needed for the initial application load.
   */
  async getInitialAppData(userId?: string): Promise<AppInitialData> {
    // 1. Fetch catalog and user data in parallel
    const [catalogData, orders] = await Promise.all([
      this.loadCatalogUseCase.execute(),
      userId ? this.manageOrdersUseCase.getOrders() : Promise.resolve([])
    ]);

    // 2. Transform and aggregate into a UI-friendly DTO
    return {
      catalog: {
        products: catalogData.products,
        categories: catalogData.categories
      },
      userContext: {
        recentOrders: orders.slice(0, 5), // Only show the 5 most recent orders in the dashboard/BFF view
        isAuthenticated: !!userId
      }
    };
  }
}
