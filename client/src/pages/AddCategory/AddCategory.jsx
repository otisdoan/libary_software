import { Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import { categoryApi } from "../../api/categoryApi";

function AddCategory() {
    const navigate = useNavigate();
    const fetchApi = async (value) => {
        const result = await categoryApi.createCategory(value);
        return result;
    }
  
    const onFinish = async (values) => {
        try {
            const data = await fetchApi(values);
           console.log(data)
        } catch (error) {
            console.log(error);
            
        }
    };

    const handleCancel = () => {
        navigate(-1);
    }
    return (
        <>
            <div className="flex flex-col py-[100px] px-[400px]">
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