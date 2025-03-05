import LoginForm from "../../components/Forms/LoginForm";
import rightImage from "../../assets/images/login.jpg";
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
            <div className="flex items-center justify-start my-[50px]">
                <div className="w-[40%] bg-white p-[45px] rounded-lg"> 
                    <LoginForm />
                </div>
                <div className="w-[60%]">
                    <img src={rightImage} alt="" className=" h-full w-full"/>
                </div>
            </div>
        </>
    )
}
export default Login; 