

import React from 'react';
import { render } from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiTheme from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import ScoreList from './ScoreList';
import {uuid} from 'uuid/v1';


const customContentStyle = {
    width: '99%',
    maxWidth: 'none',
    height: '900px',
    maxHeight: 'none'
};

export default class BeerProfileCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            disable: true,
            overallValue: 0,
            aromaValue: 0,
            flavorValue: 0,
            appearanceValue: 0,
            mouthfeelValue: 0
        };

    };


    componentWillMount(){

        var self = this;

        if(this.props._id){

            this.setState({
                disable: false,
                beer: this.props.beer,
                type: this.props.type,
                brewery: this.props.brewery,
                overallValue: this.props.overallValue,
                aromaValue: this.props.aromaValue,
                flavorValue: this.props.flavorValue,
                appearanceValue: this.props.appearanceValue,
                mouthfeelValue: this.props.mouthfeelValue,
                overallText: this.props.overallText,
                aromaText: this.props.aromaText,
                flavorText: this.props.flavorText,
                appearanceText: this.props.appearanceText,
                mouthfeelText: this.props.mouthfeelText
            })
        }
    };



    handleClose(){

        this.setState({open: !this.state.open});
    };

    handleAdd(){

        var self = this;

        let json = {
            beer: this.state.beer,
            type: this.state.type,
            brewery: this.state.brewery,
            overall: {
                value:this.state.overallValue,
                text:(this.state.overallText? this.state.overallText : '')
            },

            flavor: {
                value:this.state.flavorValue,
                text:(this.state.flavorText? this.state.flavorText : '')
            },

            aroma: {
                value:this.state.aromaValue,
                text:(this.state.aromaText? this.state.aromaText : '')
            },
            appearance: {
                value:this.state.appearanceValue,
                text:(this.state.appearanceText? this.state.appearanceText : '')
            },
            mouthfeel: {
                value:this.state.mouthfeelValue,
                text:(this.state.mouthfeelText? this.state.mouthfeelText : '')
            }
        };

        if(this.props._id){
            this.editOp(json);
        }else{
            this.addOp(json);

        }


    };

    addOp(json){
        var self = this;

        fetch('/score',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        })
            .then(function(response) {

                return response.json();
            })
            .then(function(lstBeers){

                self.props.update(lstBeers);

                self.setState({open:false});

            });
    }


    editOp(json){
        var self = this;

        fetch('/score/'+self.props._id,{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        })
            .then(function(response) {

                return response.json();
            })
            .then(function(lstBeers){

                self.props.update(lstBeers);

                self.setState({open:false});


            });
    }

    handleOpenModal(){

        this.setState({open: true});
    }


    handleBeerChange(event, value){

        var disable = true;
        if(event.target.value !== ''){
            disable = false;
        }

        this.setState({
            beer: event.target.value,
            disable: disable
        })
    }
    handleBeerTypeChange(event, value){
        this.setState({type: event.target.value})
    }
    handleBreweryChange(event, value){
        this.setState({brewery: event.target.value})
    }

    handleOverAllSlider(event, value){

        this.setState({overallValue: value});
    }

    handleAromaSlider(event, value){

        this.setState({aromaValue: value});
    }

    handleFlavorSlider(event, value){

        this.setState({flavorValue: value});
    }

    handleMouthfeelSlider(event, value){

        this.setState({mouthfeelValue: value});
    }

    handleAppearanceSlider(event, value){

        this.setState({appearanceValue: value});
    }



    handleMouthfeelInputChange(event){

        this.setState({mouthfeelText: event.target.value});
    }

    handleFlavorInputChange(event){

        this.setState({flavorText: event.target.value});
    }

    handleAromaInputChange(event){

        this.setState({aromaText: event.target.value});
    }

    handleAppearanceInputChange(event){

        this.setState({appearanceText: event.target.value});
    }

    handleOverallInputChange(event){

        this.setState({overallText: event.target.value});
    }


    render() {



        return (
            <div key={this.props._id || uuid()}>
                <MuiTheme>
                    <div>
                        <Dialog
                            title="Take your notes"
                            actions={[
                              <FlatButton
                                  label="Cancel"

                                  onClick={() => {this.handleClose()}}
                              />,
                              <FlatButton
                                  label="Add"
                                  disabled = {this.state.disable}
                                  onClick ={() => {this.handleAdd()}}
                              />
                         ]}
                            modal={true}
                            open={this.state.open}
                            contentStyle={customContentStyle}
                            autoScrollBodyContent={true}
                        >
                            <div className = 'beer-form-style-div'>
                                <div className = 'col-md-3'>
                                    <ul>
                                        <li>
                                            <label>
                                                Beer
                                                <input
                                                    className = 'beer-desc-input'
                                                    placeholder= "Write the beer&rsquo;s name"
                                                    defaultValue={this.props.beer}
                                                    onChange={this.handleBeerChange.bind(this)}
                                                    type='text'
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                Style
                                                <input
                                                    className = 'beer-desc-input'
                                                    placeholder= 'Write the style'
                                                    defaultValue={this.props.type}
                                                    onChange={this.handleBeerTypeChange.bind(this)}
                                                    type='text'
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                Brewery
                                                <input
                                                    placeholder= 'Who made it'
                                                    className = 'beer-desc-input'
                                                    defaultValue={this.props.brewery}
                                                    onChange={this.handleBreweryChange.bind(this)}
                                                    type='text'
                                                />
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="container-fluid">

                                    <div className = 'col-md-3'>
                                        <div className="value-beer-style slider-value"> {this.state.aromaValue}</div>
                                        <label>
                                            Aroma
                                        </label>
                                    <textarea
                                        placeholder= 'What is the aroma you feel?'
                                        defaultValue={this.props.aromaText}
                                        rows = {3}
                                        onChange={this.handleAromaInputChange.bind(this)}
                                    />
                                        <Slider
                                            style={{width: '100%'}}
                                            defaultValue=  {this.props.aromaValue}
                                            value={this.state.aromaValue}
                                            onChange={this.handleAromaSlider.bind(this)}
                                            max = {12}
                                            step= {1}
                                        />

                                    </div>
                                    <div className = 'col-md-3'>
                                        <div className="value-beer-style slider-value"> {this.state.flavorValue}</div>
                                        <label>
                                            Flavor
                                        </label>
                                    <textarea
                                        placeholder= 'How does it taste?'
                                        rows = {3}
                                        defaultValue={this.props.flavorText}
                                        onChange={this.handleFlavorInputChange.bind(this)}
                                    />
                                        <Slider
                                            style={{width: '100%'}}
                                            defaultValue={this.props.flavorValue}
                                            value={this.state.flavorValue}
                                            onChange={this.handleFlavorSlider.bind(this)}
                                            max = {20}
                                            step= {1}
                                        />

                                    </div>
                                    <div className = 'col-md-3'>
                                        <div className="value-beer-style slider-value"> {this.state.mouthfeelValue}</div>
                                        <label>
                                            Mouthfeel
                                        </label>
                                    <textarea
                                        placeholder= 'How does it make you feel?'
                                        rows = {3}
                                        defaultValue={this.props.mouthfeelText}
                                        onChange={this.handleMouthfeelInputChange.bind(this)}
                                    />
                                        <Slider
                                            style={{width: '100%'}}
                                            defaultValue={this.props.mouthfeelValue}
                                            value={this.state.mouthfeelValue}
                                            onChange={this.handleMouthfeelSlider.bind(this)}
                                            max = {5}
                                            step= {1}
                                        />
                                    </div>
                                    <div className = 'col-md-3'>
                                        <div className="value-beer-style slider-value"> {this.state.appearanceValue}</div>
                                        <label>
                                            Appearance
                                        </label>
                                    <textarea
                                        placeholder= 'What does it look like?'
                                        rows = {3}
                                        defaultValue={this.props.appearanceText}
                                        onChange={this.handleAppearanceInputChange.bind(this)}
                                    />
                                        <Slider
                                            style={{width: '100%'}}
                                            defaultValue={this.props.appearanceValue}
                                            value={this.state.appearanceValue}
                                            onChange={this.handleAppearanceSlider.bind(this)}
                                            max = {3}
                                            step= {1}
                                        />

                                    </div>
                                    <div className = 'col-md-3'>
                                        <div className="value-beer-style slider-value"> {this.state.overallValue || 0}</div>
                                        <label>
                                            Overall
                                        </label>
                                    <textarea
                                        placeholder= 'How do you evaluate it at the end?'
                                        defaultValue={this.props.overallText}
                                        rows = {3}
                                        onChange={this.handleOverallInputChange.bind(this)}
                                    />
                                        <Slider
                                            style={{width: '100%'}}
                                            defaultValue={this.props.overallValue}
                                            value={this.state.overallValue}
                                            onChange={this.handleOverAllSlider.bind(this)}
                                            max = {10}
                                            step= {1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </MuiTheme>
            </div>
        );
    }
}

