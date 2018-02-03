import React from "react";
import { Link, Route, Redirect, Switch } from "react-router-dom";
import DocumentTitle from "components/DocumentTitle";
import { Layout } from "antd";
import Footer from "components/Footer";
import styles from "./UserLayout.module.less";

import Login from "routes/User/Login";

class UserLayout extends React.PureComponent {
  render() {
    const { match } = this.props;
    return (
      <DocumentTitle title="monkey admin">
        <Layout>
          <Layout.Content className={styles.container}>
            <div className={styles.main}>
              <div className={styles.header}>
                <Link to="/">
                  <span role="img" aria-label="monkey">
                    🐒
                  </span>
                </Link>
              </div>
              <Switch>
                <Route path={`${match.path}/login`} component={Login} exact />
                {/* <Route path={`${match.path}/login/:token`} component={Login} /> */}
                <Redirect exact from={match.path} to={`${match.path}/login`} />
              </Switch>
            </div>
          </Layout.Content>
          <Footer className={styles.footer} />
        </Layout>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
