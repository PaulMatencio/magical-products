import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import {
  authRepository,
  productRepository,
  orderRepository,
  adminRepository,
  shipperRepository,
  operatorRepository,
  ownerRepository
} from '../infrastructure/repositories';
import { browserStorageRepository } from '../infrastructure/repositories/BrowserStorageRepository';
import { eventRepository } from '../infrastructure/events/registry';

// Repositories interfaces
import { IAuthRepository } from '../domain/repositories/IAuthRepository';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';
import { IShipperRepository } from '../domain/repositories/IShipperRepository';
import { IOperatorRepository } from '../domain/repositories/IOperatorRepository';
import { IOwnerRepository } from '../domain/repositories/IOwnerRepository';

// Use Cases
import { AuthenticateUseCase } from '../application/use-cases/auth/AuthenticateUseCase';
import { AccountUseCase } from '../application/use-cases/auth/AccountUseCase';
import { LoadCatalogUseCase } from '../application/use-cases/catalog/LoadCatalogUseCase';
import { UpdateStockUseCase } from '../application/use-cases/catalog/UpdateStockUseCase';
import { ManageOrdersUseCase } from '../application/use-cases/order/ManageOrdersUseCase';
import { AdminUseCase } from '../application/use-cases/admin/AdminUseCase';
import { ProductFormUseCase } from '../application/use-cases/admin/ProductFormUseCase';
import { ShipperUseCase } from '../application/use-cases/shipper/ShipperUseCase';
import { BulkloadUseCase } from '../application/use-cases/operator/BulkloadUseCase';
import { OwnerUseCase } from '../application/use-cases/owner/OwnerUseCase';
import { GenerateInitialProductDataUseCase } from '../application/use-cases/operator/GenerateInitialProductDataUseCase';
import { AppGateway } from '../application/bff/AppGateway';
import { GeminiAnalyzerService } from '../infrastructure/services/GeminiAnalyzerService';

interface DependenciesContextType {
  // Repositories
  authRepository: IAuthRepository;
  productRepository: IProductRepository;
  orderRepository: IOrderRepository;
  adminRepository: IAdminRepository;
  shipperRepository: IShipperRepository;
  operatorRepository: IOperatorRepository;
  ownerRepository: IOwnerRepository;

  // Use Cases / Services
  authenticateUseCase: AuthenticateUseCase;
  accountUseCase: AccountUseCase;
  loadCatalogUseCase: LoadCatalogUseCase;
  updateStockUseCase: UpdateStockUseCase;
  manageOrdersUseCase: ManageOrdersUseCase;
  adminUseCase: AdminUseCase;
  productFormUseCase: ProductFormUseCase;
  shipperUseCase: ShipperUseCase;
  bulkloadUseCase: BulkloadUseCase;
  generateInitialProductDataUseCase: GenerateInitialProductDataUseCase;
  appGateway: AppGateway;
  ownerUseCase: OwnerUseCase;
  geminiAnalyzerService: GeminiAnalyzerService;
}

const DependenciesContext = createContext<DependenciesContextType | undefined>(undefined);

export function DependenciesProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => {
    // Instantiate Use Cases using Repositories
    const authenticateUseCase = new AuthenticateUseCase(authRepository);
    const accountUseCase = new AccountUseCase(authRepository);
    const loadCatalogUseCase = new LoadCatalogUseCase(productRepository, browserStorageRepository);
    const updateStockUseCase = new UpdateStockUseCase(productRepository);
    const manageOrdersUseCase = new ManageOrdersUseCase(orderRepository, eventRepository);
    const adminUseCase = new AdminUseCase(adminRepository);
    const productFormUseCase = new ProductFormUseCase(adminRepository);
    const shipperUseCase = new ShipperUseCase(shipperRepository);
    const bulkloadUseCase = new BulkloadUseCase(adminRepository);
    const generateInitialProductDataUseCase = new GenerateInitialProductDataUseCase();
    const appGateway = new AppGateway(loadCatalogUseCase, manageOrdersUseCase);
    const ownerUseCase = new OwnerUseCase(ownerRepository);
    const geminiAnalyzerService = new GeminiAnalyzerService();

    return {
      authRepository,
      productRepository,
      orderRepository,
      adminRepository,
      shipperRepository,
      operatorRepository,
      ownerRepository,
      
      authenticateUseCase,
      accountUseCase,
      loadCatalogUseCase,
      updateStockUseCase,
      manageOrdersUseCase,
      adminUseCase,
      productFormUseCase,
      shipperUseCase,
      bulkloadUseCase,
      generateInitialProductDataUseCase,
      appGateway,
      ownerUseCase,
      geminiAnalyzerService
    };
  }, []);

  return (
    <DependenciesContext.Provider value={value}>
      {children}
    </DependenciesContext.Provider>
  );
}

export function useDependencies() {
  const context = useContext(DependenciesContext);
  if (context === undefined) {
    throw new Error('useDependencies must be used within a DependenciesProvider');
  }
  return context;
}
