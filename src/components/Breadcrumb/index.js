import React from "react";
import { Link, Route } from "react-router-dom";
import { Breadcrumb } from "antd";

const Breadcrumbs = props => (
  <Breadcrumb>
    <Route path="/:path" component={BreadcrumbsItem} />
  </Breadcrumb>
);

const BreadcrumbsItem = ({ match, ...rest }) => (
  <>
    <Breadcrumb.Item
      className={match.isExact ? "breadcrumb-active" : undefined}
    >
      <Link to={match.url || ""}>{match.url}</Link>
    </Breadcrumb.Item>
    <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
  </>
);

export default Breadcrumbs;
