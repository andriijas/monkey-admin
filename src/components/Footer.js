import React from "react";
import { Layout, Row, Col } from "antd";

import styles from "./Footer.less";

const Footer = props => (
  <Layout.Footer className={styles.Footer}>
    <Row type="flex" gutter={24}>
      <Col span={12}>©2038 Future Robot Inc</Col>
      <Col span={12}>
        Allsda <span className={styles.FooterBugs}>bugs</span> reserved.
      </Col>
    </Row>
  </Layout.Footer>
);

export default Footer;
