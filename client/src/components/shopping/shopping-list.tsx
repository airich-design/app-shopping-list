"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingItem } from "./shopping-item";
import {
  useRewardAnimation,
  RewardAnimationProvider,
} from "../reward-animation/reward-context";
import {
  useShoppingItems,
  useCreateShoppingItem,
  useUpdateShoppingItem,
  useDeleteShoppingItem,
} from "@/hooks/useShoppingItems";
import { Loader2 } from "lucide-react";

function ShoppingListContent() {
  const [newItemName, setNewItemName] = useState("");
  const triggerReward = useRewardAnimation();

  const { data, isLoading } = useShoppingItems();
  const items = data?.data ?? [];
  const sortedItems = [...items].sort((a, b) => {
    if (a.bought === b.bought) return 0;
    return a.bought ? 1 : -1;
  });
  const { mutate: createItem } = useCreateShoppingItem();
  const { mutate: updateItem } = useUpdateShoppingItem();
  const { mutate: deleteItem } = useDeleteShoppingItem();

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    createItem(newItemName.trim());
    setNewItemName("");
  };

  const handleToggleItem = (_id: string, bought: boolean) => {
    updateItem({ id: _id, bought: !bought });

    // Check if this was the last unchecked item
    const updatedItems = items.map((item) =>
      item._id === _id ? { ...item, bought: !bought } : item
    );
    const allItemsBought = updatedItems.every((item) => item.bought);

    if (allItemsBought && updatedItems.length > 0) {
      console.log("triggering reward");
      triggerReward();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground"
        >
          <Loader2 className="animate-spin mx-auto my-4" />
          Loading shopping list...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="py-8 container">
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Shopping List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder="Add new item..."
                  className="flex-1"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyUp={handleKeyPress}
                />
                <Button onClick={handleAddItem}>Add</Button>
              </div>

              <motion.div
                className="mt-4 mb-4 space-y-2"
                initial={false}
                animate={{ opacity: 1 }}
              >
                <AnimatePresence mode="popLayout">
                  {sortedItems.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                        opacity: { duration: 0.2 },
                      }}
                    >
                      <ShoppingItem
                        item={item}
                        onToggle={handleToggleItem}
                        onRemove={(_id) => deleteItem(_id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {items.length === 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-muted-foreground"
                  >
                    Your shopping list is empty. Add some items!
                  </motion.p>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export function ShoppingList() {
  return (
    <RewardAnimationProvider>
      <ShoppingListContent />
    </RewardAnimationProvider>
  );
}
