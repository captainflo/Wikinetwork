import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Discover from '../discover/Discover';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <h4 className="center">Component info</h4>
        {this.props.auth.firstName &&
        this.props.auth.lastName &&
        this.props.auth.avatar ? (
          <div>
            <Discover />
          </div>
        ) : (
          <div style={{ fontSize: '18px' }} className="center">
            <Link to={`/user/${this.props.auth._id}`}>
              <i className="fas fa-exclamation-circle"></i> You must complet
              your profile before swiping (Firstname, Lastname, Photo...)
            </Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    auth: state.auth.authenticated
  };
}
export default connect(mapStateToProps, actions)(Dashboard);
