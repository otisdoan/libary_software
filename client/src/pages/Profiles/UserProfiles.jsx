import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from 'dayjs';
import { useState } from "react";

function UserProfile() {
    const onFinish = (e) => {
        console.log(e);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="flex flex-col gap-x-4 py-[100px] px-[200px]">
                <h1 className="text-[1.4rem] font-medium text-center mb-[50px] ">Hồ sơ</h1>
                <Form
                    onFinish={onFinish}
                >
                    <div className="flex gap-x-4 ">
                        <Form.Item
                            name={'fullname'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Fullname is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Họ và tên</span>
                                <Input placeholder="Chưa có thông tin" />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name={'phone'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Phone is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Số điện thoại</span>
                                <Input placeholder="Chưa có thông tin" />
                            </div>
                        </Form.Item>
                    </div>
                    <div className="flex gap-x-4 ">
                        <Form.Item
                            name={'sex'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Sex is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Giới tính</span>
                                <Input placeholder="Chưa có thông tin" />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name={'phone'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Birth is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Ngày sinh</span>
                                <Input placeholder="Chưa có thông tin" />
                            </div>
                        </Form.Item>
                    </div>
                    <div className="flex gap-x-4 ">
                        <Form.Item
                            name={'email'}
                            className="w-1/2"
                        >
                            <div>
                                <span>Email</span>
                                <Input placeholder="Chưa có thông tin" disabled={true} />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name={'address'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Address is required!'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <div>
                                <span>Địa chỉ</span>
                                <Input placeholder="Chưa có thông tin" />
                            </div>
                        </Form.Item>
                    </div>
                    <Form.Item className="text-center mt-[30px]">
                        <Button type="primary" htmlType="submit" className="w-[300px]" onClick={showModal}>Chỉnh sửa thông tin</Button>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Lưu'} cancelText={'Hủy'}>
                            <div>
                                <h1>Chỉnh sửa thông tin</h1>
                                <Form className="flex flex-col">
                                    <Form.Item className="w-full">
                                        <div>
                                            <span>Họ và tên</span>
                                            <Input />
                                        </div>
                                    </Form.Item>
                                    <div className="flex items-center gap-x-4">
                                        <div className="w-1/2">
                                            <Form.Item
                                                name={'sex'}
                                            >
                                                <div>
                                                    <span>Giới tính</span>
                                                    <Select
                                                        placeholder='Chọn giới tính'
                                                        options={[
                                                            {
                                                                value: 'Nam',
                                                                label: 'Nam'
                                                            },
                                                            {
                                                                value: 'Nữ',
                                                                label: 'Nữ'
                                                            },

                                                        ]}
                                                    />
                                                </div>
                                            </Form.Item>
                                        </div>
                                        <div className="w-1/2">
                                            <Form.Item
                                                name={'birthDate'}
                                                getValueProps={(value) => ({
                                                    value: value && dayjs(value),
                                                })}
                                                normalize={(value) => value && `${dayjs(value).format('dd-mm-yyyy')}`}
                                            >
                                                <div className="flex flex-col">
                                                    <span>Ngày sinh</span>
                                                    <DatePicker />
                                                </div>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <Form.Item
                                        name={'phone'}
                                    >
                                        <div>
                                            <span>Số điện thoại</span>
                                            <Input placeholder="Số điện thoại" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item
                                        name={'address'}
                                    >
                                        <div>
                                            <span>Địa chỉ</span>
                                            <Input placeholder="Địa chỉ" />
                                        </div>
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