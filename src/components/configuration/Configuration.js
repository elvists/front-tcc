import React, { Component } from 'react';
import DropDownOption from '../dropDownOption/DropDownOption'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Axios from 'axios';
import Popup from '../popup/Popup';

var algorithms = {itemLabel: "Algoritmo", itemOptions : [{ label: "Média Global", value: "GlobalAvg" }, { label: "AR", value: "AR" }, { label: "Média dos Itens", value: "ItemAvg" }, { label: "Mais Popular", value: "MostPop" }]}
var datasets = {itemLabel: "Conjunto de Dados", itemOptions :[{ label: "Filmes", value: "datasets/FilmTrust/ratings.txt" }]}
var itemRanking = {itemLabel: "ItemRanking?", itemOptions :[{ label: "Sim", value: "on" }, { label: "Não", value: "off" }]}


var apiBaseUrl = "http://localhost:8080/";

class Configuration extends Component {

    constructor() {
        super();
        this.state = {
            dataset: "",
            recommender: "",
            itemRanking: "",
            showPopup: false
        }

    }
    togglePopup() {
        this.setState({
          texto: "",
          showPopup: !this.state.showPopup
        });
    }

    handleClick() {
        var self = this;
        var payload = {
            "dataset": this.state.dataset,
            "recommender": this.state.recommender,
            "evaluationSetup": "cv -k 5 -p on --rand-seed 1 --test-view all",
            "itemRanking": this.state.itemRanking + " -topN -1 -ignore -1",
            "outputSetup": "on -dir results/",
            "ratingSetup": "-columns 0 1 2 -threshold -1"

        }
        Axios.post(apiBaseUrl + 'recomendar', payload)
            .then(function (response) {
                if (response.status === 200) {
                    self.setState({
                        showPopup: true,
                        result: response.data
                    })
                    console.log(response.data);
                } else {
                    console.log(response);
                    alert("Erro");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    changeAlgorithm(event) {
        this.setState({ recommender: event }, () => {
            this.afterSetStateFinished();
        });
    }

    changeDataSet(event) {
        this.setState({ dataset: event }, () => {
            this.afterSetStateFinished();
        });
    } 
    
    changeItemRanking(event) {
        this.setState({ itemRanking: event }, () => {
            this.afterSetStateFinished();
        });
    }

    afterSetStateFinished() {
    }



    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <DropDownOption changeOption={this.changeAlgorithm.bind(this)} item={algorithms} />
                    <DropDownOption changeOption={this.changeDataSet.bind(this)} item={datasets} />
                    <DropDownOption changeOption={this.changeItemRanking.bind(this)} item={itemRanking} />
                    <div>
                        <RaisedButton className="RaisedButton" label={"Executar"} primary={true} onClick={(event) => this.handleClick(event)} />
                    </div>
                    {this.state.showPopup ? 
                        <Popup
                        result={this.state.result}
                        isItemRanking={this.state.itemRanking}
                        closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Configuration;