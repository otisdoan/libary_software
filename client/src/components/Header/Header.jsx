import { useContext, useEffect, useState } from 'react';
import { SiZalo } from "react-icons/si";
import { MdOutlineFacebook } from "react-icons/md";
import { Button, Tooltip, Dropdown, Avatar, Input, Badge } from 'antd';
import { BiSupport } from "react-icons/bi";
import { MdOutlineLanguage } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import logoWhite from "../../assets/images/logo_white.png"
import { RiBookFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { IoLogOutSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { GoBell } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { bookBorrowApi } from '../../api/bookBorrowApi';
import { UserOutlined } from '@ant-design/icons';
import { useProfileApi } from '../../api/userProfileApi';
import { notificationApi } from '../../api/notificationApi';
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { TbPointFilled } from "react-icons/tb";
import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const text = <span>prompt text</span>;
const buttonWidth = 70;


function Header() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [totalBorrow, setTotalBorrow] = useState(0);
  const userId = localStorage.getItem('userId');
  const [avatar, setAvatar] = useState('');
  const [notification, setNotification] = useState([]);
  const [readed, setReaded] = useState();
  const handleLogout = () => {
    logout();
    navigate('/');
  }
  const role = localStorage.getItem('role');
  const items = [
    {
      key: '1',
      icon: <ImProfile />,
      label: (
        <Link to="/profile">My profile</Link>
      )
    },
    role === 'admin' &&
    {
      key: '2',
      icon: <RiAdminLine />,
      label: (
        <Link to="/admin/user">Admin</Link>
      )
    },
    {
      key: '3',
      icon: <FaBookOpen />,
      label: (
        <Link to="/history-borrow-book">Lịch sử mượn sách</Link>
      )
    },
    {
      key: '4',
      icon: <IoLogOutSharp />,
      label: (
        <span onClick={handleLogout}>Log out</span>
      )
    },
  ];

  const handleEnter = async (e) => {
    navigate(`/search/${e.target.value}`);
  }

  const handleReaded = async (id) => {
    try {
      const result = await notificationApi.maskAsRead(id);
      if (result) {
        setReaded(result);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchBorrowBook = async () => {
      try {
        const result = await bookBorrowApi.getHistoryBorrowBook(userId, 1, 9999999);
        if (result) {
          setTotalBorrow(result.totalElements);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchBorrowBook();
  }, [userId])

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const result = await useProfileApi.getUserProfile(userId);
        setAvatar(result.avatar);
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfiles();
  }, [userId, avatar])

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const result = await notificationApi.getAllNotification(userId);
        console.log('Noti1', result)
        if (result) {
          setNotification(result.data);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotification();
  }, [userId])

  return (
    <>
      <div className='sticky top-0 z-[999] w-full flex bg-[#FF4500]  text-white pb-[25px]'>
        <div className="px-[150px] w-[100%]">
          <div className="flex items-center justify-between py-[5px] mb-[10px]">
            <div className="flex items-center justify-center">
              <span className="text-[0.8rem] mr-[10px]">Kết nối</span>
              <SiZalo className="text-[1.2rem] mr-[10px]" />
              <MdOutlineFacebook className='text-[1.2rem]' />
            </div>
            <div className="flex items-center justify-center">
              <div>
                <Dropdown
                  placement='bottom'
                  trigger={'click'}
                  dropdownRender={() => (
                    <div className='flex justify-center mt-[10px]'>
                      <div className='flex flex-col bg-[#f0f0f0] rounded-[10px] w-1/2'>
                        <div className='flex items-center justify-between border-b-[1px] py-[10px] px-[10px] '>
                          <div className='flex items-center justify-center gap-x-1'>
                            <GoBell />
                            <span>Thông báo</span>
                          </div>
                          <div>
                            <Link to='/notifications' className='text-blue-500'>Xem thêm</Link>
                          </div>
                        </div>
                        <div className='rounded-none p-4 flex flex-col gap-y-4'>
                          {notification && (
                            notification.map((items, index) => (
                              index < 5 && (
                                <div className='flex items-center justify-between' key={index}>
                                  <Link key={index} to='/history-borrow-book'>
                                    <span className='mr-[50px] cursor-pointer'>{items.message}</span>
                                  </Link>
                                  <div className='flex items-center gap-x-2'>
                                    <Dropdown
                                      trigger={'click'}
                                      placement='bottomRight'
                                      menu={
                                        {
                                          items: [
                                            {
                                              key: '1',
                                              icon: <MdDone />,
                                              label: (
                                                <span className='' onClick={() => handleReaded(items.id)}>Đánh dấu là đã đọc</span>
                                              )
                                            },
                                            {
                                              key: '2',
                                              icon: <MdDelete />,
                                              label: (
                                                <span className=''>Xóa thông báo này</span>
                                              )
                                            }
                                          ]
                                        }
                                      }
                                    >
                                      <PiDotsThreeCircleFill className='text-[2rem] cursor-pointer' />
                                    </Dropdown>
                                    {items.status !== 'read' && (
                                      <TbPointFilled className='text-blue-500 text-[1.4rem]' />
                                    )}
                                  </div>
                                </div>
                              )
                            ))
                          )}
                        </div>
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
                      {avatar ? (
                        <Avatar src={avatar} className='cursor-pointer' />

                      ) : (
                        <Avatar icon={<UserOutlined />} className='cursor-pointer' />
                      )}
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
            <div>
              <Link to='/'>
                <div className="flex items-center justify-center w-0.5/3 relative">
                  <img src={logoWhite} alt="logo" className='w-[7rem]' />
                  <span className="text-white text-[1.7rem] font-bold absolute top-[50%] translate-y-[-50%] left-[77%] ">HOKO</span>
                </div>
              </Link>
            </div>
            <div className="w-2/3">
              <Input suffix={<IoIosSearch />} className='w-[50rem]' onPressEnter={handleEnter} />
            </div>
            <div className="w-0.5/3">
              <Link to='/history-borrow-book'>
                <Badge count={totalBorrow} >
                  <RiBookFill className='text-[2.3rem] text-white' />
                </Badge></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header;