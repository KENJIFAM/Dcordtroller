import React, { Component } from "react";
import { Card, Icon, Col } from "antd";
import "./ListUser.css";
import ListUserActive from "./ListUserActive";
import ListUserBan from "./ListUserBan";

class ListUser extends Component {
  state = {
    key: "activePlayers",
    listOfUserSelected: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.server !== this.props.server) {
      this.setState({
        uncheckedAll: true,
        listOfUserSelected: []
      });
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  tabList = [
    {
      key: "activePlayers",
      tab: <div className="activePlayer-tab">Active players</div>
    },
    {
      key: "bannedPlayers",
      tab: <div className="bannedPlayer-tab">Banned players</div>
    }
  ];

  handleSelect = (user, server, e) => {
    let listOfUserSelected = [...this.state.listOfUserSelected];
    if (e.target.checked) {
      listOfUserSelected.push(user);
    } else {
      for (let i = 0; i < listOfUserSelected.length; i++) {
        if (listOfUserSelected[i] === user) {
          listOfUserSelected.splice(i, 1);
        }
      }
    }
    this.setState({
      listOfUserSelected: listOfUserSelected,
      uncheckedAll: false
    });
  };

  handleReset = () => {
    this.setState({
      uncheckedAll: true,
      listOfUserSelected: []
    });
  };

  render() {
    const { listOfUserSelected } = this.state;
    const contentList = {
      activePlayers: (
        <ListUserActive
          listOfGuilds={this.props.listOfGuilds}
          server={this.props.server}
          handleKickUser={(item, server) =>
            this.props.handleKickUser(item, server)
          }
          handleBanUser={(item, server) =>
            this.props.handleBanUser(item, server)
          }
          handleSelect={(user, server, e) => this.handleSelect(user, server, e)}
          handleKickMultipleUsers={() => {
            this.props.handleKickMultipleUsers(
              listOfUserSelected,
              this.props.server
            );
            this.handleReset();
          }}
          trick={() => this.setState({ uncheckedAll: false })}
          uncheckedAll={this.state.uncheckedAll}
          listOfUserSelected={this.state.listOfUserSelected}
        />
      ),
      bannedPlayers: (
        <ListUserBan
          listOfGuilds={this.props.listOfGuilds}
          server={this.props.server}
          handleUnBanUser={(item, server) =>
            this.props.handleUnBanUser(item, server)
          }
        />
      )
    };
    return (
      <Col style={{ height: "100%" }} span={14}>
        <Card
          title="Users"
          headStyle={{ backgroundColor: "#C1BBBC", textAlign: "center" }}
          bodyStyle={{ backgroundColor: "#eee", overflowY: "scroll" }}
          style={{ height: "100%", backgroundColor: "#eee" }}
          extra={
            <Icon
              type="close"
              theme="outlined"
              className="close-btn"
              onClick={() => this.props.closeUserList()}
            />
          }
          tabList={this.tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, "key");
          }}
        >
          {contentList[this.state.key]}
        </Card>
      </Col>
    );
  }
}

export default ListUser;
