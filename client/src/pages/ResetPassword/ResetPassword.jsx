import FormResetPassword from "../../components/Forms/FormResetPassword";

function ResetPassword() {
    return (
        <>
            <div className="container mx-auto px-[30rem] flex flex-col justify-center py-[10rem]">
                <h1 className="text-[1.5rem] font-bold mb-[20px]">Đặt lại mật khẩu</h1>
                <FormResetPassword />
            </div>
        </>
    )
}
export default ResetPassword;