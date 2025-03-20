
import { Navigate } from "react-router-dom";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";

function Admin() {
    const role = localStorage.getItem('role');

    return (
        <>
            {role === 'admin' ? (
                <LayoutAdmin />
            ) : (
                <Navigate to='/'/>
            )}
        </>
    )
}
export default Admin;