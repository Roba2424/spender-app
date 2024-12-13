import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {
    Food: [],
    Entertainment: [],
    Transport: [],
    Rent: [],
  },
  balanceSheet: {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  },
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const { category, expense } = action.payload;
      if (state.categories[category]) {
        state.categories[category].push(expense);
        state.balanceSheet.totalExpense += expense.amount;
        state.balanceSheet.balance -= expense.amount;
      }
    },
    addIncome: (state, action) => {
      const { income } = action.payload;
      state.balanceSheet.totalIncome += income;
      state.balanceSheet.balance += income;
    },
    deleteExpense: (state, action) => {
      const { category, expenseId } = action.payload;
      if (state.categories[category]) {
        const expense = state.categories[category].find(
          (exp) => exp.id === expenseId
        );
        if (expense) {
          state.categories[category] = state.categories[category].filter(
            (exp) => exp.id !== expenseId
          );
          state.balanceSheet.totalExpense -= expense.amount;
          state.balanceSheet.balance += expense.amount;
        }
      }
    },
    editExpense: (state, action) => {
      const { category, expenseId, updatedExpense } = action.payload;
      if (state.categories[category]) {
        const index = state.categories[category].findIndex(
          (exp) => exp.id === expenseId
        );
        if (index !== -1) {
          const originalExpense = state.categories[category][index];
          state.categories[category][index] = {
            ...originalExpense,
            ...updatedExpense,
          };

          // Adjust balance sheet
          state.balanceSheet.totalExpense -= originalExpense.amount;
          state.balanceSheet.totalExpense += updatedExpense.amount;
          state.balanceSheet.balance +=
            originalExpense.amount - updatedExpense.amount;
        }
      }
    },
  },
});

export const { addExpense, addIncome, deleteExpense, editExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
