import { Button, Layout, Menu } from 'antd';
import logoAmin from "../../assets/images/logo-admin-2.png";
import logoFold from "../../assets/images/logo-admin.png";
import { FaBook } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GoGitPullRequest } from "react-icons/go";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import AvatarAdmin from '../Avatar/AvatarAdmin';
import { Link, Outlet } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa6";
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
      label: <Link to='/admin/book'>Quản lý sách</Link>,
      icon: <FaBook />
    },
    {
      key: 'muon-tra',
      label: <Link to='/admin/borrow-book'>Quản lý yêu cầu</Link>,
      icon: <GoGitPullRequest />
    },
    {
      key: 'da-tra',
      label: <Link to='/admin/returned-book'>Quản lý sách đã trả</Link>,
      icon: <MdAutorenew />
    },
    {
      key: 'the-loai-sach',
      label: <Link to='/admin/category'>Quản lý thể loại sách</Link>,
      icon: <BiCategory />
    },
    {
      key: 'tac-gia',
      label: <Link to='/admin/author'>Quản lý tác giả</Link>,
      icon: <FaUser />
    },
    {
      key: 'nha-xuat-ban',
      label: <Link to='/admin/publisher'>Quản lý nhà xuất bản</Link>,
      icon: <FaUserShield />
    }
  ]
  return (
    <>
      <Layout>
        <Sider
          theme='light'
          collapsible collapsed={collapsed}
        >
          <div className='p-4'>
            <img src={collapsed ? logoFold : logoAmin} className='w-[150px]'/>
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