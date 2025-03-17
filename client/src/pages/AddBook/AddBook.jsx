
import { Alert, Button, Form, Input, message, Select, Upload } from "antd";
import { authorApi } from "../../api/authorApi";
import { useEffect, useState } from "react";
import { publisherApi } from "../../api/publisherApi";
import { categoryApi } from "../../api/categoryApi";
import { UploadOutlined } from '@ant-design/icons';
import { bookApi } from "../../api/bookApi";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
function AddBook() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [bookCurrent, setBookCurrent] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [sizePage, setSizePage] = useState(1e12);
    const [author, setAuthor] = useState([]);
    const [publisher, setPublisher] = useState([]);
    const [category, setCategory] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [hidden, setHidden] = useState('hidden');
    const optionsAuthor = [];
    const optionsPublishers = [];
    const optionsCategory = [];
    const fetchApi = async (api, functionName, setName) => {
        try {
            const result = await api[functionName](currentPage, sizePage, 'name');
            setName(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    const pushArray = (nameArray, optionsName) => {
        nameArray.forEach((element) => {
            optionsName.push({
                label: element.name,
                value: element.name
            });
        });
    };

    pushArray(author, optionsAuthor);
    pushArray(publisher, optionsPublishers);
    pushArray(category, optionsCategory);
    useEffect(() => {
        fetchApi(authorApi, 'getAllAuthor', setAuthor);
        fetchApi(publisherApi, 'getAllPublisher', setPublisher);
        fetchApi(categoryApi, 'getAllCategories', setCategory);
    }, [currentPage])


    const onFinish = async (value) => {
        const book = {
            ...value,
            author: Array.isArray(value.author) ? value.author.join(', ') : "",
            publisher: Array.isArray(value.publisher) ? value.publisher.join(', ') : "",
            // category: Array.isArray(value.category) ? value.category.join(', ') : ""
        }
        try {
            const result = await bookApi.createBook(book);
            console.log(result)
            setHidden('');
            setShowAlert(true);
            setTimeout(() => {
                navigate(-1);
            }, 1500)
        } catch (error) {
            console.log(error)
            setHidden('');
        }
    }
    const handleCancel = () => {
        navigate(-1);
    }
    return (
        <>
            <div className={"w-full flex items-center justify-center mt-[50px] " + hidden}>
                {showAlert ? (
                    <Alert message="Thêm thành công" type="success" showIcon closable className="w-[250px]" />
                ) : (
                    <Alert message="Book có thể đã tồn tại!" type="error" showIcon closable />
                )}
            </div>
            <div className="flex flex-col gap-y-4 p-[50px]">
                <h1 className="text-[1.4rem] font-bold">Add New Book</h1>
                <Form
                    onFinish={onFinish}
                >
                    <div className="flex items-center gap-x-4">
                        <Form.Item
                            name={'title'}
                            label="Title"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                            className="w-1/2"

                        >
                            <Input placeholder="Title" />

                        </Form.Item>
                        <Form.Item
                            name={'totalBook'}
                            label="Total book"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Total book is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <Input placeholder="Total book" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Description"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name={'description'}
                    >
                        <TextArea rows={4} placeholder="Desciption..." />
                    </Form.Item>
                    <div className="flex items-center w-full gap-x-4">
                        <Form.Item
                            label="Select author"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name={'author'}
                            className="w-1/2"
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                        >
                            <Select
                                mode="multiple"
                                size={'large'}
                                placeholder="Select author"
                                options={optionsAuthor}
                            />
                        </Form.Item>
                        <Form.Item
                            name={'categoryName'}
                            className="w-1/2"
                            label="Select category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                        >
                            <Select
                                mode="multiple"
                                size={'large'}
                                placeholder="Select category"
                                options={optionsCategory}
                            />
                        </Form.Item>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <Form.Item
                            name={'publisher'}
                            label="Select publishers"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            className="w-1/2"
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                        >
                            <Select
                                mode="multiple"
                                size={'large'}
                                placeholder="Select publishers"
                                options={optionsPublishers}
                            />
                        </Form.Item>
                        <Form.Item
                            name={'isbn'}
                            label="ISBN"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <Input placeholder="ISBN" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name={'image'}
                        className="w-1/2"
                        label="Image"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: 'Title is required!'
                            }
                        ]}
                    >
                        <Input placeholder="Link image" />
                    </Form.Item>
                    <div className="flex items-center justify-between">
                        <Form.Item>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    )
}
export default AddBook; 