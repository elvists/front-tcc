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
    togglePopup() {
        this.setState({
          texto: "",
          showPopup: !this.state.showPopup
        });
    }


    changeAlgorithm(event) {
        this.setState({ recommender: event }, () => {
            this.afterSetStateFinished();
        });
    }



    afterSetStateFinished() {
    }



    render() {
        return (
                <div>
                    <DropDownOption changeOption={this.changeAlgorithm.bind(this)} item={this.props.algorithms} />
                    {/* <DropDownOption changeOption={this.changeDataSet.bind(this)} item={datasets} />
                    <DropDownOption changeOption={this.changeItemRanking.bind(this)} item={itemRanking} /> */}
                </div>
        );
    }
}

export default Configuration;