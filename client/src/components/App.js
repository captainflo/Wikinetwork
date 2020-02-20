import React from "react";
import Header from "./utils/Header";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "./actions";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

import Welcome from "./pages/Welcome";
import Signout from "./auth/Signout";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";
import Dashboard from "./dasboard/Dashboard";
import ChatRoom from "./chat/ChatRoom";
import Chat from "./chat/Chat";
import ChatSocket from "./pages/ChatSocket";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    // Sidebar
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Welcome} />
          <Route path="/signout" component={Signout} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/chat" component={ChatSocket} />

          {this.props.authenticated ? (
            <div>
              <Route path="/user/:id" component={UserShow} />
              <Route path="/user/edit/:id" component={UserEdit} />
              <Route path="/chatroom/:id" component={ChatRoom} />
              <Route path="/chat/:id" component={Chat} />
              <Route path="/dashboard/:id" component={Dashboard} />
            </div>
          ) : (
            ""
          )}
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToPros, actions)(App);
