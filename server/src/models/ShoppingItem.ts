import { Schema, model } from "mongoose";
import { ShoppingItem as IShoppingItem } from "@shopping-list/shared";

const shoppingItemSchema = new Schema<IShoppingItem>({
  name: { type: String, required: true },
  bought: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const ShoppingItem = model<IShoppingItem>(
  "ShoppingItem",
  shoppingItemSchema
);
