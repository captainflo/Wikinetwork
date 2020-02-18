import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./Validation";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import renderField from "./renderField";
import { Link } from "react-router-dom";

class Signin extends React.Component {
  submit = form => {
    this.props.signin(form, id => this.props.history.push(`/dashboard/${id}`));
  };
  render() {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <div className="container">
        <h4 className="center white-text">
          Sign in <i className="fas fa-user-alt"></i>
        </h4>
        <div className="row">
          <form onSubmit={handleSubmit(this.submit)}>
            <div className="col m12 s12">
              <div className="box-input-signin">
                <div className="input-field">
                  <Field
                    name="email"
                    type="text"
                    component={renderField}
                    placeholder="email"
                    label="email"
                    icon="email"
                  />
                </div>
                {this.props.errorMessage && (
                  <div>{this.props.errorMessage}</div>
                )}
              </div>
            </div>
            <div className="col m12 s12">
              <div className="box-input-signin">
                <div className="input-field">
                  <Field
                    name="password"
                    type="text"
                    component={renderField}
                    label="password"
                    icon="lock"
                  />
                </div>
              </div>
            </div>
            {error && <strong>{error}</strong>}
            <div className="center">
              <button
                type="submit"
                disabled={submitting}
                className="waves-effect waves-light btn btn-signin"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="center white-text">
            <p>Or</p>
            <p>Sign in with</p>
            <ul>
              <li style={{ listStyle: "none", paddingBottom: "10px" }}>
                <a
                  href="/auth/google"
                  className="waves-effect waves-light btn social google"
                >
                  <i className="fab fa-google"></i>Google
                </a>
              </li>
              <li style={{ listStyle: "none", paddingBottom: "10px" }}>
                <a
                  href="/auth/linkedin"
                  className="waves-effect waves-light btn social linkedin"
                >
                  <i className="fab fa-linkedin"></i>Linkedin
                </a>
              </li>
            </ul>
            <Link to="/signup">You don't have a Account? Sign up!</Link>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

export default compose(
  connect(mapStateToPros, actions),
  reduxForm({ form: "SignInForm", validate })
)(Signin);
