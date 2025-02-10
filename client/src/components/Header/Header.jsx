import Searchs from "../Search/Search";
import logo from "../../assets/images/image_no_background.png";
import Avatars from "../Avatar/Avatar";
import Badges from "../Badge/Badge";
function Header() {
    return (
        <>
            <div className="flex items-center justify-between"> 
                <div className="flex items-center justify-center">
                    <img src={logo} className="w-[100px]"/>
                    <span className="text-[2rem] text-[#d2370c] font-bold ml-[3px]">HOKO</span>
                </div>
                <div>
                    <Searchs />
                </div>
                <div>
                    <Badges />
                </div>
                <div>
                    <Avatars />
                </div>
            </div>
        </>
    )
}
export default Header;