import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import LoginForm from "components/LoginForm";
import DocumentTitle from "components/DocumentTitle";

class LoginPage extends React.Component {
  state = {
    loginFailed: false,
  };

  handleSubmit = (err, values) => {
    if (!err) {
      //this.props.submitLogin(values);
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
        <>
          {this.state.loginFailed &&
            this.renderMessage("Login failed. Please try again! 🙈")}
          <LoginForm loading={false} onSubmit={this.handleSubmit} />
          <Link to="/">Forgott password?</Link>
        </>
      </DocumentTitle>
    );
  }
}

export default LoginPage;
