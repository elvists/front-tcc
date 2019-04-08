import React from "react";
import "./Popup.css";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class Popup extends React.Component {

  constructor() {
    super()
    this.state = {
      resultComponent: []
    }
  }

  componentWillMount() {
    this.mountResult();
  }

  mountResult() {
    var localresultComponent = []
    if (this.props.isItemRanking) {
      localresultComponent.push(

        <MuiThemeProvider key="multi">
          <div key="div-result">
            {"AUC"}: {this.props.result.auc} <br/>
            {"MAP"}: {this.props.result.map} <br/>
            {"MRR"}: {this.props.result.mrr} <br/>
            {"NDCG"}: {this.props.result.ndcg} <br/>
            {"PREC5"}: {this.props.result.prec5} <br/>
            {"PREC10"}: {this.props.result.prec10} <br/>
            {"RECALL5"}: {this.props.result.recall5} <br/>
            {"RECALL10"}: {this.props.result.recall10} <br/>
          </div>
        </MuiThemeProvider>
      )
    } else {

    }
    this.setState({ resultComponent: localresultComponent })
  }


  render() {
    return (
      <div className='popup'>
        <div className='popup_inner' style={{ "overflow": "auto" }} >
          <div >
            {this.state.resultComponent}
          </div>
          <button onClick={this.props.closePopup} style={{ "margin": 20 }}>Fechar</button>
        </div>
      </div>
    );
  }
}

export default Popup;