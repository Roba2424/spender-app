import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, List, Card, Spin } from "antd";
import { fetchExpensesByCategoryFromFirebase } from "../../state-management/slices/expenses";
import "./style.css";

const { Title } = Typography;

const ExpensesPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { authUserInfo } = useSelector((state) => state.userProfile);
  const expenses = useSelector((state) => state.expenses.categories[category]);
  const loading = useSelector((state) => state.expenses.loading);

  useEffect(() => {
    if (authUserInfo.isAuth && category) {
      const uid = authUserInfo.userData.uid;
      dispatch(fetchExpensesByCategoryFromFirebase({ uid, category }));
    }
  }, [authUserInfo, category, dispatch]);

  return (
    <div className="expenses-page">
      <Title level={2} className="expenses-page-title">
        Expenses for {category}
      </Title>

      {loading ? (
        <div className="expenses-loading">
          <Spin size="large" />
        </div>
      ) : expenses && expenses.length ? (
        <List
          className="expenses-list"
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
          dataSource={expenses}
          renderItem={(expense) => (
            <List.Item>
              <Card
                title={`$${expense.amount}`}
                bordered={false}
                className="expense-card"
              >
                <p>
                  <strong>Date:</strong> {expense.date}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {expense.description || "No description"}
                </p>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <div className="no-data">
          <Title level={3}>No Expenses Found!</Title>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
