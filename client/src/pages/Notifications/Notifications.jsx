import { useEffect, useState } from "react";
import { notificationApi } from "../../api/notificationApi";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { TbPointFilled } from "react-icons/tb";
import { Breadcrumb, Dropdown, Empty } from "antd";
import { Link } from "react-router-dom";
import { MdDelete, MdDone, MdHome } from "react-icons/md";

function Notifications() {
    const userId = localStorage.getItem('userId');
    const [notification, setNotification] = useState([]);
    const [readed, setReaded] = useState();
    const [listNoti, setListNoti] = useState();

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
    const handleDelete = async (id) => {
        try {
            if (id) {
                const result = await notificationApi.deleteNotification(id);
                if (result) {
                    setListNoti(result);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAllReaded = async () => {
        try {
            if (userId) {
                const result = await notificationApi.markAllReaded(userId);
                if (result) {
                    setListNoti(result);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                if (userId) {
                    const result = await notificationApi.getAllNotification(userId);
                    console.log('Noti', result);
                    if (result) {
                        setNotification(result.data);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchNotification();
    }, [userId, listNoti])
    return (
        <>
            <div className="my-[10px] bg-white rounded-lg p-2 shadow-md">
                <Breadcrumb separator='>'>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <div className="flex items-center gap-x-1">
                                <MdHome className="text-[1.2rem] text-orange-600" />
                                <span>Trang chủ</span>
                            </div>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Thông báo</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {notification ? (
                <div className="bg-[#f0f0f0] pb-[50px] pt-[20px]">
                    <div className="flex items-center justify-between pr-[15px] mb-[20px]">
                        <h1 className="text-[1.4rem] font-medium">Thông báo</h1>
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
                                                <span className='' onClick={() => handleAllReaded()}>Đánh dấu là tất cả đã đọc</span>
                                            )
                                        }
                                    ]
                                }
                            }
                        >
                            <PiDotsThreeCircleFill className='text-[2rem] cursor-pointer' />
                        </Dropdown>
                    </div>
                    <div className='p-4 flex flex-col gap-y-4 bg-white rounded-xl shadow-lg'>
                        {notification && (
                            notification.map((items, index) => (
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
                                                                <span className='' onClick={() => handleDelete(items.id)}>Xóa thông báo này</span>
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
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </>
    )
}
export default Notifications;