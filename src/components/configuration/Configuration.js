import React, { Component } from 'react';
import DropDownOption from '../dropDownOption/DropDownOption'

class Configuration extends Component {

    constructor() {
        super();
        this.state = {
            recommender: "",
            showPopup: false
        }

    }

    render() {
        return (
            <div>
                <DropDownOption changeOption={this.props.changeAlgorithm} item={this.props.algorithms} />
                {/* <DropDownOption changeOption={this.changeDataSet.bind(this)} item={datasets} />
                    <DropDownOption changeOption={this.changeItemRanking.bind(this)} item={itemRanking} /> */}
            </div>
        );
    }
}

export default Configuration;