import {openDB, DBSchema, IDBPDatabase} from "idb";

interface AppDBSchema extends DBSchema {
  items: {
    key: string;
    value: any;
  };
}

const initDB = async (): Promise<IDBPDatabase<AppDBSchema>> => {
  try {
    return await openDB<AppDBSchema>("_appdb", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("items")) {
          db.createObjectStore("items", {keyPath: "id"});
        }
      },
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    throw new Error("Database initialization failed");
  }
};

const indexedDbAddItem = async (data: {id: string; [key: string]: any}) => {
  if (!data || !data.id) {
    return {success: false, message: "Invalid data: id is required"};
  }

  try {
    const db = await initDB();
    await db.put("items", data);
    return {success: true, message: "Item added successfully"};
  } catch (error) {
    console.error("Error adding item:", error);
    return {success: false, message: "Failed to add item"};
  }
};

const indexedDbGetItem = async (id: string) => {
  if (!id) {
    return {success: false, message: "Invalid id: id is required"};
  }

  try {
    const db = await initDB();
    const item = await db.get("items", id);
    if (item) {
      return {success: true, data: item};
    } else {
      return {success: false, message: "Item not found"};
    }
  } catch (error) {
    console.error("Error getting item:", error);
    return {success: false, message: "Failed to get item"};
  }
};

const indexedDbGetAllItems = async () => {
  try {
    const db = await initDB();
    const items = await db.getAll("items");
    return {success: true, data: items};
  } catch (error) {
    console.error("Error getting all items:", error);
    return {success: false, message: "Failed to get items"};
  }
};

const indexedDbUpdateItem = async (id: string, updatedData: any) => {
  if (!id || !updatedData) {
    return {
      success: false,
      message: "Invalid input: id and updatedData are required",
    };
  }

  try {
    const db = await initDB();
    const existingItem = await db.get("items", id);

    if (existingItem) {
      const updatedItem = {...existingItem, ...updatedData};
      await db.put("items", updatedItem);
      return {success: true, message: "Item updated successfully"};
    } else {
      return {success: false, message: "Item not found for update"};
    }
  } catch (error) {
    console.error("Error updating item:", error);
    return {success: false, message: "Failed to update item"};
  }
};

const indexedDbDeleteItem = async (id: string) => {
  if (!id) {
    return {success: false, message: "Invalid id: id is required"};
  }

  try {
    const db = await initDB();
    await db.delete("items", id);
    return {success: true, message: "Item deleted successfully"};
  } catch (error) {
    console.error("Error deleting item:", error);
    return {success: false, message: "Failed to delete item"};
  }
};

const indexedDbClearAllItems = async () => {
  try {
    const db = await initDB();
    await db.clear("items");
    return {success: true, message: "All items cleared successfully"};
  } catch (error) {
    console.error("Error clearing all items:", error);
    return {success: false, message: "Failed to clear items"};
  }
};

export {
  indexedDbAddItem,
  indexedDbGetItem,
  indexedDbGetAllItems,
  indexedDbUpdateItem,
  indexedDbDeleteItem,
  indexedDbClearAllItems,
};
