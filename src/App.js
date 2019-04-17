import React, { Component } from 'react';
import './App.css';
import Configuration from './components/configuration/Configuration';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import Popup from './components/popup/Popup';

import DropDownOption from './components/dropDownOption/DropDownOption'

// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

var algorithms = { itemLabel: "Algoritmo", itemOptions: [{ label: "Média Global", value: "GlobalAvg" }, { label: "AR", value: "AR" }, { label: "Média dos Itens", value: "ItemAvg" }, { label: "Mais Popular", value: "MostPop" }] }
var datasets = { itemLabel: "Conjunto de Dados", itemOptions: [{ label: "Filmes", value: "datasets/FilmTrust/ratings.txt" }] }
var itemRanking = { itemLabel: "ItemRanking?", itemOptions: [{ label: "Sim", value: "on" }, { label: "Não", value: "off" }] }

var apiBaseUrl = "http://localhost:8080/";

class App extends Component {

  constructor() {
    super();
    this.state = {
      dataset: "",
      recommender: "",
      itemRanking: "",
      showPopup: false
    }

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

  changeDataSet(event) {
    this.setState({ dataset: event }, () => {
      this.afterSetStateFinished();
    });
  }

  
  afterSetStateFinished() {
  }


  changeItemRanking(event) {
    this.setState({ itemRanking: event }, () => {
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
              <Configuration algorithms={algorithms} />
              </CardBody>
            </Card>
          </Col>      
          <Col sm="4">
            <Card>
              <CardBody>
              <Configuration algorithms={algorithms} />
              </CardBody>
            </Card>
          </Col>      
          <Col sm="4">
            <Card>
              <CardBody>
              <Configuration algorithms={algorithms} />
              </CardBody>
            </Card>
          </Col>             
        </Row>

        <Button color="primary" >button</Button>
        {/* <div className="Card">
          <Configuration algorithms={algorithms} />
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
        </div> */}
      </div >
    );
  }
}

export default App;

