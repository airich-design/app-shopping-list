import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shoppingItemsApi } from "@/lib/api";
import type { ShoppingItemsResponse } from "@shopping-list/shared";
import { SHOPPING_ITEMS_KEY } from "./constants";

export function useCreateShoppingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => shoppingItemsApi.create(name),
    onMutate: async (newItemName) => {
      await queryClient.cancelQueries({ queryKey: [SHOPPING_ITEMS_KEY] });

      const previousItems = queryClient.getQueryData<ShoppingItemsResponse>([
        SHOPPING_ITEMS_KEY,
      ]);

      queryClient.setQueryData<ShoppingItemsResponse>(
        [SHOPPING_ITEMS_KEY],
        (old) => ({
          data: [
            ...(old?.data || []),
            {
              _id: `temp-${Date.now()}`,
              name: newItemName,
              bought: false,
              createdAt: new Date(),
            },
          ],
          message: "Item created successfully",
          success: true,
        })
      );

      return { previousItems };
    },
    onError: (_err, _newItem, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData([SHOPPING_ITEMS_KEY], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SHOPPING_ITEMS_KEY] });
    },
  });
}
