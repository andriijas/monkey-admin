import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import DocumentTitle from "./index";

const randomTitle = () =>
  Math.random()
    .toString(36)
    .substr(2);

it("renders without crashing", () => {
  const div = document.createElement("div");
  const title = randomTitle();
  ReactDOM.render(<DocumentTitle title={title} />, div);
  expect(global.document.title).toEqual(title);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const title = randomTitle();
  const tree = renderer.create(<DocumentTitle title={title} />);
  expect(tree.toJSON()).toMatchSnapshot();
  expect(global.document.title).toEqual(title);
  tree.unmount();
});

it("renders nested correctly", () => {
  const innerTitle = randomTitle();
  const outerTitle = randomTitle();
  const tree = renderer.create(
    <DocumentTitle title={outerTitle}>
      <DocumentTitle title={innerTitle} />
    </DocumentTitle>,
  );
  expect(tree.toJSON()).toMatchSnapshot();
  expect(global.document.title).toEqual(`${innerTitle} - ${outerTitle}`);
  tree.unmount();
});
