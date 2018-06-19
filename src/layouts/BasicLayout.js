import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import DocumentTitle from "components/DocumentTitle";
import SiderMenu from "components/SiderMenu";
import Header from "components/Header";
import Footer from "components/Footer";
import Breadcrumb from "components/Breadcrumb";
import Authorized from "components/Authorized";
//import styles from "./BasicLayout.module.less";

import Dashboard from "routes/Dashboard";
import Posts from "routes/Posts";
import Albums from "routes/Albums";
import Users from "routes/Users";
import Todos from "routes/Todos";
import MyTodos from "routes/MyTodos";

const matchMedia = window.matchMedia("(max-width: 767.99px)");

class BasicLayout extends React.PureComponent {
  state = {
    collapsed: false,
    isMobile: matchMedia.matches,
  };

  componentDidMount() {
    this.mediaListener = matchMedia.addListener(mql => {
      this.setState({
        isMobile: mql.matches,
      });
    });
  }

  componentWillUnmount() {
    matchMedia.removeListener(this.mediaListener);
  }

  handleMenuCollapse = collapsed => {
    this.setState({ collapsed });
  };

  // PageWrapper = Component => {
  //   return props => {
  //     //this.setState({ childMatch: props.match });
  //     return <Component {...props} />;
  //   };
  // };

  render() {
    const { location } = this.props;
    const { collapsed, isMobile } = this.state;
    return (
      <DocumentTitle title="monkey admin">
        <Layout>
          <SiderMenu
            collapsed={collapsed}
            isMobile={isMobile}
            location={location}
            onCollapse={this.handleMenuCollapse}
          />
          <Layout>
            <Header
              collapsed={collapsed}
              isMobile={isMobile}
              onCollapse={this.handleMenuCollapse}
              // onMenuClick={this.handleMenuClick}
            />
            <Layout.Content
              style={{
                margin: isMobile ? "88px 24px 0" : "24px 24px 0",
                height: "100%",
              }}
            >
              <Breadcrumb />
              <Switch>
                <Route path={"/"} component={Dashboard} exact />
                <Route path={"/posts"} component={Posts} exact />
                <Route path={"/albums"} component={Albums} exact />
                <Route path={"/todos/my"} component={MyTodos} exact />
                <Route path={"/todos"} component={Todos} />
                <Route path={"/users"} component={Users} />
              </Switch>
            </Layout.Content>
            <Footer />
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

const BasicLayoutWrapper = props => (
  <Authorized>
    {({ sessionKey, currentUser }) => {
      if (sessionKey) {
        return <BasicLayout {...props} />;
      } else {
        return <Redirect to="/user/login" />;
      }
    }}
  </Authorized>
);

export default BasicLayoutWrapper;
