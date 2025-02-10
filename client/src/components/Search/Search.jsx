import "./Search.css"
import { Input, Space } from 'antd';
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
function Searchs() {
    return (
        <Space direction="vertical">
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </Space>
    )
}
export default Searchs;