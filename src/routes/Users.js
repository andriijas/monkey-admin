import React from "react";
import { connect } from "dva";
import { Link, Route } from "dva/router";
import { Menu, Icon } from "antd";

const SelectedUser = ({ match }) => <h1>{match.params.user}</h1>;

function Users({ match, location }) {
  const title = `${new Date()}`;
  return (
    <div location={location}>
      <h1>consectetur adipisicing</h1>
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to={`${match.url}/adam`}>
            <Icon type="mail" />Adam
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to={`${match.url}/bertil`}>
            <Icon type="appstore" />Bertil
          </Link>
        </Menu.Item>
      </Menu>

      <Route path={`${match.url}/:user`} component={SelectedUser} />
    </div>
  );
}

//IndexPage.propTypes = {};

export default connect()(Users);
