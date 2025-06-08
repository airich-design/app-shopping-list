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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        border: "1px solid #e5e7eb",
        marginBottom: "1rem",
      }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileTap={{ scale: 0.9 }}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
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
        >
          {item.name}
        </motion.span>
      </div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button variant="outline" size="sm" onClick={() => onRemove(item._id)}>
          <Trash2Icon className="size-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
