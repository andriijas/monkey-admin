import React from "react";
import { Spin } from "antd";
import Authorized from "./index";

const RequireLogin = props => (
  <Authorized>
    {({ currentUser }) =>
      currentUser.name ? (
        props.children
      ) : (
        <Spin spinning={true}>
          <div />
        </Spin>
      )
    }
  </Authorized>
);

export default RequireLogin;
