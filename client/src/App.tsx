import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { ShoppingItem } from "@shopping-list/shared";

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([
    {
      _id: "1",
      name: "Milk",
      bought: false,
      createdAt: new Date(),
    },
    {
      _id: "2",
      name: "Bread",
      bought: true,
      createdAt: new Date(),
    },
    {
      _id: "3",
      name: "Eggs",
      bought: false,
      createdAt: new Date(),
    },
  ]);

  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      _id: crypto.randomUUID(),
      name: newItemName.trim(),
      bought: false,
      createdAt: new Date(),
    };

    setItems((prev) => [...prev, newItem]);
    setNewItemName("");
  };

  const handleToggleItem = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, bought: !item.bought } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

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
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={item.bought}
                      onCheckedChange={() => handleToggleItem(item._id)}
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
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
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
