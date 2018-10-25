import React, { Component } from "react";
import { Card, Icon, Col } from "antd";
import "./ListVoiceChannel.css";
import ListVoiceChannelActive from "./ListVoiceChannelActive";

class ListVoiceChannel extends Component {
  state = {
    key: "voiceChannels"
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  tabList = [
    {
      key: "voiceChannels",
      tab: <div className="activePlayer-tab">Voice Channels</div>
    }
  ];

  render() {
    const contentList = {
      voiceChannels: (
        <ListVoiceChannelActive
          listOfGuilds={this.props.listOfGuilds}
          server={this.props.server}
          handlePlayMusic={server => this.props.handlePlayMusic(server)}
        />
      )
    };
    return (
      <Col style={{ height: "100%" }} span={14}>
        <Card
          title="Voice Channels"
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

export default ListVoiceChannel;

/*
tabList={this.tabList}
activeTabKey={this.state.key}
onTabChange={(key) => { this.onTabChange(key, 'key'); }}
{contentList[this.state.key]}
*/
