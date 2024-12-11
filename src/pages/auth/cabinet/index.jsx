import CategoryCard from "../../../components/shared/CategoryCard";
import { CATEGORY_TYPES } from "../../../utils/constants";
import "./style.css";

const Cabinet = () => {
  return (
    <div>
      <div className="category-container">
        <CategoryCard category={CATEGORY_TYPES.FOOD} />
        <CategoryCard category={CATEGORY_TYPES.ENTERTIMENT} />
        <CategoryCard category={CATEGORY_TYPES.TRANSPORT} />
        <CategoryCard category={CATEGORY_TYPES.RENT} />
      </div>
    </div>
  );
};

export default Cabinet;
