import React,{Component} from 'react';
import ListServerContainer from './ListServerContainers'
import {Spin,Icon,Col,Row} from 'antd'

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



    render(){
        const iconLoading = <Icon type="loading" style={{ fontSize: 40 }} spin />;
        const {listOfGuilds} = this.state;
        if(listOfGuilds){
            return (
                <div>
                    <Col span={16}>
                        <ListServerContainer
                            listOfGuilds={listOfGuilds}
                        />
                    </Col>
                </div>
            )
        } else {
            return (
                <div>
                    <Spin indicator={iconLoading}/>
                </div>
            )
        }

    }
}

export default ListUserContainers;

