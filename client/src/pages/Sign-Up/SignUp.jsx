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
                <div className="w-[55%]">
                    <img src={leftImage} className="h-[600px] rounded-lg"/>
                </div>
                <div className="w-[45%] flex flex-col bg-white p-[50px] rounded-lg">
                    <SignUpForm />
                </div>
            </div>
        </>
    )
}
export default SignUp;