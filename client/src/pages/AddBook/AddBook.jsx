import { Button, Form, Input, Select } from "antd";
const { TextArea } = Input;
function AddBook() {
    const handleChange = () => {

    }
    const options = [];
    return (
        <>
            <div className="flex flex-col gap-y-4 p-[50px]">
                <h1 className="text-[1.4rem] font-bold">Add New Book</h1>
                <Form
                >
                    <div className="flex items-center gap-x-4">
                        <Form.Item
                            name={'title'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Title</span>
                                <Input placeholder="Title" />
                            </div>
                        </Form.Item>
                        <Form.Item
                            name={'totalBook'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Total book is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Total book</span>
                                <Input placeholder="Total book" />
                            </div>
                        </Form.Item>
                    </div>
                    <Form.Item
                        name={'desciption'}
                    >
                        <div>
                            <span>Desciption</span>
                            <TextArea rows={4} placeholder="Desciption..." />
                        </div>
                    </Form.Item>
                    <div className="flex items-center w-full gap-x-4">
                        <Form.Item
                            name={'author'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span> Select author</span>
                                <Select
                                    mode="multiple"
                                    size={'large'}
                                    placeholder="Select author"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </div>
                        </Form.Item>
                        <Form.Item
                            name={'category'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Select category</span>
                                <Select
                                    mode="multiple"
                                    size={'large'}
                                    placeholder="Select category"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </div>
                        </Form.Item>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <Form.Item
                            name={'publishers'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Select publishers</span>
                                <Select
                                    mode="multiple"
                                    size={'large'}
                                    placeholder="Select publishers"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </div>
                        </Form.Item>
                        <Form.Item
                            name={'isbn'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>ISBN</span>
                                <Input placeholder="ISBN" />
                            </div>
                        </Form.Item>
                    </div>
                    <div className="flex items-center justify-between">
                        <Form.Item>
                            <Button>Cancle</Button>
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