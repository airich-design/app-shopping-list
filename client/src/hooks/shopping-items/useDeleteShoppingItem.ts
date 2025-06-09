import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shoppingItemsApi } from "@/lib/api";
import type { ShoppingItemsResponse } from "@shopping-list/shared";
import { SHOPPING_ITEMS_KEY } from "./constants";

export function useDeleteShoppingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => shoppingItemsApi.delete(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: [SHOPPING_ITEMS_KEY] });

      const previousItems = queryClient.getQueryData<ShoppingItemsResponse>([
        SHOPPING_ITEMS_KEY,
      ]);

      queryClient.setQueryData<ShoppingItemsResponse>(
        [SHOPPING_ITEMS_KEY],
        (old) => ({
          data: (old?.data || []).filter((item) => item._id !== deletedId),
          message: "Item deleted successfully",
          success: true,
        })
      );

      return { previousItems };
    },
    onError: (_err, _deletedId, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData([SHOPPING_ITEMS_KEY], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [SHOPPING_ITEMS_KEY] });
    },
  });
}
