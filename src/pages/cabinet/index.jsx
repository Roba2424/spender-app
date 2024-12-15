import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchExpensesFromFirebase,
  fetchBalanceFromFirebase,
  fetchIncomesFromFirebase,
} from "../../state-management/slices/expenses";
import AddExpenseModal from "../../components/shared/AddExpenseModal";
import AddIncomeModal from "../../components/shared/AddIncomeModal";
import CategoryCard from "../../components/shared/CategoryCard";
import "./style.css";

const Cabinet = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.expenses);
  const { authUserInfo } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (authUserInfo.isAuth) {
      const uid = authUserInfo.userData.uid;
      dispatch(fetchExpensesFromFirebase(uid));
      dispatch(fetchBalanceFromFirebase(uid));
      dispatch(fetchIncomesFromFirebase(uid));
    }
  }, [authUserInfo, dispatch]);

  const handleViewExpenses = (category) => {
    navigate(`/expenses/${category}`);
  };

  const handleAddExpense = (category) => {
    setCurrentCategory(category);
    setIsExpenseModalOpen(true);
  };

  return (
    <div className="cabinet-container">
      <div className="balance-section">
        <button
          onClick={() => setIsIncomeModalOpen(true)}
          className="add-income-button"
        >
          Add Income
        </button>
      </div>

      <div className="category-container">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category-item">
            <CategoryCard
              category={category}
              total={categories[category].reduce(
                (acc, expense) => acc + expense.amount,
                0
              )}
            />
            <div className="buttons-container">
              <button
                className="add-expense-button"
                onClick={() => handleAddExpense(category)}
              >
                Add Expense
              </button>
              <button
                className="view-expenses-button"
                onClick={() => handleViewExpenses(category)}
              >
                View Expenses
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddExpenseModal
        isModalOpen={isExpenseModalOpen}
        setIsModalOpen={setIsExpenseModalOpen}
        selectedCategory={currentCategory}
      />
      <AddIncomeModal
        isModalOpen={isIncomeModalOpen}
        setIsModalOpen={setIsIncomeModalOpen}
      />
    </div>
  );
};

export default Cabinet;
