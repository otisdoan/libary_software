import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
function AllRoutes() {
    const allRoutes = useRoutes(routes);
    return (
        <>
            {allRoutes}
        </>
    )
}
export default AllRoutes;