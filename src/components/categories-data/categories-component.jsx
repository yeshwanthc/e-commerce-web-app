import CategoryItem from "../category-item/category-item.component";
import './category-data.scss'

const CategoryData = ({ categories })=>{
    return(
    <div className="categories-container">
    {categories.map((category) =>(
     <CategoryItem key={category.id} category={category}/>
))}
</div>
)
};
    
export default CategoryData;