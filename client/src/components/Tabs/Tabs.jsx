import { Tabs } from 'antd';
import Books from '../Books/Books';
function Tab() {

    const items = [
        {
            key: '1',
            label: 'Sách HOT',
            children: <Books />
        }
    ];
    return (
        <>
            <div className='mt-[20px] bg-white rounded-[10px]'>
                <Tabs defaultActiveKey="1" items={items} centered />
            </div>
        </>
    )
}
export default Tab;