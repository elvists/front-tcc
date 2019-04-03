import React, { Component } from 'react';
import DropDownOption from '../dropDownOption/DropDownOption'

var a = ["teste2", "teste6", "teste3"]
class Configuration extends Component {
    render() {
        return (
            <div>
                <DropDownOption options={a}/>
                <DropDownOption options={a}/>
                <DropDownOption options={a}/>
                <DropDownOption options={a}/>
            </div>
        );
    }
}

export default Configuration;