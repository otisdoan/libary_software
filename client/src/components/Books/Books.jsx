import { useEffect, useState } from "react";
import { bookApi } from "../../api/bookApi";
import { Card } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;
function Books() {
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [books, setBooks] = useState([]);
    const fetchApi = async (page) => {
        try {
            const result = await bookApi.getAllBook(page, pageSize, 'title');
            console.log(result);
            setBooks(result.data);
            setPageCurrent(result.currentPage);
            setPageSize(result.currentSize);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchApi(pageCurrent);
    }, [pageCurrent])
    return (
        <>
            <div className="flex items-center flex-wrap gap-[40px] justify-center mb-[50px] mt-[50px]">
                {books.map((element, index) => (
                    <Card
                        hoverable
                        key={index}
                        className="w-[250px]"
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <Link to='#' key={index}>Borrow</Link>
                        ]}
                    >
                        <Meta
                            title={element.title}
                            description={`Total book: ${element.totalBook}`}
                        />
                    </Card>
                ))}
            </div>
        </>
    )
}
export default Books;