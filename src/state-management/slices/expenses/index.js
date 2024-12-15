import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../service";
import { doc, setDoc, updateDoc, getDoc, collection, addDoc, getDocs } from "@firebase/firestore";

const initialState = {
  categories: {
    Food: [],
    Entertainment: [],
    Transport: [],
    Rent: [],
  },
  incomes: [],
  balanceSheet: {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  },
  loading: false,
  error: null,
};

export const addExpenseToFirebase = createAsyncThunk(
  "expenses/addExpenseToFirebase",
  async ({ uid, category, expense }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "expenses", uid);
      const expenseRef = collection(userRef, "userExpenses");

      await addDoc(expenseRef, {
        ...expense,
        category,
        createdAt: new Date().toISOString(),
      });

      const userDoc = await getDoc(userRef);
      const balanceSheet = userDoc.data().balanceSheet;

      const updatedBalanceSheet = {
        ...balanceSheet,
        totalExpense: balanceSheet.totalExpense + expense.amount,
        balance: balanceSheet.balance - expense.amount,
      };

      await updateDoc(userRef, { balanceSheet: updatedBalanceSheet });

      return { category, expense, balanceSheet: updatedBalanceSheet };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addIncomeToFirebase = createAsyncThunk(
  "expenses/addIncomeToFirebase",
  async ({ uid, income }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "expenses", uid);
      const incomeRef = collection(userRef, "userIncomes");

      await addDoc(incomeRef, {
        ...income,
        createdAt: new Date().toISOString(),
      });

      const userDoc = await getDoc(userRef);
      const balanceSheet = userDoc.data().balanceSheet;

      const updatedBalanceSheet = {
        ...balanceSheet,
        totalIncome: balanceSheet.totalIncome + income.amount,
        balance: balanceSheet.balance + income.amount,
      };

      await updateDoc(userRef, { balanceSheet: updatedBalanceSheet });

      return { income, balanceSheet: updatedBalanceSheet };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchIncomesFromFirebase = createAsyncThunk(
  "expenses/fetchIncomesFromFirebase",
  async (uid, { rejectWithValue }) => {
    try {
      const incomesRef = collection(db, "expenses", uid, "userIncomes");
      const snapshot = await getDocs(incomesRef);
      const incomes = [];

      snapshot.forEach((doc) => {
        incomes.push({ id: doc.id, ...doc.data() });
      });

      return incomes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchExpensesFromFirebase = createAsyncThunk(
  "expenses/fetchExpensesFromFirebase",
  async (uid, { rejectWithValue }) => {
    try {
      const expensesRef = collection(db, "expenses", uid, "userExpenses");
      const snapshot = await getDocs(expensesRef);
      const categories = {
        Food: [],
        Entertainment: [],
        Transport: [],
        Rent: [],
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (categories[data.category]) {
          categories[data.category].push({ id: doc.id, ...data });
        }
      });

      return categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBalanceFromFirebase = createAsyncThunk(
  "expenses/fetchBalanceFromFirebase",
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "expenses", uid);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        return snapshot.data().balanceSheet;
      } else {
        const initialBalanceSheet = {
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
        };

        await setDoc(userRef, { balanceSheet: initialBalanceSheet });
        return initialBalanceSheet;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpenseToFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpenseToFirebase.fulfilled, (state, action) => {
        const { category, expense, balanceSheet } = action.payload;

        if (state.categories[category]) {
          state.categories[category].push(expense);
        }

        state.balanceSheet = balanceSheet;
        state.loading = false;
      })
      .addCase(addExpenseToFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addIncomeToFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(addIncomeToFirebase.fulfilled, (state, action) => {
        const { income, balanceSheet } = action.payload;

        state.incomes.push(income);
        state.balanceSheet = balanceSheet;
        state.loading = false;
      })
      .addCase(addIncomeToFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIncomesFromFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncomesFromFirebase.fulfilled, (state, action) => {
        state.incomes = action.payload;
        state.loading = false;
      })
      .addCase(fetchIncomesFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchExpensesFromFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpensesFromFirebase.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpensesFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBalanceFromFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalanceFromFirebase.fulfilled, (state, action) => {
        state.balanceSheet = action.payload;
        state.loading = false;
      })
      .addCase(fetchBalanceFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expensesSlice.reducer;