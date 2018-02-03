/**
 * Slightly tweaked fork of
 * https://raw.githubusercontent.com/gaearon/react-document-title/master/index.js
 *
 * Basically append base title if its not defined.
 *
 */
import React from "react";
import PropTypes from "prop-types";
import withSideEffect from "react-side-effect";

function reducePropsToState(propsList) {
  const defaultTitle = propsList[0] ? propsList[0].title : "";
  const innermostProps = propsList[propsList.length - 1];
  let nextTitle = innermostProps ? innermostProps.title : defaultTitle;
  return nextTitle.endsWith(defaultTitle)
    ? nextTitle
    : `${nextTitle} - ${defaultTitle}`;
}

function handleStateChangeOnClient(title) {
  const nextTitle = title || "";
  if (nextTitle !== document.title) {
    document.title = nextTitle;
  }
}

function DocumentTitle() {}
DocumentTitle.prototype = Object.create(React.Component.prototype);

DocumentTitle.displayName = "DocumentTitle";
DocumentTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

DocumentTitle.prototype.render = function() {
  if (this.props.children) {
    return React.Children.only(this.props.children);
  } else {
    return null;
  }
};

export default withSideEffect(reducePropsToState, handleStateChangeOnClient)(
  DocumentTitle,
);
