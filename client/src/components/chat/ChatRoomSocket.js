import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import io from "socket.io-client";
import keys from "../../config/keys";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import moment from "moment";
import "../css/ChatRoom.css";

const socket = io.connect(`${keys.siteUrl}`);

class ChatRoomSocket extends Component {
  constructor() {
    super();
    this.state = { msg: "", chat: [], error: "" };
  }
  componentDidMount() {
    this.props.getAllMessageByChatroom(this.props.match.params.id);
    socket.on("chat message", msg => {
      if (msg.room === this.props.match.params.id) {
        this.setState({
          chat: [...this.state.chat, msg]
        });
      }
    });

    // let formMessage = {
    //   user: this.props.myUserId,
    //   room: this.props.id
    // };
    // this.props.readMessage(formMessage);
  }

  onTextChange = e => {
    this.setState({ msg: e.target.value });
  };

  onMessageSubmit = () => {
    if (this.state.msg) {
      this.setState({ error: "" });
      let form = {
        room: this.props.match.params.id,
        user: this.props.authenticated._id,
        message: this.state.msg,
        date: Date.now()
      };
      socket.emit("chat message", form);
      this.props.createMessage(form);
      this.setState({ msg: "" });
    } else {
      this.setState({ error: "there is no message" });
    }
  };

  renderOldMessage = () => {
    const { messages } = this.props;
    return messages.map(message => (
      <MessageList
        key={message._id}
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
          {
            position: `${
              message.user === this.props.authenticated._id ? "right" : "left"
            }`,
            type: "text",
            text: `${message.message_body}`,
            dateString: `${moment(message.createdAt).calendar()}`
          }
        ]}
      />
    ));
  };

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ id, msg, user, date }, idx) => (
      <MessageList
        key={idx}
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
          {
            position: `${
              user === this.props.authenticated._id ? "right" : "left"
            }`,
            type: "text",
            text: `${msg}`,
            dateString: `${moment(date).calendar()}`
          }
        ]}
      />
    ));
  }

  render() {
    return (
      <div className="background-chat">
        <div className="container">
          <div className="box-chatroom">
            <div className="box-date white-text">
              <h5 className="center title-chat">
                Chatroom <i className="far fa-comments"></i>
              </h5>
              {/* <div className="center">{date}</div> */}
            </div>
            {this.props.messages && <div>{this.renderOldMessage()}</div>}
            <div>{this.renderChat()}</div>
          </div>
          <div className="box-message">
            <div className="input-field">
              <i className="material-icons prefix">message</i>
              <input
                style={{ color: "white" }}
                onChange={e => this.onTextChange(e)}
                value={this.state.msg}
                id="icon_prefix"
                className="validate"
                type="text"
              />
            </div>
            <button
              className="waves-effect waves-light btn btn-signin btn-message"
              onClick={this.onMessageSubmit}
            >
              Send
            </button>
            {this.state.error && <div>{this.state.error}</div>}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToPros(state) {
  console.log(state);
  return {
    authenticated: state.auth.authenticated,
    messages: state.message.allMessage,
    chatRoom: state.chat.chatroom
  };
}

export default connect(mapStateToPros, actions)(ChatRoomSocket);