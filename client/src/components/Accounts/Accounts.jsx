import google from "../../assets/images/google.jpg";
function Accounts() {
    return (
        <>
            <div className="flex justify-between items-center gap-x-2">
                <div className="w-full">
                    <button className="flex items-center justify-center border-[1px] border-[#ddd] px-[50px] py-[5px] rounded-[10px]  w-full">
                        <img src={google} className="w-[1.3rem] mr-[0.4rem]"/>
                        <span className="text-[0.9rem]">Google</span>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Accounts;