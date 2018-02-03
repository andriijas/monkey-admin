import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Icon } from "antd";
const FormItem = Form.Item;

/**
 * Renders a form with username, password and submitt button
 *
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {
  static propTypes = {
    /** Callback to run on form submission */
    onSubmit: PropTypes.func,
    /** Show loading indicator on submit button when submitting */
    loading: PropTypes.bool,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      this.props.onSubmit(err, values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("username", {
            rules: [
              {
                type: "email",
                required: true,
                message: "Please enter your e-mail",
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="E-mail"
              size="large"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please enter your password" }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              size="large"
            />,
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.loading}
            style={{ width: "100%" }}
            size="large"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
