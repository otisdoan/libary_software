import { Outlet } from "react-router-dom";
import HomeCarousel from "../../components/Carousels/HomeCarousel";

function Content() {
    return (
        <>
            <HomeCarousel />
            
            <div className="container mx-auto px-[6rem]">
                <Outlet />
            </div>
        </>
    )
}
export default Content;