import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bookApi } from "../../api/bookApi";
import { Avatar, Breadcrumb, Button, Card, Carousel, DatePicker, Dropdown, Empty, Form, Input, List, Modal, notification, Pagination, Tabs, Typography } from "antd";
import { GiReturnArrow } from "react-icons/gi";
import { MdAutorenew } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import Meta from "antd/es/card/Meta";
import dayjs from 'dayjs';
import { bookBorrowApi } from "../../api/bookBorrowApi";
import { reviewBookApi } from "../../api/reviewBookApi";
import { UserOutlined } from '@ant-design/icons';
import { RiMore2Fill } from "react-icons/ri";
import { MdHome } from "react-icons/md";
const { Paragraph } = Typography;
function BookDetail() {
    const today = dayjs();
    const [form] = Form.useForm();
    const [isModalOpenBorrow, setIsModalBorrowOpen] = useState(false);
    const [isModalOpenRenew, setIsModalOpenRenew] = useState(false);
    const [isModalOpenFeedback, setIsModalOpenFeedBack] = useState(false);
    const [isModalOpenRequest, setIsModalOpenRequest] = useState(false);
    const [ellipsis, setEllipsis] = useState(true);
    const [allBook, setAllBook] = useState([]);
    const [ktcategory, setKtcategory] = useState([]);
    const [knscategory, setKnscategory] = useState([]);
    const { id } = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const dateFormat = 'DD/MM/YYYY';
    const [api, contextHolder] = notification.useNotification();
    const [reviewBook, setReviewBook] = useState([]);
    const userId = localStorage.getItem('userId');
    const [resultFeedback, setResultFeedback] = useState({});
    const [totalReview, setTotalReview] = useState(0);
    const [size, setSize] = useState(5);
    const [sizePage, setSizePgae] = useState(16);
    const [pageFeedback, setPageFeedback] = useState(1);
    const [isOpenModalUpdateFeedback, setIsOpenModalUpdateFeedback] = useState(false);
    const [idReviewUpdate, setIdReviewUpdate] = useState();
    const [pageCurrent, setPageCurrent] = useState(1);
    const [totalBook, setTotalBook] = useState([]);
    const items = [
        {
            key: '1',
            label: 'Mới nhất',
            children: (
                <>
                    {reviewBook.map((items, index) => (
                        <div key={index} className="flex flex-col p-4">
                            <div className="flex items-center gap-x-3">
                                <Avatar size={40} icon={<UserOutlined className="" />} />
                                <span>{items.email}</span>
                            </div>
                            <div className="flex justify-between pl-[50px] mt-[20px] items-center">
                                <span>{items.content}</span>
                                <Dropdown
                                    trigger={'click'}
                                    placement="bottomRight"
                                    dropdownRender={() => (
                                        <div className="flex flex-col gap-y-3 bg-white shadow-lg p-4 rounded-lg">
                                            <span className="cursor-pointer" onClick={() => hanldeUpdateFeedBack(items.id, items.content)}>Chỉnh sửa</span>
                                            <Modal open={isOpenModalUpdateFeedback} footer={false} onCancel={handleCancel}>
                                                <h1 className="font-bold text-[1.1rem] text-center">Chỉnh sửa bình luận</h1>
                                                <Form
                                                    wrapperCol={{ span: 24 }}
                                                    onFinish={onFinishUpdateFeedback}
                                                    form={form}

                                                >
                                                    <Form.Item
                                                        name={'content'}
                                                    >
                                                        <TextArea />
                                                    </Form.Item>
                                                    <Form.Item className="flex justify-end">
                                                        <Button className="mr-[10px]" onClick={handleCancel}>Hủy</Button>
                                                        <Button type="primary" danger htmlType="submit">Chỉnh sửa</Button>
                                                    </Form.Item>
                                                </Form>
                                            </Modal>
                                            <span className="cursor-pointer" onClick={() => handleDeleteReview(items.id)}>Xóa bình luận</span>
                                        </div>
                                    )}
                                >
                                    <RiMore2Fill className="text-[1rem] cursor-pointer w-[30px] h-[30px] rounded-full p-2 hover:bg-gray-400" />
                                </Dropdown>
                            </div>
                            <div className="w-full h-1 border-t-[1px] border-t-black opacity-15 mt-[30px]"></div>
                        </div>
                    ))}
                </>
            )
        }
    ]
    const handleDeleteReview = async (id) => {
        try {
            if (id) {
                const result = await reviewBookApi.deleteReview(id);
                setResultFeedback(result);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onFinishUpdateFeedback = async (values) => {
        try {
            const result = await reviewBookApi.updateReview(idReviewUpdate, values);
            if (result) {
                setResultFeedback(result);
                setIsOpenModalUpdateFeedback(false);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const hanldeUpdateFeedBack = (id, content) => {
        console.log(content);
        setIdReviewUpdate(id);
        setIsOpenModalUpdateFeedback(true);
        form.setFieldsValue({
            content: content
        })
    }
    const fetchApi = async () => {
        try {
            if (id) {
                const result = await bookApi.getBookById(id);
                setBookDetail(result);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const showModalBorrow = () => {
        setIsModalBorrowOpen(true);
    }
    const showModalRenew = () => {
        setIsModalOpenRenew(true)
    }
    const showModalFeedback = () => {
        setIsModalOpenFeedBack(true)
    }
    const showModalRequest = () => {
        setIsModalOpenRequest(true);
    }
    const handleCancel = () => {
        setIsModalBorrowOpen(false);
        setIsModalOpenRenew(false);
        setIsModalOpenFeedBack(false);
        setIsModalOpenRequest(false);
        setIsOpenModalUpdateFeedback(false);
    }
    const handleExpandMore = () => {
        setEllipsis(false);
    }
    const handleExpandSmall = () => {
        setEllipsis(true);
    }

    const onFinish = async (values) => {
        const { content } = values;
        try {
            if (userId) {
                const result = await reviewBookApi.creatReview(
                    {
                        "userId": userId,
                        "bookId": id,
                        "content": content
                    }
                )
                if (result) {
                    setResultFeedback(result);
                    setIsModalOpenFeedBack(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const onFinishRequest = async (values) => {
        try {
            const userId = localStorage.getItem('userId');
            const result = await bookBorrowApi.requestBorrowBook(userId, id, values.returnDays);
            if (result) {
                setIsModalOpenRequest(false);
                api['success']({
                    message: 'Yêu cầu mượn sách thành công',
                    description:
                        'Yêu cầu mượn sách của bạn đã được gửi thành công và đang chờ phê duyệt.',
                    duration: 5
                });
            }
        } catch (error) {
            console.log(error);
            setIsModalOpenRequest(false);
            api['error']({
                message: 'Yêu cầu mượn sách không thành công',
                description: error?.response?.data?.message,
                duration: 5
            });
        }
    }
    const handleChangePageFeedback = (page) => {
        setPageFeedback(page)
    }
    useEffect(() => {
        fetchApi();
        console.log(bookDetail)
    }, [id])

    const handleChangePage = (page) => {
        setPageCurrent(page);
    }
    useEffect(() => {
        const fetchBookByTitle = async () => {
            if (id) {
                const result = await bookApi.getAllBook(pageCurrent, sizePage, id);
                if (result) {
                    setAllBook(result.data);
                    setTotalBook(result.totalElements);
                }
            }
        }
        fetchBookByTitle();
    }, [pageCurrent, sizePage, id])

    useEffect(() => {
        const fetchAllReview = async () => {
            try {
                if (id) {
                    const result = await reviewBookApi.getAllReview(id, pageFeedback, size);
                    if (result) {
                        setReviewBook(result.data);
                        setTotalReview(result.totalElements)
                    }
                }
            } catch (error) {
                console.log(error)
            }

        }
        fetchAllReview();
    }, [id, resultFeedback, pageFeedback, size]);
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
            {contextHolder}
            <div className="my-[10px] bg-white rounded-lg p-2 shadow-md">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <Link to="/">
                            <div className="flex items-center gap-x-1">
                                <MdHome className="text-[1.2rem] text-orange-600" />
                                <span>Trang chủ</span>
                            </div>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{bookDetail.title}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="flex gap-x-4 justify-center">
                <div className="w-[40%] bg-white p-[40px] rounded-lg h-full sticky top-[150px]">
                    <div className="flex flex-col gap-y-4 items-center mb-[16px]">
                        <img src={bookDetail.image} className="h-full w-full hover:scale-105 duration-500" />
                        <Button type="primary" danger className="h-[40px] w-[250px] animate-pulse " onClick={showModalRequest}>Gửi yêu cầu mượn</Button>
                        <Modal
                            open={isModalOpenRequest}
                            onCancel={handleCancel}
                            footer={false}
                        >
                            <h3 className="text-[1.1rem]">Thông tin mượn sách</h3>
                            <Form
                                onFinish={onFinishRequest}
                                labelCol={{
                                    span: 24
                                }}
                                wrapperCol={{
                                    span: 24
                                }}
                            >
                                <Form.Item
                                    label={'Tên sách'}
                                >
                                    <Input value={bookDetail.title} />
                                </Form.Item>
                                <Form.Item
                                    label={'Ngày mượn'}
                                    name={'borrowDay'}
                                >
                                    <DatePicker format={dateFormat} defaultValue={today} disabled />
                                </Form.Item>
                                <Form.Item
                                    label={'Ngày trả'}
                                    name={'returnDays'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Bắt buộc phải nhập!'
                                        },
                                        {
                                            pattern: /^(?:[1-9]|[12][0-9]|3[01])$/,
                                            message: 'Vui lòng nhập một số nguyên từ 1 đến 31!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Ngày trả" className="w-1/4 h-[40px]" />
                                </Form.Item>
                                <Form.Item className="flex justify-end">
                                    <Button htmlType="submit" type="default" className="mr-[16px]" onClick={handleCancel}>Hủy</Button>
                                    <Button htmlType="submit" type="primary" danger>Gửi yêu cầu</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <h1 className="font-semibold mb-[30px]">Chính sách của HoKo Book</h1>
                    <div className="flex gap-x-2 items-center justify-start mb-[15px]">
                        <GiReturnArrow className="text-orange-700 text-[1.1rem]" />
                        <span className="text-[0.9rem] flex gap-x-2 items-center">Chính sách mượn trả <IoIosArrowForward className="text-orange-600" onClick={showModalBorrow} /></span>
                        <Modal open={isModalOpenBorrow} footer={false} onCancel={handleCancel}>
                            <h1 className="text-center font-medium">CHÍNH SÁCH MƯỢN - TRẢ SÁCH TẠI THƯ VIỆN</h1>
                            <div>
                                <h3 >1. Đối tượng áp dụng</h3>
                                <p> Chính sách này áp dụng cho tất cả bạn đọc có thẻ thư viện hợp lệ, bao gồm sinh viên, giảng viên, và nhân viên.
                                </p>
                            </div>
                            <div>
                                <h3>2. Quy định mượn sách</h3>
                                <p>
                                    Mỗi bạn đọc được mượn tối đa 5 cuốn sách trong một lần.

                                    Thời gian mượn tối đa là 14 ngày. Có thể gia hạn một lần thêm 7 ngày, trừ khi sách đang có người đặt trước. Việc gia hạn phải được thực hiện trước ngày hết hạn thông qua hệ thống thư viện hoặc liên hệ trực tiếp thủ thư.

                                    Một số tài liệu đặc biệt (từ điển, sách tham khảo, luận án…) chỉ được đọc tại chỗ và không được mượn về.

                                    Bạn đọc phải kiểm tra tình trạng sách trước khi mượn và thông báo ngay nếu phát hiện hư hỏng.
                                </p>
                            </div>
                            <div>
                                <h3> 3. Quy định trả sách</h3>
                                <p>

                                    Sách phải được trả đúng thời hạn.

                                    Nếu trả sách muộn, bạn đọc sẽ bị phạt 1.000 VNĐ/ngày/sách.

                                    Nếu làm mất hoặc hư hỏng sách, bạn đọc phải bồi thường theo giá trị sách hoặc mua lại sách tương đương.

                                    Quá hạn trên 30 ngày, nếu không trả sách, tài khoản thư viện sẽ bị khóa và không được phép mượn thêm cho đến khi hoàn tất nghĩa vụ.

                                </p>
                            </div>
                        </Modal>
                    </div>
                    <div className="flex gap-x-2 items-center justify-start">
                        <MdAutorenew className="text-orange-700 text-[1.2rem]" />
                        <span className="text-[0.9rem] flex gap-x-2 items-center">Chính sách gia hạn sách <IoIosArrowForward className="text-orange-600" onClick={showModalRenew} /></span>
                        <Modal open={isModalOpenRenew} onCancel={handleCancel} footer={false}>
                            <div>
                                <h3>4. Quy định gia hạn sách</h3>
                                <p>
                                    Bạn đọc có thể gia hạn sách tối đa một lần với thời gian 7 ngày, trừ khi sách có người đặt trước.

                                    Việc gia hạn phải được thực hiện trước ngày hết hạn thông qua hệ thống thư viện hoặc liên hệ trực tiếp thủ thư.

                                    Nếu sách quá hạn, bạn đọc không thể gia hạn mà phải hoàn trả sách trước khi tiếp tục mượn lại.

                                    Nếu có nhu cầu gia hạn nhiều lần, bạn đọc cần trình bày lý do với thư viện để xem xét trường hợp đặc biệt.
                                </p>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className="w-[60%] flex flex-col gap-y-4">
                    <div className="bg-white p-[20px] rounded-lg">
                        <h1 className="text-[1.8rem]">{bookDetail.title}</h1>
                        <div className="flex items-center justify-between flex-wrap">
                            <p className="w-1/2 text-[0.8rem]"> Nhà xuất bản: <span className="font-bold text-[0.8rem]">{bookDetail.publisher}</span></p>
                            <p className="w-1/2 text-[0.8rem]">Tác giả: <span className="font-bold text-[0.8rem]">{bookDetail.author}</span></p>
                            <p className="w-full text-[0.8rem]">Thể loại: <span className="font-bold text-[0.8rem]">{(bookDetail.categoryName || []).join(', ')}</span></p>
                            <div className="w-full">
                                <p className="w-1/2 text-[0.8rem]">Đã mượn: <span className="font-bold">{bookDetail.leftBook}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-[20px] rounded-lg">
                        <h2 className="text-[1.1rem] font-bold">Thông tin chi tiết</h2>
                        <List
                            size="small"
                            dataSource={[
                                { title: "Mã số sách", description: bookDetail.isbn },
                                { title: "Tổng số sách", description: bookDetail.totalBook },
                                { title: "Tác giả", description: bookDetail.author },
                                { title: "Nhà xuất bản", description: bookDetail.publisher },
                                { title: "Thể loại", description: bookDetail.categoryName?.join(", ") },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <div className="flex items-center">
                                        <div className="min-w-[200px]">
                                            <span className="font-semibold">{item.title}:</span>
                                        </div>
                                        <div>
                                            <p className="m-0">{item.description}</p>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className="bg-white p-[20px] rounded-lg">
                        <h2 className="text-[1.1rem] font-bold">Mô tả sản phẩm</h2>
                        <Paragraph
                            ellipsis={
                                ellipsis ? {
                                    rows: 4,
                                } : false
                            }>
                            {bookDetail.description?.split('. ').map((element, index) => (
                                <Paragraph key={index}>{element}.</Paragraph>
                            ))}
                        </Paragraph>
                        <div className="text-center">
                            {ellipsis ? (
                                <Button type="link" onClick={handleExpandMore}>Xem thêm</Button>
                            ) : (
                                <Button type="link" onClick={handleExpandSmall}>Rút gọn</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-[20px] rounded-lg mt-[16px]">
                <h2 className="text-[1.1rem] font-bold">Đánh giá sản phẩm</h2>
                <div className="text-center mt-[20px] mb-[20px]">
                    <Button className="w-[300px]" danger onClick={showModalFeedback}><FaPen /> Viết đánh giá</Button>
                    <Modal
                        open={isModalOpenFeedback}
                        onCancel={handleCancel}
                        footer={false}
                    >
                        <h3 className="text-[1.1rem] font-medium uppercase text-center">Viết đánh giá sản phẩm</h3>
                        <Form
                            onFinish={onFinish}
                            wrapperCol={{
                                span: 24
                            }}
                        >
                            <Form.Item
                                name={'content'}
                            >
                                <TextArea rows={4} placeholder="Nhận xét của bạn về sách" className="mt-[20px]" />
                            </Form.Item>
                            <Form.Item className="flex justify-end items-center">
                                <Button className="text-gray-500 mr-[10px]" >
                                    Hủy
                                </Button>
                                <Button className="bg-red-500 text-white" htmlType="submit">
                                    Gửi nhận xét
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div>
                    <Tabs items={items} />
                    {totalReview ? (
                        <div className="flex justify-center">
                            <Pagination total={totalReview} pageSize={size} current={pageFeedback} onChange={handleChangePageFeedback} />
                        </div>
                    ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                </div>
            </div>
            <div className="bg-white p-[20px] rounded-lg mt-[16px]">
                <h2 className="text-[1.2rem] font-bold">Gợi ý cho bạn</h2>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-6 my-[50px] flex-wrap justify-center">
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
                    <div>
                        <Pagination total={totalBook} pageSize={sizePage} current={pageCurrent} onChange={handleChangePage} />
                    </div>
                </div>
            </div>
            <div className="rounded-[10px] bg-white p-4 mt-4">
                <h1 className="text-[1.2rem] font-bold mb-[20px]">Thể loại nổi bật</h1>
                <Carousel
                    slidesToShow={5}
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
            <div className="rounded-[10px] bg-white p-4 mt-4 mb-[50px]">
                <h1 className="text-[1.2rem] font-bold mb-[20px]">Tâm lý - Kỹ năng sống</h1>
                <Carousel
                    slidesToShow={5}
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
        </>
    )
}
export default BookDetail;