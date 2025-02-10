import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/footer";


function Content() {
    return (
        <>
            <div className="container mx-auto px-[6rem]">
                <Outlet />
                <Footer />
            </div>
        </>
    )
}
export default Content;