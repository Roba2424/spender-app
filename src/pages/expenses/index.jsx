import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "antd";

const { Title } = Typography;
const ExpensesPage = () => {
  const { category } = useParams();
  const expenses = useSelector((state) => state.expenses.categories[category]);

  return (
    <div>
      <h1>Expenses for {category}</h1>
      <ul>
        {expenses.length ? (
          expenses.map((expense) => (
            <li key={expense.id}>
              ${expense.amount} - {expense.date}
            </li>
          ))
        ) : (
          <div>
            <Title level={3}>No Data!</Title>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ExpensesPage;
