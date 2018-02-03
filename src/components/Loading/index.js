import React from "react";
import { message, Spin } from "antd";

const Loading = ({ error, pastDelay, timedOut, ...spinProps }) => {
  const props = {
    size: "large",
    tip: timedOut ? "Taking some time..." : "Loading...",
    style: { height: "320px" },
    ...spinProps,
  };
  return <Spin {...props} />;
};

const ModuleLoading = props => {
  if (props.error) {
    return message.error(props.error);
  }
  return <div />;
  // return <Loading {...props} />
};

export { Loading, ModuleLoading };

export default Loading;
