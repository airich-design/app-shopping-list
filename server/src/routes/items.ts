import { Router, Request, Response, RequestHandler } from "express";
import { ShoppingItem } from "../models/ShoppingItem";
import {
  CreateShoppingItemRequest,
  UpdateShoppingItemRequest,
  ShoppingItemResponse,
  ShoppingItemsResponse,
  ApiResponse,
} from "@shopping-list/shared";

const router = Router();

// GET /items - Get all shopping items
router.get("/", async (_req, res) => {
  try {
    const items = await ShoppingItem.find().sort({ createdAt: -1 });
    const response: ShoppingItemsResponse = {
      data: items,
      message: "Items fetched successfully",
      success: true,
      timestamp: new Date().toISOString(),
    };
    res.json(response);
  } catch (error) {
    const response: ShoppingItemsResponse = {
      message: error instanceof Error ? error.message : "Unknown error",
      success: false,
      timestamp: new Date().toISOString(),
    };
    res.status(500).json(response);
  }
});

// POST /items - Create a new shopping item
router.post("/", async (req, res) => {
  try {
    const { name } = req.body as CreateShoppingItemRequest;
    const newItem = new ShoppingItem({ name });
    const savedItem = await newItem.save();
    const response: ShoppingItemResponse = {
      data: savedItem,
      message: "Item created successfully",
      success: true,
      timestamp: new Date().toISOString(),
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ShoppingItemResponse = {
      message: error instanceof Error ? error.message : "Unknown error",
      success: false,
      timestamp: new Date().toISOString(),
    };
    res.status(400).json(response);
  }
});

// PUT /items/:id - Update item's bought status
router.put("/:id", (async (req, res) => {
  try {
    const { id } = req.params;
    const { bought } = req.body as UpdateShoppingItemRequest;
    const updatedItem = await ShoppingItem.findByIdAndUpdate(
      id,
      { bought },
      { new: true }
    );
    if (!updatedItem) {
      const response: ShoppingItemResponse = {
        message: "Item not found",
        success: false,
        timestamp: new Date().toISOString(),
      };
      return res.status(404).json(response);
    }
    const response: ShoppingItemResponse = {
      data: updatedItem,
      message: "Item updated successfully",
      success: true,
      timestamp: new Date().toISOString(),
    };
    res.json(response);
  } catch (error) {
    const response: ShoppingItemResponse = {
      message: error instanceof Error ? error.message : "Unknown error",
      success: false,
      timestamp: new Date().toISOString(),
    };
    res.status(400).json(response);
  }
}) as RequestHandler<{ id: string }, any, UpdateShoppingItemRequest>);

// DELETE /items/:id - Delete an item
router.delete("/:id", (async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ShoppingItem.findByIdAndDelete(id);
    if (!deletedItem) {
      const response: ShoppingItemResponse = {
        message: "Item not found",
        success: false,
        timestamp: new Date().toISOString(),
      };
      return res.status(404).json(response);
    }
    const response: ApiResponse = {
      message: "Item deleted successfully",
      success: true,
      timestamp: new Date().toISOString(),
    };
    res.json(response);
  } catch (error) {
    const response: ShoppingItemResponse = {
      message: error instanceof Error ? error.message : "Unknown error",
      success: false,
      timestamp: new Date().toISOString(),
    };
    res.status(400).json(response);
  }
}) as RequestHandler<{ id: string }>);

export default router;
