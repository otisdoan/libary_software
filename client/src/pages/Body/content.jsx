import { Link, Outlet } from "react-router-dom";
import HomeCarousel from "../../components/Carousels/HomeCarousel";
import Category from "../../components/Category/Category";
import Tab from "../../components/Tabs/Tabs";
import { Card, Carousel } from "antd";
import { useEffect, useState } from "react";
import { bookApi } from "../../api/bookApi";
import Meta from "antd/es/card/Meta";
function Content() {
    const [ktcategory, setKtcategory] = useState([]);
    const [knscategory, setKnscategory] = useState([]);

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
    }, []);

    useEffect(() => {
        const fetchKTCatefory = async () => {
            try {
                const result = await bookApi.searchBookByCategory("Tâm lý - Kỹ năng sống");
                if (result) {
                    setKnscategory(result);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchKTCatefory();
    }, []);

    return (
        <>
            <div className="pb-[50px] pt-[20px]">
                <HomeCarousel />
                <Category />
                <Tab />
                <div className="container mx-auto px-[6rem]">
                    <Outlet />
                </div>
                <div className="rounded-[10px] bg-white p-4 mt-4">
                    <h1 className="text-[1.5rem] font-bold mb-[20px]">Thể loại nổi bật</h1>
                    <Carousel
                        slidesToShow={4}
                        slidesToScroll={1}
                        autoplay
                        autoplaySpeed={2500}
                        arrows={true}
                        className=""
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
                    <h1 className="text-[1.5rem] font-bold mb-[20px]">Tâm lý - Kỹ năng sống</h1>
                    <Carousel
                        slidesToShow={4}
                        slidesToScroll={1}
                        autoplay
                        autoplaySpeed={2000}
                        arrows={true}
                        className=""
                        dots={false}
                    >
                        {knscategory.map((element, index) => (
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
            </div>
        </>
    )
}
export default Content;