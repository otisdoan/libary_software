import LoginForm from "../../components/Forms/LoginForm";
import rightImage from "../../assets/images/z6301293252873_f84b802f4314e48198b9ed3af396946d.jpg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
function Login() {

    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    if (isLoggedIn) {
        navigate('/');
        return null;
    }

    return (
        <>
            <div className="flex items-center justify-center my-[50px]">
                <div className="w-[40%]">
                    <div>
                        <LoginForm />
                    </div>
                </div>
                <div className="w-[60%]">
                    <img src={rightImage} alt="" className="h-[100vh]"/>
                </div>
            </div>
        </>
    )
}
export default Login; 