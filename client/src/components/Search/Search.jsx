import { Input } from 'antd';
const { Search } = Input;
const onSearch = (value) => console.log(value);
function Searchs() {
  return (
    <>
      <Search placeholder="Search" onSearch={onSearch} enterButton  className='w-full'/>
    </>
  )
}
export default Searchs;