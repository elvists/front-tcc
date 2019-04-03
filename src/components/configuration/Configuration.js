import React, { Component } from 'react';
import DropDownOption from '../dropDownOption/DropDownOption'

var algorithms = [{ label: "Média Global", value: "GlobalAvg" }, { label: "AR", value: "AR" }, { label: "Média dos Itens", value: "ItemAvg" }, { label: "Mais Popular", value: "MostPop" }]
var datasets = [{ label: "Filmes", value: "datasets/FilmTrust/ratings.txt" }, { label: "Outro", value: "datasets/FilmTrust/ratings.txt" }]
var a = ["teste2", "teste6", "teste3"]
var a = ["teste2", "teste6", "teste3"]
class Configuration extends Component {
    render() {
        return (
            <div>
                <DropDownOption options={algorithms} />
                <DropDownOption options={datasets} />
                <DropDownOption options={a} />
                <DropDownOption options={a} />
            </div>
        );
    }
}

export default Configuration;