import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shoppingItemsApi } from "@/lib/api";
import type { ShoppingItemsResponse } from "@shopping-list/shared";

export const SHOPPING_ITEMS_KEY = "shopping-items";

export function useShoppingItems() {
  return useQuery<ShoppingItemsResponse>({
    queryKey: [SHOPPING_ITEMS_KEY],
    queryFn: () => shoppingItemsApi.getAll(),
  });
}

export function useCreateShoppingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => shoppingItemsApi.create(name),
    onMutate: async (newItemName) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [SHOPPING_ITEMS_KEY] });

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<ShoppingItemsResponse>([
        SHOPPING_ITEMS_KEY,
      ]);

      // Optimistically update to the new value
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
          timestamp: new Date().toISOString(),
        })
      );

      // Return a context object with the snapshotted value
      return { previousItems };
    },
    onError: (_err, _newItem, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousItems) {
        queryClient.setQueryData([SHOPPING_ITEMS_KEY], context.previousItems);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: [SHOPPING_ITEMS_KEY] });
    },
  });
}

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
          timestamp: new Date().toISOString(),
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
          timestamp: new Date().toISOString(),
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
