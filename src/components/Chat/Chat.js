import React from "react";
import UserLogin from "../Login/UserLogin";
import List from "../Messages/List";
import Send from "../Messages/Send";



function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class Chat extends React.Component {
  state = {
    messages: [],
    member: {
      username: "",
      color: "",
    },
  };

  handleOnUserLogin = (user) => {
    if (user !== "") {
      this.drone = new window.Scaledrone("sBLUPtGyjcj6Qpfy", {
        data: { username: user, color: randomColor()  },
      });

    
      this.drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        const member = { ...this.state.member };
        member.id = this.drone.clientId;
        this.setState({ member });

        console.log("Data succesfully loaded");
      });
      const room = this.drone.subscribe("observable-soba");
      console.log("Room subscribed");

      room.on("data", (data, member) => {
        const messages = this.state.messages;
        messages.push({ member, text: data });
        this.setState({ messages });

        console.log("Message sent");
      });

    } else {
      console.log("Enter username");
    }
  };

  handleOnUserLogout = () => {
    this.setState({ messages: [], member: {} });
    this.drone.close();

    console.log("User logged out");
  };

  render() {
    return (
      <div>
        {this.state.member.id ? (
          <div className="Messages-wrap">
            
            <List
              messages={this.state.messages}
              currentMember={this.state.member}
            />
            <Send
              onSendMessage={this.onSendMessage}
              onUserLogout={this.handleOnUserLogout}
            />
            
          </div>
        ) : (
          <div>
            <UserLogin onUserLogin={this.handleOnUserLogin} />
          </div>
        )}
      </div>

    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-soba",
      message,
    });
  };
}

export default Chat;
