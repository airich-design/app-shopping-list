import axios from "axios";
import type {
  ApiResponse,
  ShoppingItemResponse,
  ShoppingItemsResponse,
} from "@shopping-list/shared";
import { API_ENDPOINTS } from "./constants";

// Create axios instance
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// API Functions
export const shoppingItemsApi = {
  getAll: async () => {
    const { data } = await api.get<ShoppingItemsResponse>(API_ENDPOINTS.ITEMS);
    return data;
  },

  create: async (name: string) => {
    const { data } = await api.post<ShoppingItemResponse>(API_ENDPOINTS.ITEMS, {
      name,
    });
    return data;
  },

  update: async (id: string, bought: boolean) => {
    const { data } = await api.put<ShoppingItemResponse>(
      API_ENDPOINTS.ITEM(id),
      { bought }
    );
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse>(API_ENDPOINTS.ITEM(id));
    return data;
  },
};
