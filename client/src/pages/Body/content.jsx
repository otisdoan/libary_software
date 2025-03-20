import { Outlet } from "react-router-dom";
import HomeCarousel from "../../components/Carousels/HomeCarousel";
import Category from "../../components/Category/Category";
import Tab from "../../components/Tabs/Tabs";

function Content() {
    return (
        <>
            <div className="pb-[50px] pt-[20px]">
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