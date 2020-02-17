import React from "react";
import "../App.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">About US</h5>
              <p className="grey-text text-lighten-4">We are the best team</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li>
                  <a
                    className="grey-text text-lighten-3 hoverable"
                    href="https://github.com/captainflo/Sport-React"
                  >
                    <i className="fab fa-github-square"></i> GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="grey-text text-lighten-3 hoverable"
                    href="https://www.linkedin.com/in/florianlahitte/"
                  >
                    <i className="fab fa-linkedin"></i> Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">© 2020 Copyright Text</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
