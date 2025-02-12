import { Outlet } from "react-router-dom";

function Content() {
    return (
        <>
            <div className="container mx-auto px-[6rem]">
                <Outlet />
            </div>
        </>
    )
}
export default Content;