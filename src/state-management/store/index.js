import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "../slices/userProfile";
import expensesReduce from "../slices/expenses";

export const store = configureStore({
  reducer: { userProfile: userProfileReducer, expenses: expensesReduce },
});
