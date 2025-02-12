import { useContext } from 'react';
import { SiZalo } from "react-icons/si";
import { MdOutlineFacebook } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { Button, Tooltip } from 'antd';
import { BiSupport } from "react-icons/bi";
import { MdOutlineLanguage } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/logo.png"
import Searchs from "../Search/Search";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
const text = <span>prompt text</span>;
const buttonWidth = 70;
function Header() {
  const { isLoggedIn, username } = useContext(UserContext);

  return (
    <>
      <div className="container mx-auto px-[6rem] bg-[#f7462f] text-white pb-[25px] sticky top-0 z-[9999]">
        <div className="flex items-center justify-between py-[5px] mb-[10px]">
          <div className="flex items-center justify-center">
            <span className="text-[0.8rem] mr-[10px]">Kết nối</span>
            <SiZalo className="text-[1.2rem] mr-[10px]" />
            <MdOutlineFacebook className='text-[1.2rem]' />
          </div>
          <div className="flex items-center justify-center">
            <div
              style={{
                marginLeft: buttonWidth,
              }}>
              <Tooltip placement="bottomRight" title={text}>
                <Button className="border-none shadow-none bg-transparent text-white"><CiBellOn className="text-[1.2rem]" /><span className="text-[0.8rem]">Thông báo</span></Button>
              </Tooltip>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <BiSupport className="mr-[5px]" />
                <span className="text-[0.8rem]">Hỗ trợ</span>
              </div>
            </div>
            <div
              style={{
                marginLeft: buttonWidth,
              }}>
              <Tooltip placement="bottomRight" title={text}>
                <Button className="border-none shadow-none bg-transparent text-white"><MdOutlineLanguage />
                  <span className="flex items-center justify-center ml-[3px] text-[0.8rem] ">Tiếng Việt<IoIosArrowDown className="ml-[2px]" /></span>
                </Button>
              </Tooltip>
            </div>
            <div className="flex">
              {isLoggedIn ? (
                <div className="text-[0.8rem] text-white mr-[10px]">Xin chào, {username}</div>
              ) : (
                <>
                  <div>
                    <Link to="/register"><Button className="border-0 shadow-none outline-none text-[0.8rem] bg-transparent text-white">Đăng Ký</Button></Link>
                  </div>
                  <div>
                    <Link to="/login"><Button className="border-0 border-l-[1px] border-l-[#ddd] shadow-none outline-none bg-transparent rounded-none text-[0.8rem] text-white">Đăng Nhập</Button></Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-0.5/3">
            <img src={logo} alt="logo" className="w-[5rem]" />
            <span className="text-white text-[2rem] font-bold ml-[0.4rem]">HOKO</span>
          </div>
          <div className="w-2/3">
            <Searchs />
          </div>
          <div className="w-0.5/3">
            <PiShoppingCartSimpleThin className="text-[2rem]" />
          </div>
        </div>
      </div>
    </>
  )
}
export default Header;