import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authApi } from '../../api/authApi';

function Activate() {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                await authApi.activate(token);
                navigate("/login");
            } catch (error) {
                console.error("Activation failed:", error);
            }
        };
        activateAccount();
    }, [token, navigate]);

    return (
        <div>
        </div>
    );
}

export default Activate;
