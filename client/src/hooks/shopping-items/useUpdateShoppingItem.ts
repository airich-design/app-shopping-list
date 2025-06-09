import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shoppingItemsApi } from "@/lib/api";
import type { ShoppingItemsResponse } from "@shopping-list/shared";
import { SHOPPING_ITEMS_KEY } from "./constants";

export function useUpdateShoppingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, bought }: { id: string; bought: boolean }) =>
      shoppingItemsApi.update(id, bought),
    onMutate: async ({ id, bought }) => {
      await queryClient.cancelQueries({ queryKey: [SHOPPING_ITEMS_KEY] });

      const previousItems = queryClient.getQueryData<ShoppingItemsResponse>([
        SHOPPING_ITEMS_KEY,
      ]);

      queryClient.setQueryData<ShoppingItemsResponse>(
        [SHOPPING_ITEMS_KEY],
        (old) => ({
          data: (old?.data || []).map((item) =>
            item._id === id ? { ...item, bought } : item
          ),
          message: "Item updated successfully",
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
