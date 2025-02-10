import { Badge } from 'antd';
import { BellOutlined, ShoppingCartOutlined } from "@ant-design/icons";
function Badges() {
    return (
        <>
            <Badge size="small" count={5} className='mr-[2rem]'>
                <BellOutlined className='text-[20px]' />
            </Badge>
            <Badge size="small" count={5}>
                <ShoppingCartOutlined className='text-[20px]' />
            </Badge>

        </>
    )
}
export default Badges;