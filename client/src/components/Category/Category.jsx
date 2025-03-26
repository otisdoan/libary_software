import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryApi } from "../../api/categoryApi";

function Category() {
    const [category, setCategory] = useState([]);
    const fetchyApi = async () => {
        try {
            const result = await categoryApi.getAllCategories(1, 9999);
            console.log(result);
            setCategory(result.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchyApi()
    }, [])
    return (
        <>
            <div className="bg-white rounded-[10px] mt-[20px] py-[40px] flex gap-x-4 justify-around flex-wrap">
                {category.map((element, index) => (
                    <Link to='#' key={index}>{element.name}</Link>
                ))}
            </div>
        </>
    )
}
export default Category;