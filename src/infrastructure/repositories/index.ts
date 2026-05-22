import appConfig from "../../config/appConfig";
import { supabaseProductRepository } from "./SupabaseProductRepository";
import { appwriteProductRepository } from "./AppwriteProductRepository";
import { supabaseOrderRepository } from "./SupabaseOrderRepository";
import { appwriteOrderRepository } from "./AppwriteOrderRepository";
import { supabaseAuthRepository } from "./SupabaseAuthRepository";
import { appwriteAuthRepository } from "./AppwriteAuthRepository";
import { supabaseAdminRepository } from "./SupabaseAdminRepository";
import { appwriteAdminRepository } from "./AppwriteAdminRepository";
import { supabaseShipperRepository } from "./SupabaseShipperRepository";
import { appwriteShipperRepository } from "./AppwriteShipperRepository";
import { supabaseOperatorRepository } from "./SupabaseOperatorRepository";
import { appwriteOperatorRepository } from "./AppwriteOperatorRepository";

/**
 * Hybrid Configuration:
 * - Auth & Roles: Supabase
 * - Database: Appwrite (or Supabase based on config)
 */
const dbProvider = appConfig.databaseProvider;

// Auth is hardcoded to Supabase as per user request
export const authRepository = supabaseAuthRepository;

// Database repositories use the provider from config (Appwrite in this case)
export const productRepository = dbProvider === 'appwrite' ? appwriteProductRepository : supabaseProductRepository;
export const orderRepository = dbProvider === 'appwrite' ? appwriteOrderRepository : supabaseOrderRepository;

// Admin and Shipper are special: Data comes from DB provider, but Roles come from Supabase
// We'll use the Appwrite implementations for data, but we might need to tweak their checkIsAdmin methods
export const adminRepository = dbProvider === 'appwrite' ? appwriteAdminRepository : supabaseAdminRepository;
export const shipperRepository = dbProvider === 'appwrite' ? appwriteShipperRepository : supabaseShipperRepository;
export const operatorRepository = dbProvider === 'appwrite' ? appwriteOperatorRepository : supabaseOperatorRepository;