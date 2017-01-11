
import React from 'react';
import 'whatwg-fetch';
import MuiTheme from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import { render } from 'react-dom';


const style = {
    margin: '20px'
};

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: undefined,
            pass: undefined
        }
    };


    handleMail(mail){
        this.setState({mail: mail});
    };

    handlePass(pass){
        this.setState({pass: pass});
    };

    render(){

        return (
            <MuiTheme>
                <div style={style}>
                  <div className = 'beer-form-style-div'>
                    <div className = 'col-md-12'>
                        <ul>
                            <li>
                                <label>
                                  Email
                                  <input
                                    className = 'beer-desc-input'
                                    placeholder= 'enter email'
                                    defaultValue={this.state.mail}
                                    onChange={this.handleMail.bind(this)}
                                    type='email'
                                  />
                                </label>
                            </li>
                            <li>
                                <label>
                                  Password
                                  <input
                                    className = 'beer-desc-input'
                                    placeholder= 'enter password'
                                    defaultValue={this.state.pass}
                                    onChange={this.handlePass.bind(this)}
                                    type='password'
                                  />
                                </label>
                            </li>
                            <li>
                              <FlatButton
                                label="Login"
                                onClick = {() => {
                                        console.log('Login');
                                    }}
                              />
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
            </MuiTheme>);

    }
}
