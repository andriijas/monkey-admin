import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import styles from "./index.module.less";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    // const [_, first, second, ...rest] = pathname.split("/");
    // return [`/${first}`];
    return [`/${pathname.split("/")[1]}`];

    // // eg. /list/search/articles = > ['','list','search','articles']
    // let snippets = pathname.split("/");
    // // Delete the end
    // // eg.  delete 'articles'
    // snippets.pop();
    // // Delete the head
    // // eg. delete ''
    // snippets.shift();
    // // eg. After the operation is completed, the array should be ['list','search']
    // // eg. Forward the array as ['list','list/search']
    // snippets = snippets.map((item, index) => {
    //   // If the array length > 1
    //   if (index > 0) {
    //     // eg. search => ['list','search'].join('/')
    //     return snippets.slice(0, index + 1).join("/");
    //   }
    //   // index 0 to not do anything
    //   return item;
    // });
    // snippets = snippets.map(item => {
    //   return this.getSelectedMenuKeys(`/${item}`)[0];
    // });
    // // eg. ['list','list/search']
    // return snippets;
  }
  handleOpenChange = openKeys => {
    this.setState({ openKeys });
    // const lastOpenKey = openKeys[openKeys.length - 1];
    // const isMainMenu = this.menus.some(
    //   item =>
    //     lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey),
    // );
    // this.setState({
    //   openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    // });
  };
  render() {
    const { collapsed, onCollapse, location } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
          openKeys,
        };
    // if pathname can't match, use the nearest parent's key
    menuProps["selectedKeys"] = [location.pathname];

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
          {...menuProps}
          onOpenChange={this.handleOpenChange}
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
