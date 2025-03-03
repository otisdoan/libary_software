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
                            <Link to='#' key={index} style={{ color: 'red' }} className="hover:font-bold">Borrow book</Link>
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
                ))}
            </div>
            
        </>
    )
}
export default Books;