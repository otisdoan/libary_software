import { Outlet } from "react-router-dom";
import HomeCarousel from "../../components/Carousels/HomeCarousel";
import Category from "../../components/Category/Category";
import Tab from "../../components/Tabs/Tabs";

function Content() {
    return (
        <>
            <div className="py-[50px]">
                <HomeCarousel />
                <Category />
                <Tab />
                <div className="container mx-auto px-[6rem]">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Content;