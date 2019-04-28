import React, { Component } from 'react';
import DropDownOption from '../dropDownOption/DropDownOption'
import InputOptions from '../inputOptions/InputOptions';

class Configuration extends Component {

    constructor() {
        super();
        this.state = {
            recommender: "",
            showPopup: false,
            fields: [],
            fieldsAdditional: { ite: 1, factors: 1 }

        }

    }

    changeIte(value) {
        this.setState({
            fieldsAdditional: {
                ...this.state.fieldsAdditional,
                ite: Number(value)
            }
        }, () => { this.props.changeConfig(this.state.fieldsAdditional) })
    }

    changeFactors(value) {
        this.setState({
            fieldsAdditional: {
                ...this.state.fieldsAdditional,
                factors: Number(value)
            }
        }, () => { this.props.changeConfig(this.state.fieldsAdditional)  })
    }

    componentWillReceiveProps(nextProps) {
        var fieldsLocal = []
        if (nextProps.algorithms.itemOptions !== undefined && nextProps.algorithm !== this.state.recommender) {
            nextProps.algorithms.itemOptions.forEach(element => {
                if (element.value === nextProps.algorithm) {
                    if (element.factorsAndIter) {
                        fieldsLocal.push(
                            <div key={Math.random()}>
                                <InputOptions changeValue={this.changeFactors.bind(this)} label="Fatores:" />
                                <InputOptions changeValue={this.changeIte.bind(this)} label="Máximo de iterações:" />
                            </div>
                        )
                        this.setState({
                            recommender: nextProps.algorithm
                        })
                    }
                }
            });
            this.setState({
                fields: fieldsLocal,
            })
        }

    }


    render() {
        return (
            <div>
                <DropDownOption changeOption={this.props.changeAlgorithm} item={this.props.algorithms} />
                {this.state.fields}
            </div>
        );
    }
}

export default Configuration;