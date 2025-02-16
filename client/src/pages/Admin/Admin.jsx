
import { Navigate } from "react-router-dom";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";

function Admin() {
    const email = localStorage.getItem('email');
    const emailAdmin = 'admin@gmail.com';

    return (
        <>
            {email === emailAdmin ? (
                <LayoutAdmin />
            ) : (
                <Navigate to='/'/>
            )}
        </>
    )
}
export default Admin;