import React, { Component } from 'react';
import './App.css';
import Configuration from './components/configuration/Configuration';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import Popup from './components/popup/Popup';


import DropDownOption from './components/dropDownOption/DropDownOption'

// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, CardTitle, Row } from 'reactstrap';

var algorithms = { itemLabel: "Algoritmo:", itemOptions: [{ label: "Média Global", value: "GlobalAvg" }, { label: "Média dos Itens", value: "ItemAvg" }] }
var algorithmsEmpty = { itemLabel: "Algoritmo:" }
var algorithmsRankingPred = { itemLabel: "Algoritmo:", itemOptions: [{ label: "Média Global", value: "GlobalAvg" }, { label: "AR", value: "AR" }, { label: "Média dos Itens", value: "ItemAvg" }, { label: "Mais Popular", value: "MostPop" }, { label: "Item Cluster", value: "ItemCluster", factorsAndIter: true }] }
var datasets = { itemLabel: "Conjunto de Dados:", itemOptions: [{ label: "Filmes", value: "datasets/FilmTrust/ratings.txt" }] }
var itemRanking = { itemLabel: "ItemRanking?:", itemOptions: [{ label: "Sim", value: "on" }, { label: "Não", value: "off" }] }

var apiBaseUrl = "http://localhost:8080/";

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
      config1: {},
      config2: {},
      config3: {},
      config4: {},
      itemRanking: "",
      showPopup: false
    }

  }


  mountConfigAlgo(recommender, config){
    return {
      "dataset": this.state.dataset,
      "recommender": recommender,
      "evaluationSetup": "cv -k 5 -p on --rand-seed 1 --test-view all",
      "itemRanking": this.state.itemRanking + " -topN -1 -ignore -1",
      "outputSetup": "on -dir results/",
      "ratingSetup": "-columns 0 1 2 -threshold -1"
    }
  }

  execute() {
    console.log(this.state)
    var self = this;
    var payload = []
    if (this.state.recommender1 !== '') {
      var recommender1 = this.mountConfigAlgo(this.state.recommender1, null)
      payload.push(recommender1)
    }
    if (this.state.recommender2 !== '') {
      var recommender2 = this.mountConfigAlgo(this.state.recommender2, null)
      payload.push(recommender2)
    }
    if (this.state.recommender3 !== '') {
      var recommender3 = this.mountConfigAlgo(this.state.recommender3, null)
      payload.push(recommender3)
    }

    if (this.state.recommender4 !== '') {
      var recommender4 = this.mountConfigAlgo(this.state.recommender4, null)
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


  changeConfig1(event) {
    this.setState({ config1: event }, () => {
      this.afterSetStateFinished();
    });
  }

  changeConfig2(event) {
    this.setState({ config2: event }, () => {
      this.afterSetStateFinished();
    });
  }

  changeConfig3(event) {
    this.setState({ config3: event }, () => {
      this.afterSetStateFinished();
    });
  }

  changeConfig4(event) {
    this.setState({ config4: event }, () => {
      this.afterSetStateFinished();
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
              <div className="card-title-div"><CardTitle>Configurações Gerais</CardTitle></div>
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
              <div className="card-title-div"><CardTitle>Configurações do Algoritmo 1</CardTitle></div>
              <CardBody>
                <Configuration algorithm={this.state.recommender1} algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm1.bind(this)}  changeConfig={this.changeConfig1.bind(this)} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6">
            <Card>
              <div className="card-title-div"><CardTitle>Configurações do Algoritmo 2</CardTitle></div>
              <CardBody>
                <Configuration algorithm={this.state.recommender2} algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm2.bind(this)} changeConfig={this.changeConfig2.bind(this)} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6">
            <Card>
              <div className="card-title-div"><CardTitle>Configurações do Algoritmo 3</CardTitle></div>
              <CardBody>
                <Configuration algorithm={this.state.recommender3} algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm3.bind(this)} changeConfig={this.changeConfig3.bind(this)} />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="12" md="6">
            <Card>
              <div className="card-title-div"><CardTitle>Configurações do Algoritmo 4</CardTitle></div>
              <CardBody>
                <Configuration algorithm={this.state.recommender4} algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm4.bind(this)} changeConfig={this.changeConfig4.bind(this)} />
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

