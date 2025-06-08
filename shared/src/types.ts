// API Response Types
export interface ApiResponse<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
  timestamp: string;
}

export interface ErrorResponse {
  message: string;
  success: false;
  errors?: ValidationError[];
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

// Shopping Item Types
export interface ShoppingItem {
  _id: string;
  name: string;
  bought: boolean;
  createdAt: Date;
}

export interface CreateShoppingItemRequest {
  name: string;
}

export interface UpdateShoppingItemRequest {
  bought: boolean;
}

export interface ShoppingItemResponse extends ApiResponse<ShoppingItem> {}
export interface ShoppingItemsResponse extends ApiResponse<ShoppingItem[]> {}

// API endpoints
export const API_ENDPOINTS = {
  ITEMS: "/items",
  ITEM: (id: string) => `/items/${id}`,
} as const;
