import React, { Component } from 'react';
import './App.css';
import Configuration from './components/configuration/Configuration';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import Popup from './components/popup/Popup';

import DropDownOption from './components/dropDownOption/DropDownOption'

// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, CardTitle, Row, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import SwitchOption from './components/switchOption/SwitchOption';

var algorithms = {
  itemLabel: "Algoritmo:", itemOptions: [
    { label: "Item Cluster", value: "ItemCluster", factorsAndIter: true },
    { label: "Item KNN", value: "ItemKNN", knn: true },
    { label: "Média de Usuários", value: "UserAvg" },
    { label: "Média dos Itens", value: "ItemAvg" },
    { label: "Média Global", value: "GlobalAvg" },
    { label: "NMF", value: "NMF", factorsAndIter: true },
    { label: "User Cluster", value: "UserCluster", factorsAndIter: true },
    { label: "User KNN", value: "UserKNN", knn: true },
    { label: "Slope One", value: "SlopeOne" },
  ]
}

var algorithmsRankingPred = {
  itemLabel: "Algoritmo:", itemOptions: [
    { label: "AR", value: "AR" },
    { label: "Item Cluster", value: "ItemCluster", factorsAndIter: true },
    { label: "Item KNN", value: "ItemKNN", knn: true },
    { label: "Mais Popular", value: "MostPop" },
    { label: "Média de Usuários", value: "UserAvg" },
    { label: "Média dos Itens", value: "ItemAvg" },
    { label: "Média Global", value: "GlobalAvg" },
    { label: "NMF", value: "NMF", factorsAndIter: true },
    { label: "User Cluster", value: "UserCluster", factorsAndIter: true },
    { label: "User KNN", value: "UserKNN", knn: true },
    { label: "Slope One", value: "SlopeOne" },
  ]
}

var datasets = { itemLabel: "Conjunto de Dados*:", itemOptions: [{ label: "Filmes", value: "datasets/FilmTrust/ratings.txt" }] }

var apiBaseUrl = "http://35.224.162.6/";
//var apiBaseUrl = "http://localhost:8080/";

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      dataAlgo: algorithms,
      dataset: "",
      id: "",
      recommender1: "",
      recommender2: "",
      recommender3: "",
      recommender4: "",
      config1: {},
      config2: {},
      config3: {},
      config4: {},
      itemRanking: true,
      showPopup: false,
      checked: true,
      asyncRun: true
    }

  }


  mountConfigAlgo(recommender, configAdd) {
    var itemRanking
    if (this.state.itemRanking) {
      itemRanking = "on"
    } else {
      itemRanking = "off"
    }
    var config = {
      "dataset": this.state.dataset,
      "recommender": recommender,
      "evaluationSetup": "cv -k 5 -p on --rand-seed 1 --test-view all",
      "itemRanking": itemRanking + " -topN -1 -ignore -1",
      "outputSetup": "on -dir results/",
      "ratingSetup": "-columns 0 1 2 -threshold -1",
      "asynchronous": this.state.asyncRun
    }
    if (configAdd !== undefined && configAdd !== null) {
      if (configAdd.ite !== undefined) {
        config.numMaxIter = configAdd.ite
      }
      if (configAdd.factors !== undefined) {
        config.numFactors = configAdd.factors
      }
      if (configAdd.neighbors !== undefined) {
        config.numNeighbors = configAdd.neighbors
      }
      if (configAdd.shrinkage !== undefined) {
        config.numShrinkage = configAdd.shrinkage
        if (configAdd.similarity !== undefined) {
          config.similarity = configAdd.similarity
        }else{
          alert("O Campo Similaridade não foi selecionado")
          return null;
        }
      }
     
    }
    console.log(config)
    return config
  }

  find() {

    var self = this;
    if (this.state.id === "") {
      alert("Digite o ID da recomendação!")
      return;
    }
    this.setState({
      showPopup: true,
      loading: true
    })
    Axios.get(apiBaseUrl + 'resultado/' + this.state.id)
      .then(function (response) {
        if (response.status === 200) {
          if(response.data.resultado !== undefined){
            self.setState({
              result: response.data,
              loading: false
            })
          }else{
            alert(response.data)
            self.setState({
              showPopup:false,
              loading: false
            })
          }
          
          console.log(response.data);
        } else {
          console.log(response);
          alert("Erro");
        }
      }).catch(function (error) {
        console.log(error);
        alert("Aconteceu algum erro");
      });
  }

  execute() {
    var self = this;
    var payload = []

    if (this.state.dataset === "") {
      alert("É preciso selecionar o conjunto de dados!")
      return;
    }
    if (this.state.recommender1 !== '') {
      console.log(this.state)
      var recommender1 = this.mountConfigAlgo(this.state.recommender1, this.state.config1)
      if(recommender1 == null){
        return
      }
      payload.push(recommender1)
    }
    if (this.state.recommender2 !== '') {
      var recommender2 = this.mountConfigAlgo(this.state.recommender2, this.state.config2)
      if(recommender2 == null){
        return
      }
      payload.push(recommender2)
    }
    if (this.state.recommender3 !== '') {
      var recommender3 = this.mountConfigAlgo(this.state.recommender3, this.state.config3)
      if(recommender3 == null){
        return
      }
      payload.push(recommender3)
    }

    if (this.state.recommender4 !== '') {
      var recommender4 = this.mountConfigAlgo(this.state.recommender4, this.state.config4)
      if(recommender4 == null){
        return
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
          console.log(self.state.asyncRun)
          if (self.state.asyncRun) {
            self.setState({
              id: response.data,
              showPopup: false,
              loading: false
            })
            alert("O ID de sua execução é: " + response.data)
          } else {
            self.setState({
              result: response.data,
              loading: false
            })
          }
          console.log(response.data);
        } else {
          console.log(response);
          alert("Erro");
        }
      }).catch(function (error) {
        console.log(error);
        alert("Aconteceu algum erro");
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
    if (itemRanking === false) {
      this.setState({
        dataAlgo: algorithmsRankingPred
      });
    } else {
      this.setState({
        dataAlgo: algorithms
      });
    }

  }


  changeItemRanking(event) {
    this.setState({
      itemRanking: event,
      recommender1: "",
      recommender2: "",
      recommender3: "",
      recommender4: "",
      config1: {},
      config2: {},
      config3: {},
      config4: {}
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
    this.setState({ recommender1: event, config1: {} }, () => {
      this.afterSetStateFinished();
    });
  }
  changeAlgorithm2(event) {
    this.setState({ recommender2: event, config2: {} }, () => {
      this.afterSetStateFinished();
    });
  }
  changeAlgorithm3(event) {
    this.setState({ recommender3: event, config3: {} }, () => {
      this.afterSetStateFinished();
    });
  }
  changeAlgorithm4(event) {
    this.setState({ recommender4: event, config4: {} }, () => {
      this.afterSetStateFinished();
    });
  }


  changeRunMethod(change) {
    this.setState({
      asyncRun: change
    });
  }

  idChange(event) {
    this.setState({ id: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col md={{ size: 4, offset: 4 }} xs="12" sm="12">
            <Card >
              <div className="card-title-div"><CardTitle>Configurações Gerais</CardTitle></div>
              <CardBody>
                <DropDownOption changeOption={this.changeDataSet.bind(this)} item={datasets} />
                <SwitchOption changeSwitch={this.changeItemRanking.bind(this)} label={"itemRanking?:"} default={this.state.itemRanking} />
                <SwitchOption  changeSwitch={this.changeRunMethod.bind(this)} label={"Executar Assíncrono?:"} default={this.state.asyncRun} disabled={true} />


              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md={{ size: 5, offset: 1 }}>
            <Card>
              <div className="card-title-div"><CardTitle>Configurações do Algoritmo 1</CardTitle></div>
              <CardBody>
                <Configuration algorithm={this.state.recommender1} algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm1.bind(this)} changeConfig={this.changeConfig1.bind(this)} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md={{ size: 5 }}>
            <Card>
              <div className="card-title-div"><CardTitle>Configurações do Algoritmo 2</CardTitle></div>
              <CardBody>
                <Configuration algorithm={this.state.recommender2} algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm2.bind(this)} changeConfig={this.changeConfig2.bind(this)} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md={{ size: 5, offset: 1 }}>
            <Card>
              <div className="card-title-div"><CardTitle>Configurações do Algoritmo 3</CardTitle></div>
              <CardBody>
                <Configuration algorithm={this.state.recommender3} algorithms={this.state.dataAlgo} changeAlgorithm={this.changeAlgorithm3.bind(this)} changeConfig={this.changeConfig3.bind(this)} />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="12" md={{ size: 5 }}>
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
        { !this.state.showPopup || this.state.loading ?
        <Row>
          <Col xs="12" sm="6" md={{ size: 4, offset: 4 }}>
            <InputGroup className="InputGroup">
              <Input value={this.state.id} placeholder="ID da Recomendação" onChange={this.idChange.bind(this)} />
              <InputGroupAddon addonType="append"><Button color="success" onClick={this.find.bind(this)}>Buscar Resultado</Button></InputGroupAddon>

            </InputGroup>
          </Col>

        </Row> : null
        }
      </div >
    );
  }
}

export default App;

