import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import Authorized from "components/Authorized";
import LoginForm from "components/LoginForm";
import DocumentTitle from "components/DocumentTitle";

class LoginPage extends React.Component {
  state = {
    loading: false,
    loginError: null,
  };

  handleSubmit = login => (err, values) => {
    if (!err) {
      this.setState({ loading: true });
      login(values.username, values.password)
        .then(() => {
          this.props.history.replace("/");
        })
        .catch(() => {
          this.setState({
            loading: false,
            loginError: "Login failed. Please try again! 🙈",
          });
        });
    }
  };

  renderMessage = content => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={content}
        type="error"
        showIcon
      />
    );
  };

  render() {
    return (
      <DocumentTitle title="Log in">
        <Authorized>
          {({ login }) => (
            <>
              {this.state.loginError &&
                this.renderMessage(this.state.loginError)}
              <LoginForm
                loading={this.state.loading}
                onSubmit={this.handleSubmit(login)}
              />
              <Link to="/">Forgott password?</Link>
            </>
          )}
        </Authorized>
      </DocumentTitle>
    );
  }
}

export default LoginPage;
