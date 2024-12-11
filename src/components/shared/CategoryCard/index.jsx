import "./style.css";

const CategoryCard = ({ category, total }) => {
  return (
    <div className="category-card">
      <h3>{category}</h3>
      <p>Total Expense:${total}</p>
    </div>
  );
};

export default CategoryCard;
