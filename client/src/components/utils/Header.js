import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../utils/Sidebar';

class Header extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <li>
            <Link to="/signout">Signout</Link>
          </li>
          <li>
            <Link to={`/dashboard/${this.props.authenticated._id}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={`/chat/${this.props.authenticated._id}`}>Chat</Link>
          </li>
          <li>
            <Link to={`/user/${this.props.authenticated._id}`}>
              <img
                className="avatar"
                src={
                  this.props.authenticated.avatar ||
                  process.env.PUBLIC_URL + '/images/background.jpg'
                }
                alt="background"
              />
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signin">login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              Briefly
            </Link>
            <a href="#/" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderLinks()}
            </ul>
          </div>
        </nav>
        <Sidebar />
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToPros)(Header);
