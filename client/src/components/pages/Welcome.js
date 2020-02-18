import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../css/Welcome.css";
import Footer from "../utils/Footer";
import { Parallax } from "react-materialize";

class Welcome extends React.Component {
  onSubmit = formValues => {
    console.log(formValues);
  };
  render() {
    return (
      <div>
        <div>
          <Parallax
            image={
              <img alt="" src={process.env.PUBLIC_URL + "/images/banner.jpg"} />
            }
            className="image-parallax white-text"
            options={{
              responsiveThreshold: 0
            }}
          >
            <div className="box-banner">
              <h3>Networking For Everyone</h3>
              <p>
                A tap away from valuable connections that expand opportunities.
              </p>
              <Link className="button-homepage waves-light" to={"/signin"}>
                Lean More
              </Link>
            </div>
          </Parallax>
          <div className="section white">
            <div className="row container">
              <h2 className="header center">Concept</h2>
              <div className="col m4 s12">
                <img
                  alt="concept1"
                  src={process.env.PUBLIC_URL + "/images/home1.png"}
                  className="concept-image"
                />
                <p className="grey-text text-darken-3 lighten-3 center">
                  Step 1: <br></br>Create your professional profile
                </p>
              </div>
              <div className="col m4 s12">
                <img
                  alt="concept2"
                  src={process.env.PUBLIC_URL + "/images/home2.png"}
                  className="concept-image"
                />
                <p className="grey-text text-darken-3 lighten-3 center">
                  Step 2: <br></br>
                  Meet new connections
                </p>
              </div>
              <div className="col m4 s12">
                <img
                  alt="concept3"
                  src={process.env.PUBLIC_URL + "/images/home3.png"}
                  className="concept-image"
                />
                <p className="grey-text text-darken-3 lighten-3 center">
                  Step 3: <br></br>Chat and explore opportunities
                </p>
              </div>
            </div>
          </div>
          <Parallax
            image={
              <img
                alt=""
                src={process.env.PUBLIC_URL + "/images/banner2.jpg"}
              />
            }
            className="image-parallax"
            options={{
              responsiveThreshold: 0
            }}
          />
        </div>
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
