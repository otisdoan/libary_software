import leftImage from "../../assets/images/z6301294887221_1ee7086bb244624d43906265376727e6.jpg"
import SignUpForm from "../../components/Forms/SignUpForm";
function SignUp() {
    return (
        <>
            <div className="flex items-center justify-between">
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