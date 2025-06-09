// API Response Types
export interface ApiResponse<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
}

// Shopping Item Types
export interface ShoppingItem {
  _id: string; // This will be cast to ObjectId by Mongoose
  name: string;
  bought: boolean;
  createdAt: Date;
}

// Request Types
export interface CreateShoppingItemRequest {
  name: string;
}

export interface UpdateShoppingItemRequest {
  bought: boolean;
}

// Response Types
export interface ShoppingItemResponse extends ApiResponse<ShoppingItem> {}
export interface ShoppingItemsResponse extends ApiResponse<ShoppingItem[]> {}
