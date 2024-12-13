import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddExpenseModal from "../../components/shared/AddExpenseModal";
import AddIncomeModal from "../../components/shared/AddIncomeModal";
import CategoryCard from "../../components/shared/CategoryCard";
import "./style.css";

const Cabinet = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.expenses.categories);

  const calculateTotalExpense = (categoryExpenses) => {
    return categoryExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  };

  const handleViewExpenses = (category) => {
    navigate(`/expenses/${category}`);
  };

  const handleAddExpense = (category) => {
    setCurrentCategory(category);
    setIsExpenseModalOpen(true);
  };

  return (
    <div className="cabinet-container">
      <div className="header-buttons">
        <button
          className="add-income-button"
          onClick={() => setIsIncomeModalOpen(true)}
        >
          Add Income
        </button>
      </div>

      <div className="category-container">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category-item">
            <CategoryCard
              category={category}
              total={calculateTotalExpense(categories[category])}
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
