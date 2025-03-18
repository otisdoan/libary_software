import { useEffect, useState } from "react";
import { bookApi } from "../../api/bookApi";
import { Card, Pagination } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;
function Books() {
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [books, setBooks] = useState([]);
    const [totalBook, setTotalBook] = useState(0);
    const fetchApi = async (page) => {
        try {
            const result = await bookApi.getAllBook(page, pageSize, 'id');
            console.log(result);
            setBooks(result.data);
            setPageCurrent(result.currentPage);
            setPageSize(result.currentSize);
            setTotalBook(result.totalElements)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePageChange = (e) => {
        setPageCurrent(e);
    }
    useEffect(() => {
        fetchApi(pageCurrent);
    }, [pageCurrent])
    return (
        <>
            <div className="flex justify-center">
                <div className="flex items-center gap-6 my-[50px] flex-wrap w-[90%] px-[12px]">
                    {books.map((element, index) => (
                        <Link to={`/book-detail/${element.id}`} key={index}>
                            <Card
                                hoverable
                                key={index}
                                className="w-[250px] shadow-2xl"
                                cover={
                                    <img
                                        src={element.image}
                                        className="hover:scale-90 duration-500 transition-transform"
                                    />
                                }
                                actions={[
                                    <div key={index} className="flex justify-center gap-x-2">
                                        <span>Đã mượn</span>
                                        <span className="text-red-500">{element.leftBook}</span>
                                    </div>
                                ]}
                            >
                                <Meta
                                    title={element.title}
                                    description={
                                        <>
                                            Total book: <span style={{ color: 'red' }}>{element.totalBook}</span>
                                        </>
                                    }
                                />
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex items-center justify-center mb-[100px]'>
                <Pagination current={pageCurrent} total={totalBook} pageSize={pageSize}
                    onChange={handlePageChange} />
            </div>
        </>
    )
}
export default Books;