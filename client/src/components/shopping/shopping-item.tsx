"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2Icon } from "lucide-react";
import { motion } from "framer-motion";
import type { ShoppingItem as ShoppingItemType } from "@shopping-list/shared";

interface ShoppingItemProps {
  item: ShoppingItemType;
  onToggle: (id: string, bought: boolean) => void;
  onRemove: (id: string) => void;
}

export function ShoppingItem({ item, onToggle, onRemove }: ShoppingItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{
        opacity: 0,
        x: 50,
        transition: { duration: 0.2 },
      }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 mb-4 rounded-lg border bg-card text-card-foreground shadow-sm transition-colors"
    >
      <div className="flex items-center gap-3">
        <motion.div whileTap={{ scale: 0.9 }} className="flex items-center">
          <Checkbox
            checked={item.bought}
            onCheckedChange={() => onToggle(item._id, item.bought)}
          />
        </motion.div>
        <motion.span
          animate={{
            opacity: item.bought ? 0.5 : 1,
            textDecoration: item.bought ? "line-through" : "none",
          }}
          transition={{ duration: 0.2 }}
          className="text-foreground"
        >
          {item.name}
        </motion.span>
      </div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline-destructive"
          size="sm"
          onClick={() => onRemove(item._id)}
        >
          <Trash2Icon className="size-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
