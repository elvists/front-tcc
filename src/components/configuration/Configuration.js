import React, { Component } from 'react';
import DropDownOption from '../dropDownOption/DropDownOption'
import InputOptions from '../inputOptions/InputOptions';
import './Configuration.css';


const similarityList = { itemLabel: "Similaridade*:", itemOptions: [{ label: "PCC", value: "PCC" }, { label: "COS", value: "COS" }, { label: "MSD", value: "MSD" }, { label: "CPC", value: "CPC" }, { label: "exJaccard", value: "exJaccard" }] }

class Configuration extends Component {

    constructor() {
        super();
        this.state = {
            recommender: "",
            showPopup: false,
            fields: [],
            fieldsAdditional: {}

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
        }, () => { this.props.changeConfig(this.state.fieldsAdditional) })
    }

    changeNeighbors(value) {
        this.setState({
            fieldsAdditional: {
                ...this.state.fieldsAdditional,
                neighbors: Number(value)
            }
        }, () => { this.props.changeConfig(this.state.fieldsAdditional) })
    }

    changeShrinkage(value) {
        this.setState({
            fieldsAdditional: {
                ...this.state.fieldsAdditional,
                shrinkage: Number(value)
            }
        }, () => { this.props.changeConfig(this.state.fieldsAdditional) })
    }

    changeSimilarity(similaritySelect) {
        this.setState({
            fieldsAdditional: {
                ...this.state.fieldsAdditional,
                similarity: similaritySelect
            }
        }, () => { this.props.changeConfig(this.state.fieldsAdditional) })
    }

    componentWillReceiveProps(nextProps) {
        var fieldsLocal = []
        if (nextProps.algorithms.itemOptions !== undefined && nextProps.algorithm !== this.state.recommender) {
            nextProps.algorithms.itemOptions.forEach(element => {
                if (element.value === nextProps.algorithm) {
                    if (element.knn) {
                        fieldsLocal.push(
                            <div key={Math.random()}>
                                <DropDownOption changeOption={this.changeSimilarity.bind(this)} item={similarityList} />
                                <div className="InputOptions">
                                    <InputOptions className="InputOptions" changeValue={this.changeShrinkage.bind(this)} label="Redução:" />
                                </div>
                                <div className="InputOptions">
                                    <InputOptions className="InputOptions" changeValue={this.changeNeighbors.bind(this)} label="Vizinhos:" />
                                </div>
                            </div>
                        )
                        this.setState({
                            fieldsAdditional: {neighbors:1, shrinkage:1},
                        }, () => { this.props.changeConfig(this.state.fieldsAdditional) })
                    }
                    if (element.factorsAndIter) {
                        fieldsLocal.push(
                            <div key={Math.random()}>
                                <div className="InputOptions">
                                    <InputOptions changeValue={this.changeFactors.bind(this)} label="Fatores:" />
                                </div>
                                <div className="InputOptions">
                                    <InputOptions changeValue={this.changeIte.bind(this)} label="Máximo de iterações:" />
                                </div>
                            </div>
                        )
                        this.setState({
                            fieldsAdditional: {ite:1, factors:1},
                        }, () => { this.props.changeConfig(this.state.fieldsAdditional) })
                    }
                    if (element.knn || element.factorsAndIter) {
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