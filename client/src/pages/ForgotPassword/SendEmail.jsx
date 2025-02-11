import InputEmail from "../../components/Forms/FormInputSendEmail";

function SendEmail() {
    return (
        <>
            <div className="container mx-auto py-[5rem] my-[5rem] flex flex-col  justify-center items-center h-full">
                <h1 className="text-[1.5rem] font-bold mb-[15px]">Quên mật khẩu</h1>
                <div>
                    <InputEmail />
                </div>
            </div>
        </>
    )
}
export default SendEmail;