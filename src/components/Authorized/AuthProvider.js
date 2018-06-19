import React from "react";
import Auth from "./Context";

const generateToken = () => {
  const randStr = () =>
    Math.random()
      .toString(36)
      .substring(2);
  return `${randStr()}-${randStr()}-${randStr()}`;
};

class Authorized extends React.Component {
  login = (username, password) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin@monkey.bar" && password === "1337") {
          const sessionKey = generateToken();
          localStorage.setItem("sessionKey", sessionKey);
          this.setState(
            {
              sessionKey,
            },
            () => resolve(sessionKey),
          );
          this.fetchCurrentUser();
        } else {
          reject("Err");
        }
      }, 450);
    });

  fetchCurrentUser = () => {
    setTimeout(() => {
      this.setState({
        currentUser: {
          name: "April Bagel",
          email: "april.bagle@acme.inc",
        },
      });
    }, 1000);
  };

  componentDidMount() {
    if (this.state.sessionKey) {
      this.fetchCurrentUser();
    }
  }

  logout = () => {
    this.setState({ sessionKey: null });
  };

  state = {
    sessionKey: localStorage.getItem("sessionKey"),
    currentUser: {},
    login: this.login,
    logout: this.logout,
  };

  render() {
    console.log("Auth changed: ", this.state);
    return (
      <Auth.Provider value={this.state}>{this.props.children}</Auth.Provider>
    );
  }
}

export default Authorized;
