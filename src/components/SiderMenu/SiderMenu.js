import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import styles from "./index.module.less";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends React.Component {
  render() {
    const { collapsed, onCollapse, location } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <span role="img" aria-label="monkey">
              🐵
            </span>
            <h1>monkey admin</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[location.pathname]}
          onOpenChange={() => {}}
          //          selectedKeys={selectedKeys}
          style={{ padding: "16px 0", width: "100%" }}
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/posts">
            <Link to="/posts">
              <Icon type="file-text" />
              <span>Posts</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/albums">
            <Link to="/albums">
              <Icon type="picture" />
              <span>Albums</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="/todos"
            title={
              <span>
                <Icon type="check-circle-o" />
                <span>Todos</span>
              </span>
            }
          >
            <Menu.Item key="/todos/my">
              <Link to="/todos/my">My Todos</Link>
            </Menu.Item>
            <Menu.Item key="/todos">
              <Link to="/todos">All Todos</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/users">
            <Link to="/users">
              <Icon type="user" />
              <span>Users</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;
