import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../css/User.css";

class UserShow extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-profile">
              <img
                className="background-profile"
                src={process.env.PUBLIC_URL + "/images/background.jpg"}
                alt="background-profile"
              />
              <img
                src={
                  this.props.user.avatar ||
                  process.env.PUBLIC_URL + "/images/background.jpg" ||
                  null
                }
                alt="Avatar"
                className="avatar-profile"
              />

              <div className="container-description">
                <h4>
                  <div className="center">
                    {this.props.user.firstName} {this.props.user.lastName}
                  </div>
                </h4>
                <p>
                  <i className="fas fa-signature"></i>{" "}
                  {this.props.user.description}
                </p>
                <p>
                  <i className="fas fa-phone-square"></i>{" "}
                  {this.props.user.phone}
                </p>
                <p>
                  <i className="far fa-envelope"></i> {this.props.user.email}
                </p>
                <button
                  className="btn btn-signin"
                  onClick={this.props.history.goBack}
                >
                  <i className="far fa-comments"></i> chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  console.log(state);
  return {
    authenticated: state.auth.authenticated,
    user: state.user.userDetails
  };
}

export default connect(mapStateToPros, actions)(UserShow);
