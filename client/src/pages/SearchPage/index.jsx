import { useEffect, useState } from "react";
import { categoryApi } from "../../api/categoryApi";
import { Card, Checkbox, Empty, Pagination } from "antd";
import { Link, useParams } from "react-router-dom";
import { bookApi } from "../../api/bookApi";
import Meta from "antd/es/card/Meta";

function SearchPage() {
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [size, setSize] = useState(5);
    const [totalBook, setTotalBook] = useState();

    const handleChange = (e) => {
        setPageCurrent(e)
    }

    const handleChangeRadio = (e) => {
        console.log(e);
    }

    useEffect(() => {
        const fetchBookByTitle = async () => {
            try {
                const result = await bookApi.getAllBook(pageCurrent, size, 'title', params.title);
                if (result) {
                    setResultSearch(result.data);
                    setTotalBook(result.totalElements);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookByTitle();
    }, [pageCurrent, size, params.title])

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await categoryApi.getAllCategories(1, 9999);
            setCategories(result.data);
        }
        fetchCategories();
    }, [])
    return (
        <>
            <div className="flex gap-x-4 mt-[50px]">
                <div className="w-1/3 rounded-[10px] bg-white p-4 sticky top-[150px] h-full">
                    <h1 className="text-[#ff4500] text-[1.5rem] font-bold mt-[30px] mb-[15px]">LỌC THEO</h1>
                    <div className="w-full h-1 border-t-black border-t-[1px] opacity-15"></div>
                    <h2 className="text-[1.1rem] font-bold mt-[20px] ">THỂ LOẠI</h2>
                    <div >
                        <Checkbox.Group className="flex flex-col gap-y-2 mt-[20px] mb-[20px]" onChange={handleChangeRadio}>
                            {categories.map((items, index) => (
                                <div key={index} >
                                    <Checkbox value={items.name}>{items.name}</Checkbox>
                                </div>
                            ))}
                        </Checkbox.Group>
                    </div>
                    <div className="w-full h-1 border-t-black border-t-[1px] opacity-15 mb-[20px]"></div>
                </div>
                <div className="w-2/3 rounded-[10px] bg-white p-4">
                    <h1 className="text-[1.2rem] font-bold mb-[20px]">KẾT QUẢ TÌM KIẾM: <span className="text-blue-500">{`${params.title} (${totalBook} kết quả)`}</span></h1>
                    <div className="w-full h-1 border-t-black border-t-[1px] opacity-15 mb-[20px]"></div>
                    {resultSearch.length > 0 ? (
                        <div className="flex items-center gap-3 justify-start mb-[50px] mt-[50px]">
                            {resultSearch.map((element, index) => (
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
                    ) : (
                        <div className="flex items-center justify-center mt-[150px]">
                            <Empty />
                        </div>
                    )}
                    {resultSearch.length > 0 && (
                        <div className='flex items-center justify-center'>
                            <Pagination current={pageCurrent} total={totalBook} pageSize={size}
                                onChange={handleChange} />
                        </div>
                    )}
                </div>
            </div>
            <div className="rounded-[10px] bg-white p-4 mt-4">
                <h1 className="text-[1.5rem] font-bold text-center">Gợi ý cho bạn</h1>
            </div>
        </>
    )
}
export default SearchPage;