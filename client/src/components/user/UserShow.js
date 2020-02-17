import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import '../css/UserShow.css';

class UserShow extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-profile">
              <img
                className="background-profile"
                src={process.env.PUBLIC_URL + '/images/background.jpg'}
                alt="background-profile"
              />
              <img
                src={
                  this.props.authenticated.avatar ||
                  process.env.PUBLIC_URL + '/images/background.jpg' ||
                  null
                }
                alt="Avatar"
                className="avatar-profile"
              />

              <div className="container-description">
                <Link
                  to={`/user/edit/${this.props.authenticated._id}`}
                  className="btn-edit btn-floating waves-effect waves-light"
                >
                  <i className="material-icons">edit</i>
                </Link>
                <h4>
                  <div className="center">
                    {this.props.authenticated.firstName}{' '}
                    {this.props.authenticated.lastName}
                  </div>
                </h4>
                <p>
                  <i className="fas fa-signature"></i>{' '}
                  {this.props.authenticated.description}
                </p>
                <p>
                  <i className="fas fa-phone-square"></i>{' '}
                  {this.props.authenticated.phone}
                </p>
                <p>
                  <i className="far fa-envelope"></i>{' '}
                  {this.props.authenticated.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToPros, actions)(UserShow);
