/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Category {
  id: string;
  title?: string;
  name: string;
  code?: number;
  parentId?: string;
  parent_id?: string;
  path?: string;
}


export interface Brand {
  id: string;
  name: string;
  website?: string;
}
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
  product_state?: 'active' | 'phasing_out' | 'discontinued';
  discount_percentage?: number;
  in_stock: boolean;
  quantity: number;
  image_url: string;
  barcode_id: string;
  attributes: Attributes; // The consolidated metadata json file url  
  metadata_url?: string;
  digital_passport_url: string;
}

// export type Toy = Product;

export interface CartItem extends Product {
  cart_quantity: number;
}

export type ViewState = "landing" | "store" | "checkout" | "success" | "history" | "product_details" | "admin_dashboard" | "shipper_dashboard" | "operator_dashboard" | "barcode_scanner" | "about" | "best_sellers" | "contact" | "auth" | "privacy" | "terms" | "track_order";

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
  durability_data?: DurabilityData;
  repairability_data?: RepairabilityData;
  manufacturing_data: ManufacturingData;
  lifecycle_data: LifeCycleData;
}

export interface ConsolidatedMetadata {
  name: string;
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
  dimensions?: Dimensions
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
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
  },
  durability_data: {
    life_span: string;
    reliability: string;
    reusability: string;
    refurbishment: string,
    recycled_content: string;
  },
  repairability_data: {
    ease_of_repair: string;
    spare_parts: string;
    maintenance_manual: string;
  },
  manufacturing_data: {
    origin: string;
    material_composition: string;
    substance_of_concern: string;
  },
  lifecycle_data: {
    carbon_footprint: string;
    environmental_footprint: string;
    water_usage: string;
  }
};
