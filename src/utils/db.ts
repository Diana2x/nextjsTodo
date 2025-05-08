import { Item, CreateItemData, UpdateItemData } from '@/types/item';
import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  Timestamp, 
  setDoc 
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Helper to work with Firebase
class ItemDB {
  private static COLLECTION_NAME = 'items';
  private static itemsCollection = collection(db, ItemDB.COLLECTION_NAME);

  // Get all items from Firestore
  static async getAll(): Promise<Item[]> {
    try {
      const q = query(this.itemsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          category: data.category,
          createdAt: data.createdAt.toDate().toISOString()
        } as Item;
      });
    } catch (error) {
      console.error('Error getting items:', error);
      return [];
    }
  }

  // Get a single item by id
  static async getById(id: string): Promise<Item | undefined> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          description: data.description,
          category: data.category,
          createdAt: data.createdAt.toDate().toISOString()
        } as Item;
      }
      
      return undefined;
    } catch (error) {
      console.error('Error getting item:', error);
      return undefined;
    }
  }

  // Create a new item
  static async create(data: CreateItemData): Promise<Item> {
    try {
      const id = uuidv4();
      const docRef = doc(db, this.COLLECTION_NAME, id);
      
      const newItem = {
        ...data,
        createdAt: Timestamp.now()
      };
      
      await setDoc(docRef, newItem);
      
      return {
        id,
        ...data,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  }

  // Update an existing item
  static async update(id: string, data: UpdateItemData): Promise<Item | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      await updateDoc(docRef, data);
      
      const updatedDocSnap = await getDoc(docRef);
      const updatedData = updatedDocSnap.data();
      
      if (!updatedData) {
        return null;
      }
      
      return {
        id,
        title: updatedData.title,
        description: updatedData.description,
        category: updatedData.category,
        createdAt: updatedData.createdAt.toDate().toISOString()
      } as Item;
    } catch (error) {
      console.error('Error updating item:', error);
      return null;
    }
  }

  // Delete an item
  static async delete(id: string): Promise<boolean> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  }
}

export default ItemDB;
