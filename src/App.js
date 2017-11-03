import React, { Component } from "react";
import { Link } from "dva/router";
import { Layout, Menu, Icon } from "antd";
//import "./App.css";

import Footer from "components/Footer";

const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["/"]}>
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="home" />Home
              </Link>
            </Menu.Item>
            <Menu.Item key="/users">
              <Link to="/users">
                <Icon type="bars" />Users
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default App;
