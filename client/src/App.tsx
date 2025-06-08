import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { ShoppingItem } from "@shopping-list/shared";
import {
  useShoppingItems,
  useCreateShoppingItem,
  useUpdateShoppingItem,
  useDeleteShoppingItem,
} from "@/hooks/useShoppingItems";
import { Trash2Icon } from "lucide-react";

function App() {
  const [newItemName, setNewItemName] = useState("");

  const { data, isLoading } = useShoppingItems();
  const items = data?.data ?? [];
  const { mutate: createItem } = useCreateShoppingItem();
  const { mutate: updateItem } = useUpdateShoppingItem();
  const { mutate: deleteItem } = useDeleteShoppingItem();

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    createItem(newItemName.trim());
    setNewItemName("");
  };

  const handleToggleItem = (itemId: string, currentBought: boolean) => {
    updateItem({ id: itemId, bought: !currentBought });
  };

  const handleRemoveItem = (itemId: string) => {
    deleteItem(itemId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading shopping list...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
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

            <div className="space-y-4">
              {items.map((item: ShoppingItem) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={item.bought}
                      onCheckedChange={() =>
                        handleToggleItem(item._id, item.bought)
                      }
                    />
                    <span
                      className={`${
                        item.bought ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <Button
                    variant="outline-destructive"
                    size="sm"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              ))}

              {items.length === 0 && (
                <p className="text-center text-gray-500">
                  Your shopping list is empty. Add some items!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
