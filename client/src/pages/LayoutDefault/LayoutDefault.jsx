import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";

function LayoutDefault() {
    return (
        <>
            <Header />
            <div className="px-[150px]">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
export default LayoutDefault;