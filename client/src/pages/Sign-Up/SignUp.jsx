import { useContext } from "react";
import leftImage from "../../assets/images/z6301294887221_1ee7086bb244624d43906265376727e6.jpg"
import SignUpForm from "../../components/Forms/SignUpForm";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
function SignUp() {
    
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    if (isLoggedIn) {
        navigate('/');
        return null;
    }
    return (
        <>
            <div className="flex items-center justify-between my-[50px]">
                <div className="w-[50%]">
                    <img src={leftImage} className="h-[100vh]"/>
                </div>
                <div className="w-[50%] flex flex-col justify-">
                    <SignUpForm />
                </div>
            </div>
        </>
    )
}
export default SignUp;