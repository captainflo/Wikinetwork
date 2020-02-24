import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Discover from "../discover/Discover";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <h4 className="center white-text">Swipe to match!</h4>
        <p className="center white-text ">
          Swipe left Unlike - Swipe right like
        </p>
        {this.props.auth.firstName &&
        this.props.auth.lastName &&
        this.props.auth.avatar ? (
          <div>
            <Discover />
          </div>
        ) : (
          <div style={{ fontSize: "18px" }} className="center">
            <Link className="white-text" to={`/user/${this.props.auth._id}`}>
              <img
                className="complete-profile"
                alt="profile-complited"
                src={process.env.PUBLIC_URL + "/images/complete.svg"}
              />
              <i className="fas fa-exclamation-circle"></i> You must complete
              your profile before swiping (Firstname, Lastname, Photo...)
            </Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated
  };
}
export default connect(mapStateToProps, actions)(Dashboard);
