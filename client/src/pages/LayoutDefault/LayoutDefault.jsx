import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";

function LayoutDefault() {
    return (
        <>
            <Header />
            <div className="px-[150px] border-[1px] bg-[#f0f0f0]">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
export default LayoutDefault;