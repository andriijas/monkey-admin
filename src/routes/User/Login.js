import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-refetch";
import { Alert } from "antd";
import LoginForm from "components/LoginForm";
import DocumentTitle from "components/DocumentTitle";

class LoginPage extends React.Component {
  static defaultProps = {
    login: {
      pending: false,
    },
  };

  state = {
    loginFailed: false,
  };

  componentWillReceiveProps(nextProps) {
    const { login } = nextProps;
    // const { login, location: { state } } = nextProps;
    // const next = state && state.previous ? state.previous : "/";

    if (login.fulfilled) {
      nextProps.history.replace("/dashboard");
    } else if (login.rejected) {
      this.setState({ loginFailed: true });
    }
  }

  handleSubmit = (err, values) => {
    if (!err) {
      this.props.submitLogin(values);
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
          <LoginForm
            loading={this.props.login.pending}
            onSubmit={this.handleSubmit}
          />
          <Link to="/">Forgott password?</Link>
        </>
      </DocumentTitle>
    );
  }
}

export default connect(props => ({
  submitLogin: ({ username, password }) => ({
    login: {
      url: `/user/login`,
      method: "POST",
      body: JSON.stringify({ username, password }),
    },
  }),
}))(LoginPage);
