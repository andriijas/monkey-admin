import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Spin, Divider, Avatar, Dropdown } from "antd";
import classnames from "classnames";
import Authorized from "components/Authorized";
import styles from "./index.module.less";

class Header extends React.Component {
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  triggerResizeEvent() {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("resize", true, false);
    window.dispatchEvent(event);
  }

  render() {
    const { logout, currentUser, collapsed, isMobile } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={() => {}}>
        <Menu.Item>
          <Icon type="user" /> User profile
        </Menu.Item>
        <Menu.Item>
          <Icon type="setting" /> Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Link to="/user/login" onClick={() => logout()}>
            <Icon type="logout" />Log out
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header
        className={classnames(styles.header, { [styles.fixed]: isMobile })}
      >
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <span role="img" aria-label="monkey">
              🐵
            </span>
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar}>
                  {currentUser.name.charAt(0)}
                </Avatar>
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </Layout.Header>
    );
  }
}

const HeaderWrapper = props => (
  <Authorized>
    {({ logout, currentUser }) => (
      <Header {...props} logout={logout} currentUser={currentUser} />
    )}
  </Authorized>
);

export default HeaderWrapper;
