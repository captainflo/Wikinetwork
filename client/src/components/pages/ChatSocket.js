import React, { Component } from "react";
import io from "socket.io-client";
import keys from "../../config/keys";

const socket = io.connect(`${keys.siteUrl}`);

class ChatSocket extends Component {
  constructor() {
    super();
    this.state = { msg: "", chat: [] };
  }
  componentDidMount() {
    socket.on("chat message", msg => {
      this.setState({
        chat: [...this.state.chat, msg]
      });
    });
  }

  onTextChange = e => {
    this.setState({ msg: e.target.value });
  };

  onMessageSubmit = () => {
    socket.emit("chat message", this.state.msg);
    this.setState({ msg: "" });
  };

  renderChat() {
    const { chat } = this.state;
    console.log(chat);
    return chat.map(({ id, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "red" }}>{id}: </span>
        <span className="white-text">{msg}</span>
      </div>
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
        <div>{this.renderChat()}</div>
      </div>
    );
  }
}

export default ChatSocket;
