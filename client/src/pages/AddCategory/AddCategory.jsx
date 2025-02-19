import { Alert, Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import { categoryApi } from "../../api/categoryApi";
import { useState } from "react";
import axios from "axios";

function AddCategory() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [hidden, setHidden] = useState('hidden');

    const fetchApi = async (value) => {
        const result = await categoryApi.createCategory(value);
        return result;
    }

    const onFinish = async (values) => {
        console.log(values);
        try {
            const data = await fetchApi(values);
            console.log(data);
            if (data) {
                setHidden('');
                setShowAlert(true);
                setTimeout(() => {
                    navigate(-1);
                }, 1500)
            } 
        } catch (error) {
            console.log(error);
            setHidden('');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    }
    return (
        <>
            <div className= {"w-full flex items-center justify-center mt-[50px] " + hidden}>
                {showAlert ? (
                    <Alert message="Thêm thành công" type="success" showIcon closable className="w-[250px]"/>
                ) : (
                    <Alert message="Category có thể đã tồn tại!" type="error" showIcon closable/>
                )}
            </div>
            <div className="flex flex-col py-[120px] px-[400px]">
                <h1 className="text-[1.2rem] text-center">Add new category</h1>
                <Form
                    onFinish={onFinish}
                >
                    <Form.Item
                        name={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Name is required!'
                            }
                        ]}
                    >
                        <div>
                            <span>Name</span>
                            <Input placeholder="Enter new category" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name={'description'}
                    >
                        <div>
                            <span>Desciption</span>
                            <Input placeholder="Description" />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex justify-between">
                            <Button htmlType="submit" type="primary">Save</Button>
                            <Button type="default" onClick={handleCancel}>Cancel</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default AddCategory;