import React,{Component} from 'react';
import ListUser from '../../components/ListUser/ListUser'
import ListServer from '../../components/ListServer/ListServer'
import {Row,Col,Spin,Icon} from 'antd'

class ListUserContainers extends Component{
    constructor(props){
        super(props);
        this.state = {
            listOfGuilds: null
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return !(nextProps.location.path === this.props.location.path && nextState === this.state);
    }

    componentDidMount(){
        const Discord = require('discord.js');
        const client = new Discord.Client();

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
            let listOfGuilds = [];
            const listOfGuildsFormat = client.guilds.array();
            for(let i = 0; i< listOfGuildsFormat.length; i++) {
                let listOfMembers = [];
                for (let x = 0; x < listOfGuildsFormat[i].members.array().length; x++) {
                    listOfMembers.push(listOfGuildsFormat[i].members.array()[x])
                }
                listOfGuilds.push(
                    {
                        server: listOfGuildsFormat[i].name,
                        users: listOfMembers
                    }
                )
            }
            this.setState({
                listOfGuilds: listOfGuilds
            });
        });

        client.on("guildCreate", guild => {
            console.log("Joined a new guild: " + guild.name);

            console.log(guild.channel.id);
            //Your other stuff like adding to guildArray
        });

        client.on('message', msg => {
            this.handleChangeWeight(msg);
            console.log(msg.guild.roles.get('486781248446922762').members.map(m=>m.roles));
            //client.channels.get("id", client.channels.get("name", "general").id).sendMessage("Testing");
        });

        client.login('NDg2NDgzMTc3NjI0MzA1Njc0.DnEGnA.0e9GJA_nkFkXLTbxePjfaqkrNIM');
    }

    handleChangeWeight = (event) => {
        //this.setState({weight: event.target.value});
        this.setState({ weight: `${event.author.username}` + ": " + event.content });
        this.setState({ url: event.author.avatarURL});

        //client.channels.get("448847115620450314").send('My Message');
    }

    handleKickUser = (user,server) => {
        let listOfGuilds = [...this.state.listOfGuilds];
        for(let i = 0; i< listOfGuilds.length; i++) {
            if(listOfGuilds[i].server === server) {
                let userInSingleGuild = [...listOfGuilds[i].users]
                for (let x = 0; x < userInSingleGuild.length; x++) {
                    if (userInSingleGuild[x].user.tag === user) {
                    	// This kicks the user from the discord server
                     	//userInSingleGuild[x].kick();     TODO: Lets remove this from comments once we are done
                        userInSingleGuild.splice(x, 1);
                    }
                }
                listOfGuilds[i].users = [...userInSingleGuild]
            }
        }
        this.setState({
            listOfGuilds:listOfGuilds
        });
        console.log(`Kick ${user} in server ${server}`)
    };

    handleBanUser = (user,server) => {
        let listOfGuilds = [...this.state.listOfGuilds];
        for(let i = 0; i< listOfGuilds.length; i++) {
            if(listOfGuilds[i].server === server) {
                let userInSingleGuild = [...listOfGuilds[i].users]
                for (let x = 0; x < userInSingleGuild.length; x++) {
                    if (userInSingleGuild[x].user.tag === user) {
                    	// This bans the user from the discord server
                        //userInSingleGuild[x].ban();     //TODO: Lets remove this from comments once we are done
                        userInSingleGuild.splice(x, 1);
                    }
                }
                listOfGuilds[i].users = [...userInSingleGuild]
            }
        }
        this.setState({
            listOfGuilds:listOfGuilds
        });
        console.log(`Ban ${user} in server ${server}`)
    };


    render(){
        const iconLoading = <Icon type="loading" style={{ fontSize: 40 }} spin />;
        const {listOfGuilds,server} = this.state;
        if(listOfGuilds){
            return (
                <div>
                    <h1>List Of User</h1>
                    <Col span={16}>
                        <Row gutter={16}>
                            <Col span={10}>
                                <ListServer
                                    listOfGuilds={listOfGuilds}
                                    handleKickUser={(user, server) => this.handleKickUser(user, server)}
                                    handleBanUser={(user, server) => this.handleBanUser(user, server)}
                                    chooseServer={(server) => this.setState({
                                        server: server
                                    })}
                                    serverSelected={server}
                                />
                            </Col>
                            <Col span={14}>
                                <ListUser
                                    listOfGuilds={listOfGuilds}
                                    server={server}
                                    handleKickUser={(user, server) => this.handleKickUser(user, server)}
                                    handleBanUser={(user, server) => this.handleBanUser(user, server)}
                                    closeUserList = {() => this.setState({server:null})}
                                />
                            </Col>
                        </Row>
                    </Col>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>List Of User</h1>
                    <Spin indicator={iconLoading}/>
                </div>
            )
        }

    }
}

export default ListUserContainers;
