import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import moment from "moment";

class MessageLists extends React.Component {
  componentDidMount() {
    this.props.getAllMessageByChatroom(this.props.id);
    let formMessage = {
      user: this.props.myUserId,
      room: this.props.id
    };
    this.props.readMessage(formMessage);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages !== this.props.messages)
      this.props.getAllMessageByChatroom(this.props.id);
  }

  renderAllMessage = () => {
    if (this.props.messages && this.props.user._id)
      return this.props.messages.map(message => {
        const date = moment(message.createdAt).calendar();
        if (message.user === this.props.user._id) {
          return (
            <MessageList
              key={message._id}
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={[
                {
                  position: "right",
                  type: "text",
                  text: `${message.message_body}`,
                  dateString: `${date}`
                }
              ]}
            />
          );
        } else {
          return (
            <MessageList
              key={message._id}
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={[
                {
                  position: "left",
                  type: "text",
                  text: `${message.message_body}`,
                  dateString: `${date}`
                }
              ]}
            />
          );
        }
      });
    return (
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  };

  renderDate = () => {
    if (this.props.chatRoom) {
      const date = moment(this.props.chatRoom.createdAt).format("LL");
      return (
        <div>
          <h6 className="center title-chat">Chatroom created</h6>
          <div className="center">{date}</div>
          <hr></hr>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="box-message-list">
        {this.renderDate()}
        {this.renderAllMessage()}
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    user: state.auth.authenticated,
    chatRoom: state.chat.chatroom,
    messages: state.message.allMessage,
    lastMessage: state.message.createMessage
  };
}

export default connect(mapStateToPros, actions)(MessageLists);
