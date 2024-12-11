import { useEffect } from "react";
import CategoryCard from "../../../components/shared/CategoryCard";
import { CATEGORY_TYPES } from "../../../utils/constants";
import "./style.css";
import { fetchUserProfileInfo } from "../../../state-management/slices/userProfile";

const Cabinet = () => {
  useEffect(() => {
    fetchUserProfileInfo();
  }, []);

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
