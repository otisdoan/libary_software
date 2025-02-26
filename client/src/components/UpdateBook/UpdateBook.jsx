
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { authorApi } from "../../api/authorApi";
import { publisherApi } from "../../api/publisherApi";
import { categoryApi } from "../../api/categoryApi";
const { TextArea } = Input;
function UpdateBook({ book, onBookUpdate }) {
    const [currentPage, setCurrentPage] = useState();
    const [sizePage, setSizePage] = useState();
    const [author, setAuthor] = useState([]);
    const [publisher, setPublisher] = useState([]);
    const [category, setCategory] = useState([]);
    const optionsAuthor = [];
    const optionsPublishers = [];
    const optionsCategory = [];
    const fetchApi = async (api, functionName, set) => {
        try {
            const result = await api[functionName](currentPage, sizePage, 'name');
            set(result.data);
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
    const [form] = Form.useForm();
    useEffect(() => {
        if (book) {
            form.setFieldsValue({
                title: book.title || '',
                totalBook: book.totalBook || '',
                description: book.description || '',
                author: book.author || '',
                categoryName: book.categoryName || '',
                publisher: book.publisher || '',
                isbn: book.isbn || '',
                image: book.image || ''
            })
        }
    }, [book, form])
    const changedValue = (_, allFields) => {
        onBookUpdate(allFields);
    }
    return (
        <>
            <div className="flex flex-col gap-y-4 p-[50px]">
                <h1 className="text-[1.4rem] font-bold">Update Book</h1>
                <Form
                    form={form}
                    onValuesChange={changedValue}
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
                </Form>
            </div>
        </>
    )
}
export default UpdateBook; 