import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import moment from "moment";

class MessageListsSocket extends React.Component {
  componentDidMount() {}

  renderMessage = () => {
    if (this.props.myUser)
      if (message.user === this.props.myUser) {
        const date = moment(message.createdAt).calendar();
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
    return <div className="box-message-list">{this.renderMessage()}</div>;
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

export default connect(mapStateToPros, actions)(MessageListsSocket);
