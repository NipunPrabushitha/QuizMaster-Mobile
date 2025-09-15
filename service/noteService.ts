// noteService.ts
import { db } from "@/firebase";
import { Note } from "@/types/note";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where
} from "firebase/firestore";

// Collection reference
export const noteRef = collection(db, "notes");

// Create a new note
export const createNote = async (note: Omit<Note, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const noteWithTimestamp = {
      ...note,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(noteRef, noteWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note");
  }
};

// Get all notes for a specific user with proper error handling for index issues
export const getNotesByUserId = async (userId: string): Promise<Note[]> => {
  try {
    // Try the optimized query with indexing first
    const q = query(
      noteRef, 
      where("userId", "==", userId), 
      orderBy("createdAt", "desc")
    );
    const notesSnapshot = await getDocs(q);
    return notesSnapshot.docs.map((data) => ({ 
      id: data.id, 
      ...data.data() 
    } as Note));
  } catch (error: any) {
    if (error.code === 'failed-precondition') {
      // Fallback if index doesn't exist yet
      console.warn("Index not ready, using fallback query");
      try {
        const fallbackQuery = query(
          noteRef, 
          where("userId", "==", userId)
        );
        const notesSnapshot = await getDocs(fallbackQuery);
        const notes = notesSnapshot.docs.map((data) => ({ 
          id: data.id, 
          ...data.data() 
        } as Note));
        
        // Client-side sorting
        return notes.sort((a, b) => 
          b.createdAt.toMillis() - a.createdAt.toMillis()
        );
      } catch (fallbackError) {
        console.error("Error in fallback query:", fallbackError);
        throw new Error("Failed to fetch user notes");
      }
    } else {
      console.error("Error fetching user notes:", error);
      throw new Error("Failed to fetch user notes");
    }
  }
};

// Get a specific note by ID
export const getNoteById = async (id: string): Promise<Note | null> => {
  try {
    const noteDocRef = doc(db, "notes", id);
    const noteSnapshot = await getDoc(noteDocRef);
    return noteSnapshot.exists() 
      ? ({ id: noteSnapshot.id, ...noteSnapshot.data() } as Note) 
      : null;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw new Error("Failed to fetch note");
  }
};

// Update an existing note
export const updateNote = async (id: string, note: Partial<Omit<Note, 'id' | 'userId' | 'createdAt'>>): Promise<string> => {
  try {
    const updateRef = doc(db, "notes", id);
    await updateDoc(updateRef, note);
    return id;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Failed to update note");
  }
};

// Delete a note by ID
export const deleteNoteById = async (id: string): Promise<string> => {
  try {
    const deleteRef = doc(db, "notes", id);
    await deleteDoc(deleteRef);
    return id;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note");
  }
};