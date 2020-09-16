import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import HowToRegIcon from "@material-ui/icons/HowToReg";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      name: "",
    };
    this.testAPI = this.testAPI.bind(this);
    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
  }

  loadFbLoginApi = () => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: `361960358269632`,
        cookie: true,
        xfbml: true,
        version: `v8.0`,
      });
    };
    ((d, s, id) => {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/en_US/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, `script`, `facebook-jssdk`);
  }

  componentDidMount = () => {
    this.loadFbLoginApi();
  };

  testAPI = (response) => {
    console.log(`Successful login: `, response);

    window.FB.api(
      `/me`,
      `GET`,
      {
        fields:
        `id,first_name, last_name,birthday,education,friends,email,gender,hometown,feed, picture`,
      },
      (response) => {
        this.setState(
          {
            loggedIn: true,
            name: response.name,
          },
          () => this.props.parentCallback(this.state.loggedIn, response)
        );
      }
    );
  };

  handleFBLogin = () => {
    window.FB.login((response) => {
      if (response.status === `connected`) {
        window.FB.api(`/me`, this.testAPI);
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <Fragment row>
            <HowToRegIcon />
            {this.state.name}
          </Fragment>
        ) : (
          <Button
            color={`inherit`}
            variant={`outlined`}
            onClick={() => this.handleFBLogin()}
          >
            Login using Facebook
          </Button>
        )}
      </div>
    );
  }
}

export default LoginComponent;
