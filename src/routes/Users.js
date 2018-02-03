import React, { PureComponent } from "react";
import { Link, Route } from "react-router-dom";
import { Menu, Icon, List, Card, Row, Col } from "antd";

const wishlists = {
  molly: [
    { title: "Dolly", description: "Molly wants a dolly" },
    { title: "Final Fantasy IX", description: "vamos alla flamenco" },
    { title: "lorem ipsum", description: "doler sit amet" },
  ],
  cesar: [
    { title: "9mil", description: "Cesar needs a pistol" },
    { title: "Bacon", description: "Cesar dont want sallad" },
    {
      title: "Duis aute irure",
      description: "quis nostrud exercitation ullamco. ",
    },
  ],
};

class UserHead extends PureComponent {
  render() {
    return (
      <div>
        <h1>consectetur adipisicing</h1>
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            <Link to={`${this.props.url}/molly`}>
              <Icon type="mail" />Molly
            </Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to={`${this.props.url}/cesar`}>
              <Icon type="appstore" />cesar
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const WishListItem = ({ title, description }) => (
  <Card>
    <Row type="flex" gutter={24}>
      <Col xs={24} sm={18}>
        <h4>
          {title} - <span>$100</span>
        </h4>
        <p>{description}</p>
      </Col>
    </Row>
  </Card>
);

const SelectedUser = ({ match }) => (
  <div>
    <h1>{match.params.user}</h1>
    <List
      itemLayout="vertical"
      header={
        <div>
          <h2>Here be your wishlist</h2>
          <p>A smart description of your list.</p>
        </div>
      }
      dataSource={
        wishlists[match.params.user] ? wishlists[match.params.user] : []
      }
      split={false}
      renderItem={props => (
        <List.Item>
          <WishListItem {...props} />
        </List.Item>
      )}
    />
  </div>
);

function Users({ match, location }) {
  return (
    <div location={location}>
      <UserHead url={match.url} />

      <Route path={`${match.url}/:user`} component={SelectedUser} />
    </div>
  );
}

export default Users;
