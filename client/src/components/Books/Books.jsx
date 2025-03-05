import { useEffect, useState } from "react";
import { bookApi } from "../../api/bookApi";
import { Card } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;
function Books() {
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(1000);
    const [books, setBooks] = useState([]);
    const fetchApi = async (page) => {
        try {
            const result = await bookApi.getAllBook(page, pageSize, 'id');
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
                    <Link to={`/book-detail/${element.id}`} key={index}>
                        <Card
                            hoverable
                            key={index}
                            className="w-[250px]"
                            cover={
                                <img
                                    src={element.image}
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

        </>
    )
}
export default Books;