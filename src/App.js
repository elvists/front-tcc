import React, { Component } from 'react';
import './App.css';
import Configuration from './components/configuration/Configuration';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import Popup from './components/popup/Popup';

import DropDownOption from './components/dropDownOption/DropDownOption'

// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

var algorithms = { itemLabel: "Algoritmo", itemOptions: [{ label: "Média Global", value: "GlobalAvg" }, { label: "Média dos Itens", value: "ItemAvg" }] }
var algorithmsRankingPred = { itemLabel: "Algoritmo", itemOptions: [{ label: "Média Global", value: "GlobalAvg" }, { label: "AR", value: "AR" }, { label: "Média dos Itens", value: "ItemAvg" }, { label: "Mais Popular", value: "MostPop" }] }
var datasets = { itemLabel: "Conjunto de Dados", itemOptions: [{ label: "Filmes", value: "datasets/FilmTrust/ratings.txt" }] }
var itemRanking = { itemLabel: "ItemRanking?", itemOptions: [{ label: "Sim", value: "on" }, { label: "Não", value: "off" }] }

var apiBaseUrl = "http://35.224.162.6/";

class App extends Component {

  constructor() {
    super();
    this.state = {
      dataAlgo: [],
      dataset: "",
      recommender1: "",
      recommender2: "",
      recommender3: "",
      itemRanking: "",
      showPopup: false
    }

  }

  execute() {
    var self = this;
    var payload = []
    if (this.state.recommender1 !== '') {
      var recommender1 = {
        "dataset": this.state.dataset,
        "recommender": this.state.recommender1,
        "evaluationSetup": "cv -k 5 -p on --rand-seed 1 --test-view all",
        "itemRanking": this.state.itemRanking + " -topN -1 -ignore -1",
        "outputSetup": "on -dir results/",
        "ratingSetup": "-columns 0 1 2 -threshold -1"
      }
      payload.push(recommender1)
    }
    if (this.state.recommender2 !== '') {
      var recommender2 = {
        "dataset": this.state.dataset,
        "recommender": this.state.recommender2,
        "evaluationSetup": "cv -k 5 -p on --rand-seed 1 --test-view all",
        "itemRanking": this.state.itemRanking + " -topN -1 -ignore -1",
        "outputSetup": "on -dir results/",
        "ratingSetup": "-columns 0 1 2 -threshold -1"
      }
      payload.push(recommender2)
    }
    if (this.state.recommender3 !== '') {
      var recommender3 = {
        "dataset": this.state.dataset,
        "recommender": this.state.recommender3,
        "evaluationSetup": "cv -k 5 -p on --rand-seed 1 --test-view all",
        "itemRanking": this.state.itemRanking + " -topN -1 -ignore -1",
        "outputSetup": "on -dir results/",
        "ratingSetup": "-columns 0 1 2 -threshold -1"
      }
      payload.push(recommender3)
    }

    if (payload.length < 2) {
      alert("É preciso selecionar dois ou mais algoritmos!")
      return
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

  changeDataSet(event) {
    this.setState({ dataset: event }, () => {
      this.afterSetStateFinished();
    });
  }


  afterSetStateFinished() {
  }

  afterchangeItemRanking(itemRanking) {
    
    console.log(itemRanking)
    if (itemRanking === "off") {
      this.setState({
        dataAlgo: algorithms
      });
    } else {
      this.setState({
        dataAlgo: algorithmsRankingPred
      });
    }

  }


  changeItemRanking(event) {
    this.setState({ 
      itemRanking: event,
      recommender1: "",
      recommender2: "",
      recommender3: ""
     }, () => {
      this.afterchangeItemRanking(event);
    });
  }

  togglePopup() {
    this.setState({
      texto: "",
      showPopup: !this.state.showPopup
    });
  }


  changeAlgorithm1(event) {
    this.setState({ recommender1: event }, () => {
      this.afterSetStateFinished();
    });
  }
  changeAlgorithm2(event) {
    this.setState({ recommender2: event }, () => {
      this.afterSetStateFinished();
    });
  }
  changeAlgorithm3(event) {
    this.setState({ recommender3: event }, () => {
      this.afterSetStateFinished();
    });
  }

  render() {
    return (
      <div className="App">
        <Card>
          <CardBody>
            <DropDownOption changeOption={this.changeDataSet.bind(this)} item={datasets} />
            <DropDownOption changeOption={this.changeItemRanking.bind(this)} item={itemRanking} />
          </CardBody>
        </Card>
        <Row>
          <Col sm="4">
            <Card>
              <CardBody>
                <Configuration algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm1.bind(this)} />
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <Configuration algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm2.bind(this)} />
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <Configuration algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm3.bind(this)} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Button color="primary" onClick={this.execute.bind(this)}>Executar</Button>
        {this.state.showPopup ?
          <Popup
            result={this.state.result}
            isItemRanking={this.state.itemRanking}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div >
    );
  }
}

export default App;

