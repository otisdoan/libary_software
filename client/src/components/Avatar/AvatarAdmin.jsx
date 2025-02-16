import { Avatar, Dropdown } from 'antd';
import avatarAdmin from "../../assets/images/z5581996737056_ec0f21259be216a6270fde9f7c300f4f.jpg"
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
function AvatarAdmin() {
    const items = [
        {
            key: '1',
            icon: <FaUser />,
            label: (
                <Link>My profile</Link>
            )
        },
        {
            key: '2',
            icon: <IoLogOutSharp />,
            label: (
                <Link>Log out</Link>
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