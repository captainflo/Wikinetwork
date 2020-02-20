import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TinderCard from "react-tinder-card";
import ModalForm from "./ModalForm";
import "../css/SwipeCard.css";

class Discover extends React.Component {
  state = {
    isMatch: false,
    love: "",
    user: ""
  };
  componentDidMount() {
    this.props.fetchUser();
    this.props.getAllUser();
  }

  closeModal = () => {
    this.setState({ isMatch: false });
  };

  goChatRoom = (sender, receiver) => {
    const formValues = {
      sender: sender,
      receiver: receiver
    };
    this.props.createChatRoom(formValues);
  };

  matchDiscover = (userId, friendId, match) => {
    const discover = {
      userId: userId,
      friendId: friendId,
      isMatch: match
    };
    this.props.createDiscover(discover);
  };

  onSwipe = (direction, userId) => {
    if (direction === "right") {
      console.log("you like");
      this.matchDiscover(this.props.auth._id, userId, true);
      this.setState({ love: true });
    } else if (direction === "left") {
      console.log("you don't like");
      this.matchDiscover(this.props.auth._id, userId, false);
      this.setState({ love: false });
    }
  };

  onCardLeftScreen = user => {
    if (
      this.props.discovers.isMatch === true &&
      this.props.auth.liked.includes(this.props.discovers.friendId)
    ) {
      console.log("is match");
      this.setState({ isMatch: true });
      this.setState({ user: user });
      this.goChatRoom(this.props.auth._id, user._id);
    } else {
      this.setState({ isMatch: false });
    }
    setTimeout(() => {
      this.setState({ love: "" });
    }, 500);
  };

  renderAllUser = () => {
    if (this.props.users)
      return this.props.users.map(user => {
        if (
          user._id !== this.props.auth._id &&
          user.firstName &&
          user.lastName &&
          user.avatar &&
          !user.liked.includes(this.props.auth._id) &&
          !user.unliked.includes(this.props.auth._id)
        ) {
          return (
            <TinderCard
              key={user._id}
              onSwipe={dir => this.onSwipe(dir, user._id)}
              onCardLeftScreen={() => this.onCardLeftScreen(user)}
              preventSwipe={["up", "down"]}
              className="swipe"
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.0), 
                    rgba(0, 0, 0, 0.35)
                  ),url(${user.avatar})`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover"
                }}
                className="card-tinder"
              >
                <div className="card-description">
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <p>{user.description}</p>
                </div>
              </div>
            </TinderCard>
          );
        }
        return null;
      });
  };

  render() {
    return (
      <div>
        <div className="swipe-container">
          <div className="center white-text">
            <img
              className="img-empty"
              alt="empty"
              src={process.env.PUBLIC_URL + "/images/empty.svg"}
            />
            <p> no more profiles</p>
          </div>
          {this.renderAllUser()}
        </div>
        {this.state.isMatch === true ? (
          <div className="backgroud-modal">
            <ModalForm user={this.state.user} closeModal={this.closeModal} />
          </div>
        ) : (
          ""
        )}
        {this.state.love === true ? (
          <div className="right love slideUp">
            <i className="far fa-thumbs-up"></i>
          </div>
        ) : (
          ""
        )}
        {this.state.love === false ? (
          <div className="love slideUp">
            <i className="far fa-times-circle"></i>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    users: state.user.allUsers,
    discovers: state.discover.createDiscover
  };
}
export default connect(mapStateToProps, actions)(Discover);
