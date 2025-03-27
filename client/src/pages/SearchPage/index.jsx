import { useEffect, useState } from "react";
import { categoryApi } from "../../api/categoryApi";
import { Breadcrumb, Card, Carousel, Checkbox, Empty, Pagination } from "antd";
import { Link, useParams } from "react-router-dom";
import { bookApi } from "../../api/bookApi";
import Meta from "antd/es/card/Meta";
import { MdHome } from "react-icons/md";

function SearchPage() {
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [size, setSize] = useState(18);
    const [totalBook, setTotalBook] = useState();
    const [totalAllBook, setTotalAllBook] = useState();
    const [reload, setReload] = useState(false);
    const [allBook, setAllBook] = useState([]);
    const [pageCurrentBook, setPageCurrentBook] = useState(1);
    const [ktcategory, setKtcategory] = useState([]);
    const handleChange = (e) => {
        setPageCurrent(e)
    }

    const handleChangeRadio = async (values) => {
        try {
            if (values && values.length > 0) {
                const result = await bookApi.searchBookByCategory(values);
                console.log('Category', result);
                setResultSearch(result);
                setTotalBook(result.length);
            } else {
                setReload(true)
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handlePageChange = (page) => {
        setPageCurrentBook(page);
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
    }, [pageCurrent, size, params.title, reload])

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await categoryApi.getAllCategories(1, 9999);
            setCategories(result.data);
        }
        fetchCategories();
    }, [])

    useEffect(() => {
        const fetchAllBook = async () => {
            try {
                const result = await bookApi.getAllBook(pageCurrentBook, size);
                if (result) {
                    setAllBook(result.data);
                    setTotalAllBook(result.totalElements);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBook();
    }, [pageCurrentBook, size])

    useEffect(() => {
        const fetchKTCatefory = async () => {
            try {
                const result = await bookApi.searchBookByCategory("Kinh tế");
                if (result) {
                    setKtcategory(result);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchKTCatefory();
    }, [])
    return (
        <>
            <div className="my-[10px] bg-white rounded-lg p-2 shadow-md">
                <Breadcrumb separator='>'>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <div className="flex items-center gap-x-1">
                                <MdHome className="text-[1.2rem] text-orange-600" />
                                <span>Trang chủ</span>
                            </div>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Kết quả tìm kiếm: <span className="text-blue-500">{`${params.title} (${totalBook} kết quả)`}</span></Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="flex gap-x-4 mt-[16px]">
                <div className="w-1/4 rounded-[10px] bg-white p-4 sticky top-[150px] h-full">
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
                <div className="w-3/4 rounded-[10px] bg-white p-4">
                    <h1 className="text-[1.2rem] font-bold mb-[20px]">KẾT QUẢ TÌM KIẾM: <span className="text-blue-500">{`${params.title} (${totalBook} kết quả)`}</span></h1>
                    <div className="w-full h-1 border-t-black border-t-[1px] opacity-15 mb-[20px]"></div>
                    {resultSearch.length > 0 ? (
                        <div className="flex justify-center">
                            <div className="flex items-center gap-3 my-[50px] flex-wrap justify-center">
                                {resultSearch.map((element, index) => (
                                    <div key={index} className="flex justify-start">
                                        <Link to={`/book-detail/${element.id}`} >
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
                                    </div>
                                ))}
                            </div>
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
                <h1 className="text-[1.5rem] font-bold">Thể loại nổi bật</h1>
                <Carousel
                    slidesToShow={4}
                    slidesToScroll={1}
                    autoplay
                    autoplaySpeed={2000}
                    arrows={true}
                    className="my-[10px]"
                    dots={false}
                >
                    {ktcategory.map((element, index) => (
                        <div key={index}>
                            <div className="px-2">
                                <Link to={`/book-detail/${element.id}`} >
                                    <Card
                                        hoverable
                                        key={index}
                                        className="shadow-lg"
                                        cover={
                                            <img
                                                src={element.image}
                                                className="hover:scale-90 duration-500 transition-transform"
                                            />
                                        }
                                        actions={[
                                            <div key={index} className="flex justify-center gap-x-2">
                                                <span>Đã mượn</span>
                                                <span className="text-red-500">{element.borrowBook}</span>
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
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="rounded-[10px] bg-white p-4 mt-4">
                <h1 className="text-[1.5rem] font-bold text-center">Gợi ý cho bạn</h1>
                <div className="flex justify-center">
                    <div className="flex items-center gap-6 my-[50px] flex-wrap  justify-center">
                        {allBook.map((element, index) => (
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
                                            <span className="text-red-500">{element.borrowBook}</span>
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
                <div className='flex items-center justify-center mb-[50px]'>
                    <Pagination current={pageCurrentBook} total={totalAllBook} pageSize={size} onChange={handlePageChange} />
                </div>
            </div>

        </>
    )
}
export default SearchPage;