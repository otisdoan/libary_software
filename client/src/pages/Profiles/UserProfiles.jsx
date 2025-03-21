import { Breadcrumb, Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfileApi } from "../../api/userProfileApi";
import { MdHome } from "react-icons/md";

function UserProfile() {
    const userId = localStorage.getItem('userId');
    const emailUser = localStorage.getItem('email');
    const [userProfile, setUserProfile] = useState({});
    const [inforUpdate, setInforUpdate] = useState({});
    const [form] = Form.useForm();
    const onFinish = (e) => {
        console.log(e);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            setIsModalOpen(false);
            const result = await useProfileApi.upDateProfile(userId, inforUpdate);
            if (result) {

                form.setFieldsValue({
                    gender: result?.gender || '',
                    fullName: result?.fullName || '',
                    avatar: result?.avatar || ''
                })
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange = (_, allValues) => {
        setInforUpdate(allValues)
    }
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const result = await useProfileApi.getUserProfile(userId);
                console.log(result);
                form.setFieldsValue({
                    gender: result?.gender || '',
                    fullName: result?.fullName || '',
                    avatar: result?.avatar || ''
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfiles();
    }, [userId, form])
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
                    <Breadcrumb.Item>
                        Profile
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="flex flex-col gap-x-4 pt-[50px] px-[200px] pb-[100px]">
                <h1 className="text-[1.4rem] font-medium text-center mb-[50px] ">Hồ sơ</h1>
                <Form
                    wrapperCol={{ span: 24 }}
                    labelCol={{ span: 24 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <div className="flex gap-x-4 ">
                        <Form.Item
                            label='User ID'
                            className="w-1/2"
                        >
                            <Input value={userId} disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label='Họ và tên'
                            name={'fullName'}
                            className="w-1/2"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                    </div>
                    <div className="flex gap-x-4 items-center ">
                        <Form.Item
                            label='Email'
                            className="w-1/2"
                        >
                            <Input value={emailUser} disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label='Giới tính'
                            name={'gender'}
                            className="w-1/4"
                        >
                            <Select disabled className="h-[40px]" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label='Avatar'
                        name={'avatar'}
                        className="w-1/3"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item className="text-center mt-[70px]">
                        <Button type="primary" htmlType="submit" className="w-[300px]" onClick={showModal}>Chỉnh sửa thông tin</Button>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Lưu'} cancelText={'Hủy'}>
                            <div>
                                <h1 className="text-[1.3rem] font-bold text-center">Chỉnh sửa thông tin</h1>
                                <Form
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    className="flex flex-col"
                                    form={form}
                                    onValuesChange={handleChange}
                                >
                                    <Form.Item
                                        label='User ID'
                                        className="w-1/2"
                                    >
                                        <Input value={userId} disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label='Họ và tên'
                                        name={'fullName'}
                                        className="w-1/2"
                                    >
                                        <Input value={userProfile.fullName} />
                                    </Form.Item>
                                    <Form.Item
                                        label='Giới tính'
                                        name={'gender'}
                                        className="w-1/4"
                                    >
                                        <Select
                                            className="h-[40px]"
                                            options={[
                                                {
                                                    label: 'male',
                                                    value: 'male'
                                                },
                                                {
                                                    label: 'female',
                                                    value: 'female'
                                                }
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label='Link avatar'
                                        name={'avatar'}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Email'
                                        className="w-1/2"
                                    >
                                        <Input value={emailUser} disabled />
                                    </Form.Item>
                                </Form>
                            </div>
                        </Modal>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default UserProfile;