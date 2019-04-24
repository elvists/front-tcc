import React, { Component } from 'react';
import './App.css';
import Configuration from './components/configuration/Configuration';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import Popup from './components/popup/Popup';


import DropDownOption from './components/dropDownOption/DropDownOption'

// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, CardTitle, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

var algorithms = { itemLabel: "Algoritmo:", itemOptions: [{ label: "Média Global", value: "GlobalAvg" }, { label: "Média dos Itens", value: "ItemAvg" }] }
var algorithmsEmpty = { itemLabel: "Algoritmo:" }
var algorithmsRankingPred = { itemLabel: "Algoritmo:", itemOptions: [{ label: "Média Global", value: "GlobalAvg" }, { label: "AR", value: "AR" }, { label: "Média dos Itens", value: "ItemAvg" }, { label: "Mais Popular", value: "MostPop" }] }
var datasets = { itemLabel: "Conjunto de Dados:", itemOptions: [{ label: "Filmes", value: "datasets/FilmTrust/ratings.txt" }] }
var itemRanking = { itemLabel: "ItemRanking?:", itemOptions: [{ label: "Sim", value: "on" }, { label: "Não", value: "off" }] }

var apiBaseUrl = "http://35.224.162.6/";

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      dataAlgo: algorithmsEmpty,
      dataset: "",
      recommender1: "",
      recommender2: "",
      recommender3: "",
      recommender4: "",
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

    if (this.state.recommender4 !== '') {
      var recommender4 = {
        "dataset": this.state.dataset,
        "recommender": this.state.recommender4,
        "evaluationSetup": "cv -k 5 -p on --rand-seed 1 --test-view all",
        "itemRanking": this.state.itemRanking + " -topN -1 -ignore -1",
        "outputSetup": "on -dir results/",
        "ratingSetup": "-columns 0 1 2 -threshold -1"
      }
      payload.push(recommender4)
    }

    if (payload.length < 2) {
      alert("É preciso selecionar dois ou mais algoritmos!")
      return
    }
    this.setState({
      showPopup: true,
      loading: true
    })
    Axios.post(apiBaseUrl + 'recomendar', payload)
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            result: response.data,
            loading: false
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
      recommender3: "",
      recommender4: ""
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
  changeAlgorithm4(event) {
    this.setState({ recommender4: event }, () => {
      this.afterSetStateFinished();
    });
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col md={{ size: 6, offset: 3 }} xs="12" sm="12">
            <Card >
              <div class="card-title-div"><CardTitle>Configurações Gerais</CardTitle></div>
              <CardBody>
                <DropDownOption changeOption={this.changeDataSet.bind(this)} item={datasets} />
                <DropDownOption changeOption={this.changeItemRanking.bind(this)} item={itemRanking} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="6">
            <Card>
            <div class="card-title-div"><CardTitle>Configurações do Algoritmo 1</CardTitle></div>
              <CardBody>
                <Configuration algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm1.bind(this)} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6">
            <Card>
            <div class="card-title-div"><CardTitle>Configurações do Algoritmo 2</CardTitle></div>
              <CardBody>
                <Configuration algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm2.bind(this)} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6">
            <Card>
            <div class="card-title-div"><CardTitle>Configurações do Algoritmo 3</CardTitle></div>
              <CardBody>
                <Configuration algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm3.bind(this)} />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="12" md="6">
            <Card>
            <div class="card-title-div"><CardTitle>Configurações do Algoritmo 4</CardTitle></div>
              <CardBody>
                <Configuration algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm4.bind(this)} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Button className="Button" color="primary" onClick={this.execute.bind(this)}>Executar</Button>
        {this.state.showPopup ?
          <Popup
            result={this.state.result}
            loading={this.state.loading}
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

