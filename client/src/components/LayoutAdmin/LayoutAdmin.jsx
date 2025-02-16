import { Button, Layout, Menu } from 'antd';
import logoAmin from "../../assets/images/logoadmin.png";
import logoFold from "../../assets/images/logo-fold.png";
import { FaBook } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";
import { SiGooglecloudstorage } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import AvatarAdmin from '../Avatar/AvatarAdmin';
import { Link, Outlet } from 'react-router-dom';
const { Header, Sider, Content, Footer } = Layout;
function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: 'tongquan',
      label: 'Tổng quan'
    },
    {
      key: 'user',
      label: <Link to="/admin/user">Người dùng</Link>,
      icon: <FaRegUser />
    },
    {
      key: 'sach',
      label: 'Quản lý sách',
      icon: <FaBook />
    },
    {
      key: 'muon-tra',
      label: 'Quản lý mượn trả',
      icon: <MdAutorenew />
    },
    {
      key: 'kho-sach',
      label: 'Quản lý kho sách',
      icon: <SiGooglecloudstorage />
    },
    {
      key: 'the-loai-sach',
      label: 'Quản lý thể loại sách',
      icon: <BiCategory />
    }
  ]
  return (
    <>
      <Layout>
        <Sider
          theme='light'
          collapsible collapsed={collapsed}
        >
          <div className=''>
            <img src={collapsed ? logoFold : logoAmin} />
          </div>
          <Menu
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            className='bg-white p-0 flex justify-between items-center'
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <AvatarAdmin />
          </Header>
          <Content>
            <Outlet />
          </Content>
          <Footer className='text-center bg-white'>
            Coppyright ©{new Date().getFullYear()} Book Store - All Rights Reserved
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}
export default LayoutAdmin;