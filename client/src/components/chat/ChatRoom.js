import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import renderField from './renderField';
import MessageLists from './MessageLists';
import validate from './Validate';
import '../css/ChatRoom.css';

class ChatRoom extends React.Component {
  componentDidMount() {
    this.props.getChatroom(this.props.match.params.id);
  }

  submit = (message, dispatch) => {
    const form = {
      room: this.props.match.params.id,
      user: this.props.user._id,
      message: message
    };
    this.props.createMessage(form);
    dispatch(reset('MessageRoom'));
  };

  render() {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <div className="container">
        <div className="box-chatroom">
          {this.props.user._id && (
            <MessageLists
              myUserId={this.props.user._id}
              id={this.props.match.params.id}
            />
          )}
          <form onSubmit={handleSubmit(this.submit)}>
            <div className="row">
              <div className="col m12 s12">
                <div className="box-message">
                  <div className="input-field">
                    <Field
                      name="message"
                      type="text"
                      component={renderField}
                      placeholder="message"
                      label="message"
                      icon="create"
                    />
                  </div>
                  {error && <strong>{error}</strong>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="waves-effect waves-light btn btn-signin btn-message"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    user: state.auth.authenticated,
    messages: state.message.allMessage
  };
}

export default compose(
  connect(mapStateToPros, actions),
  reduxForm({ form: 'MessageRoom', validate })
)(ChatRoom);
