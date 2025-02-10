import google from "../../assets/images/google.jpg";
import facebook from "../../assets/images/facebook.jpg";
function Accounts() {
    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <button className="flex items-center justify-center border-[1px] border-[#ddd] px-[50px] py-[5px] rounded-[10px]">
                        <img src={google} className="w-[1.3rem] mr-[0.4rem]"/>
                        <span className="text-[0.9rem]">Google</span>
                    </button>
                </div>
                <div>
                    <button className="flex items-center justify-center border-[1px] border-[#ddd] px-[50px] py-[5px] rounded-[10px]">
                        <img src={facebook} className="w-[1.3rem] mr-[0.4rem]"/>
                        <span className="text-[0.9rem]">Facebook</span>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Accounts;