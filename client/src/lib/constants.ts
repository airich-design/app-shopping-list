export const API_ENDPOINTS = {
  ITEMS: "/items",
  ITEM: (id: string) => `/items/${id}`,
} as const;
