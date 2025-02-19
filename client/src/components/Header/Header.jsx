import { useContext } from 'react';
import { SiZalo } from "react-icons/si";
import { MdOutlineFacebook } from "react-icons/md";
import { Button, Tooltip, Dropdown, Avatar } from 'antd';
import { BiSupport } from "react-icons/bi";
import { MdOutlineLanguage } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/logo.png"
import Searchs from "../Search/Search";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { IoLogOutSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import avatarUser from "../../assets/images/z5581996737056_ec0f21259be216a6270fde9f7c300f4f.jpg";
import { GoBell } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
const text = <span>prompt text</span>;
const buttonWidth = 70;


function Header() {
  const { isLoggedIn, logout, email } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  }
  const emailAdmin = 'admin@gmail.com'
  const items = [
    {
      key: '1',
      icon: <ImProfile />,
      label: (
        <Link to="/profile">My profile</Link>
      )
    },
    email === emailAdmin &&
    {
      key: '2',
      icon: <RiAdminLine />,
      label: (
        <Link to="/admin">Admin</Link>
      )
    },
    {
      key: '3',
      icon: <IoLogOutSharp />,
      label: (
        <Button type='text' className='p-0' onClick={handleLogout}>Log out</Button>
      )
    }
  ];
  const itemsNotification = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),

    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <>
      <div className='sticky top-0 z-[1] w-full flex  bg-[#f7462f] text-white pb-[25px]'>
        <div className="container mx-auto px-[150px] w-[100%]">
          <div className="flex items-center justify-between py-[5px] mb-[10px]">
            <div className="flex items-center justify-center">
              <span className="text-[0.8rem] mr-[10px]">Kết nối</span>
              <SiZalo className="text-[1.2rem] mr-[10px]" />
              <MdOutlineFacebook className='text-[1.2rem]' />
            </div>
            <div className="flex items-center justify-center">
              <div>
                <Dropdown
                  trigger={'click'}
                  menu={{
                    items: itemsNotification
                  }}
                  dropdownRender={(menu) => (
                    <div className='flex flex-col bg-white w-[300px] h-[100px] rounded-[10px]'>
                      <div className='flex items-center justify-between border-b-[1px] py-[10px] px-[10px]'>
                        <div className='flex items-center justify-center gap-x-1'>
                          <GoBell />
                          <span>Thông báo</span>
                        </div>
                        <div>
                          <Link to='#' className='text-blue-500'>Xem thêm</Link>
                        </div>
                      </div>
                      <div className='rounded-none'>
                        {menu}
                      </div>
                    </div>
                  )}
                >
                  <div className='flex items-center justify-center gap-x-1 text-[0.8rem] mr-[50px] cursor-pointer'>
                    <GoBell />
                    <span>Thông báo</span>
                  </div>
                </Dropdown>
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
                  <div className=''>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={['click']}
                    >
                      <Avatar src={<img src={avatarUser} alt="avatar" className='cursor-pointer' />} />
                    </Dropdown>
                  </div>
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
      </div>
    </>
  )
}
export default Header;