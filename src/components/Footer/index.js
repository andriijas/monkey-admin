import React from "react";
import { Layout } from "antd";
import classnames from "classnames";
import styles from "./index.module.less";

/**
 * Renders the global footer
 */
const Footer = props => (
  <Layout.Footer className={classnames(styles.footer, props.className)}>
    © monkey admin. All <span className={styles.bugs}>bugs</span> reserved.
  </Layout.Footer>
);

export default Footer;
