/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */



export interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  flag_emoji: string;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}




// Category Types
export interface CategoryTranslation {
  name: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export interface CategoryWithTranslations extends Omit<Category, 'name' | 'description'> {
  translations: Record<string, CategoryTranslation>;
  current_translation?: CategoryTranslation;
  children?: CategoryWithTranslations[];
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  parent_id?: string;
  description?: string;
  level?: number;
  path?: string;
  is_active?: boolean;
  display_order?: number;
  meta_title?: string;
  meta_description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}




// Brand Types


export interface Brand {
  id: string;
  name: string;
  slug?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  description?: string;
  logo_url?: string;
  is_active?: boolean;
  is_manufacturer?: boolean;
  metadata?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}


// Product Types
export interface ProductTranslation {
  name: string;
  title: string | null;
  description: string;
  metadata_url?: string;
}


export interface ProductWithTranslations extends Omit<Product, 'name' | 'title' | 'description'> {
  translations: Record<string, ProductTranslation>;
  current_translation?: ProductTranslation;
  category?: CategoryWithTranslations;
}

export type ProductState = 'active' | 'phasing_out' | 'discontinued';

export interface Product {
  id: string;
  name: string;
  title?: string;
  sku?: string;
  brand_id?: string;
  category_id: string;
  manufacturer?: string; // Added for completeness
  description: string;
  price: number;
  product_state?: ProductState;
  discount_percentage?: number;
  in_stock: boolean;
  quantity: number;
  image_url: string;
  barcode_id: string;
  attributes: Attributes; // The consolidated metadata json file url  
  metadata_url?: string;
  digital_passport_url: string;
  is_translated?: boolean;
}

// export type Toy = Product;

export interface CartItem extends Product {
  cart_quantity: number;
}
// API Response Types
export interface ProductsResponse {
  data: ProductWithTranslations[];
  total: number;
  page: number;
  limit: number;
}




export interface ProductFilters {
  category_id?: string;
  brand_id?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  product_state?: ProductState;
  search?: string;
}



export type ViewState = "landing" | "store" | "checkout" | "success" | "history" | "product_details" | "admin_dashboard" | "shipper_dashboard" | "operator_dashboard" | "owner_dashboard" | "barcode_scanner" | "about" | "best_sellers" | "contact" | "auth" | "privacy" | "terms" | "track_order";





export interface Order {
  id: string;
  created_at: string;
  total_price: number;
  status: 'pending' | 'accepted' | 'ready' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_method: string;
  shipping_address: string;
  items: OrderItem[];
  is_guest?: boolean;
  user_id: string;
  user_email?: string;
  user_phone?: string;
  status_history?: Record<string, string>;
  payment_id?: string | null;
  payment_status?: string | null;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  original_price?: number;
  discount_percentage: number;
}


// With all fields properly typed and optional where appropriate
export interface DurabilityData {
  life_span?: string;
  reliability?: string;
  reusability?: string;
  refurbishment?: string;
  recycled_content?: string;
}

export interface RepairabilityData {
  ease_of_repair?: string;
  spare_parts?: string;
  maintenance_manual?: string;
}

export interface ManufacturingData {
  origin: string;
  material_composition: string;
  substance_of_concern: string;
}

export interface LifeCycleData {
  carbon_footprint: string;
  environmental_footprint?: string;
  water_usage?: string;
}

export interface PartialMetadata {
  name: string;
  description?: string;
  durability_data?: DurabilityData;
  repairability_data?: RepairabilityData;
  manufacturing_data: ManufacturingData;
  lifecycle_data: LifeCycleData;
  nutritional_info?: NutritionalInfo;
}

export interface ConsolidatedMetadata {
  name: string;
  description?: string;
  partial_metadata: PartialMetadata;
  image_cid: string;
}


export interface Attributes {
  color?: string;
  size?: string;
  material?: string;
  weight?: string;
  gender?: string;
  age_group?: string;
  sku?: string;
  dimensions?: Dimensions;
  [key: string]: any;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}


export interface NutritionalInfo {
  calories: number;
  total_fat: string;
  saturated_fat?: string;
  carbohydrates: string;
  sugars?: string;
  protein: string;
  sodium?: string;
  ingredients?: string[];
  allergens?: string[];
  certifications?: string[];
  main_ingredients?: string[];
}

export interface InitialProductData {
  name: string;
  category: string;
  description: string;
  brand: string;
  manufacturer: string;
  attributes: {
    color: string;
    size: string;
    material: string;
    weight: string;
    sku: string;
    dimensions: Dimensions;
  };
  durability_data: {
    life_span: string;
    reliability: string;
    reusability: string;
    refurbishment: string;
    recycled_content: string;
  };
  repairability_data: {
    ease_of_repair: string;
    spare_parts: string;
    maintenance_manual: string;
  };
  manufacturing_data: {
    origin: string;
    material_composition: string;
    substance_of_concern: string;
  };
  lifecycle_data: {
    carbon_footprint: string;
    environmental_footprint: string;
    water_usage: string;
  };
  nutritional_info?: NutritionalInfo;
}

export interface InitialProductData2 {
  name: string;
  category: string;
  description: string;
  brand: string;
  manufacturer: string;
  attributes: {
    color: string;
    size: string;
    material: string;
    weight: string;
    sku: string;
    dimensions: Dimensions;
  };
  durability_data: {
    life_span: string;
    reliability: string;
    reusability: string;
    refurbishment: string;
    recycled_content: string;
  };
  repairability_data: {
    ease_of_repair: string;
    spare_parts: string;
    maintenance_manual: string;
  };
  manufacturing_data: {
    origin: string;
    material_composition: string;
    substance_of_concern: string;
  };
  lifecycle_data: {
    carbon_footprint: string;
    environmental_footprint: string;
    water_usage: string;
  };
  nutritional_info?: NutritionalInfo;
}





