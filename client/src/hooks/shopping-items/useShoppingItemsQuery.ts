import { useQuery } from "@tanstack/react-query";
import { shoppingItemsApi } from "@/lib/api";
import type { ShoppingItemsResponse } from "@shopping-list/shared";
import { SHOPPING_ITEMS_KEY } from "./constants";

export function useShoppingItemsQuery() {
  return useQuery<ShoppingItemsResponse>({
    queryKey: [SHOPPING_ITEMS_KEY],
    queryFn: () => shoppingItemsApi.getAll(),
  });
}
