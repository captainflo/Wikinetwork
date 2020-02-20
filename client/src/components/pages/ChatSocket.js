import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import io from "socket.io-client";
import keys from "../../config/keys";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import moment from "moment";

const socket = io.connect(`${keys.siteUrl}`);
const MyUserId = "5e4e88281c9d440000f27cc0";
// 5e4e88281c9d440000f27cc0
// 5e4e885f1c9d440000f27cc1

class ChatSocket extends Component {
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
  }

  onTextChange = e => {
    this.setState({ msg: e.target.value });
  };

  onMessageSubmit = () => {
    if (this.state.msg) {
      this.setState({ error: "" });
      let form = {
        room: this.props.match.params.id,
        user: "5e4e88281c9d440000f27cc0",
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
            position: `${message.user === MyUserId ? "right" : "left"}`,
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
    return chat.map(({ id, msg, date }, idx) => (
      <MessageList
        key={idx}
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
          {
            position: "right",
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
      <div className="container">
        <input
          style={{ color: "white" }}
          onChange={e => this.onTextChange(e)}
          value={this.state.msg}
        />
        <button onClick={this.onMessageSubmit}>Send</button>
        {this.state.error && <div>{this.state.error}</div>}

        {this.props.messages && <div>{this.renderOldMessage()}</div>}
        <div>{this.renderChat()}</div>
      </div>
    );
  }
}
function mapStateToPros(state) {
  console.log(state);
  return { messages: state.message.allMessage };
}

export default connect(mapStateToPros, actions)(ChatSocket);
