import React from "react";
// import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../actions";
import "../css/Welcome.css";
import Footer from "../utils/Footer";

class Welcome extends React.Component {
  onSubmit = formValues => {
    console.log(formValues);
  };
  render() {
    return (
      <div>
        Hello
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated
  };
}
export default connect(mapStateToProps, actions)(Welcome);
