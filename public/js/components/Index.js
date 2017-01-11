import React from 'react';
import 'whatwg-fetch';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiTheme from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Login from './auth/Login';
import Signup from './auth/Signup';


injectTapEventPlugin();

const style = {
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: '50%',
    height: '50%'
};

const styleTitle = {
    paddingTop: '93px',
    textShadow: 'rgba(51, 51, 51, 0.59) 0px 1px 4px',
    color: '#fff',
    fontSize: '50px',
    textAlign: 'center',
    fontFamily: 'Courier New,monospace',
    fontWeight: '400'
};


export default class Index extends React.Component {

    login(userInfo){
        var self = this;

        fetch('/login',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)
        })
            .then(function(response) {

                return response.json();
            })
            .then(function(lstBeers){
                //logged on
            });
    }


    signup(userInfo){
        var self = this;

        fetch('/signup',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)
        })
            .then(function(response) {

                return response.json();
            })
            .then(function(lstBeers){
                //signed in
            });
    }


    render(){

        return (


            <MuiTheme>
                <div>
                    <div className = 'welcome-message-class'>
                        <h1 style={styleTitle}>Welcome to SMB</h1>
                    </div>

                    <Paper style={style}>
                        <Tabs>
                            <Tab label="Login" >
                                <Login/>
                            </Tab>
                            <Tab label="Sign Up" >
                                <Signup/>
                            </Tab>

                        </Tabs>
                    </Paper>
                </div>
            </MuiTheme>);

    }
}
