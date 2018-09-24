import React,{Component,Fragment} from 'react'
import {List,Card,Button,Icon,Col,Modal} from 'antd'
import './ListUser.css'
import ListUserActive from './ListUserActive'
import ListUserBan from './ListUserBan'


class ListUser extends Component {
    state = {
        key: 'activePlayers',
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    tabList = [{
        key: 'activePlayers',
        tab: <div className="activePlayer-tab">Active players</div>,
    }, {
        key: 'bannedPlayers',
        tab: <div className="bannedPlayer-tab">Banned players</div>,
    }];



    render() {
        const contentList = {
            activePlayers: <ListUserActive
                listOfGuilds={this.props.listOfGuilds}
                server={this.props.server}
                handleKickUser={(item,server) => this.props.handleKickUser(item, server)}
                handleBanUser={(item,server) => this.props.handleBanUser(item, server)}
            />,
            bannedPlayers: <ListUserBan
                listOfGuilds={this.props.listOfGuilds}
                server={this.props.server}
                handleUnBanUser={(item,server) => this.props.handleUnBanUser(item, server)}
            />,
        };
        return (
            <Col span={14}>
                <Card
                    title="Users"
                    headStyle={{backgroundColor:'#C1BBBC',textAlign:'center'}}
                    bodyStyle={{height: '438px', overflowY: 'scroll'}}
                    extra={
                        <Icon
                            type="close"
                            theme="outlined"
                            className="close-btn"
                            onClick={() => this.props.closeUserList()}
                        />}
                    tabList={this.tabList}
                    activeTabKey={this.state.key}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                >
                    {contentList[this.state.key]}
                </Card>
            </Col>
        );
    }
}

export default ListUser;