import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase('user/logout', (state, action) => {
        return initialState;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let updatingRecipe = state.items.find(item => item.id === action.payload.id);
        updatingRecipe = {...updatingRecipe, ...action.payload};
        state.items = state.items.map(item => item.id === action.payload.id ? updatingRecipe : item);
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
  }
});

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(collection(db, 'recipes'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const recipes = [];
      querySnapshot.forEach(doc => {
        recipes.push({id: doc.id, ...doc.data()});
      });
      resolve(recipes);
    } catch(err) {
      reject(err);
    }
  });
});

export const updateRecipe = createAsyncThunk('recipes/updateRecipe', (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(doc(db, 'recipes', data.id), { ...data }, { merge: true });
      resolve(data);
    } catch(err) {
      reject(err);
    }
  });
});

export const addRecipe = createAsyncThunk('recipes/addRecipe', (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(db, 'recipes'), data);
      resolve({id: docRef.id, ...data });
    } catch(err) {
      reject(err);
    }
  });
});

export const deleteRecipe = createAsyncThunk('recipes/deleteRecipe', (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteDoc(doc(db, 'recipes', id));
      resolve(id);
    } catch(err) {
      reject(err);
    }
  })
})

export const selectRecipes = (state) => [...state.recipes.items].reverse();
export const selectRecipesStatus = (state) => state.recipes.status;

export default recipesSlice.reducer;