import { Avatar, Button, Dropdown } from 'antd';
import avatarAdmin from "../../assets/images/z5581996737056_ec0f21259be216a6270fde9f7c300f4f.jpg"
import { Link } from 'react-router-dom';
import { IoLogOutSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
function AvatarAdmin() {
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    }
    const items = [
        {
            key: '1',
            icon: <IoHomeOutline />,
            label: (
                <Link to="/">Home page</Link>
            )
        },
        {
            key: '2',
            icon: <IoLogOutSharp />,
            label: (
                <Button className='p-0 text-black' type='link' onClick={handleLogout}>Log out</Button>
            )
        }
    ]
    return (
        <>
            <Dropdown
                trigger={'click'}
                menu={{
                    items,
                }}
            >
                <Avatar src={<img src={avatarAdmin} alt="avatar" className='cursor-pointer'/>} />
            </Dropdown>
        </>
    )
}
export default AvatarAdmin;