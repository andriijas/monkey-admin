import React from "react";
import { connect } from "dva";

function Users({ location }) {
  return (
    <div location={location}>
      <h1>consectetur adipisicing</h1>
      <ul>
        <li>Bertil</li>
        <li>Adam</li>
        <li>Cesar</li>
        <li>David</li>
      </ul>
    </div>
  );
}

//IndexPage.propTypes = {};

export default connect()(Users);
