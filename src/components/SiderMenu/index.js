import "rc-drawer/assets/index.css";
import React from "react";
import DrawerMenu from "rc-drawer";
import SiderMenu from "./SiderMenu";

export default props =>
  props.isMobile ? (
    <DrawerMenu
      getContainer={null}
      //level={["body .ant-layout .ant-layout"]}
      level={null}
      open={!props.collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
    >
      <SiderMenu
        {...props}
        collapsed={props.isMobile ? false : props.collapsed}
      />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} />
  );
