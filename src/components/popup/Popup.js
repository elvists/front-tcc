import React from "react";
import "./Popup.css";

import CircularProgress from '@material-ui/core/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Popup extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      barComponent: [],
      resultComponent: []
    }
  }

  componentWillMount() {
    this.mountResult(this.state.loading, null);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading
    }, this.mountResult(nextProps.loading, nextProps.result))
  }

  mountResult(loading, result) {
    if (loading === false) {
      var localresultComponent, localBarComponent = []
      var cores = ["#1334d8", "#148214", "#e24b22", "#69ceb8"]
      var i = 0
      result.algoritmos.forEach(element => {
        localBarComponent.push(<Bar dataKey={element} fill={cores[i]} />);
        i++;
      });

      this.setState({ resultComponent: localresultComponent, barComponent: localBarComponent })
    }
  }


  render() {
    return (
      <div className='popup'>
        {this.state.loading ?
          <CircularProgress className="Loading" /> :
          <div className='popup_inner' style={{ "overflow": "auto" }} >
            <div >
              {this.state.resultComponent}
            </div>
            <div>
              <BarChart
                width={800}
                height={400}
                data={this.props.result.resultado}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {this.state.barComponent}
              </BarChart>
            </div>
            <button onClick={this.props.closePopup} style={{ "margin": 20 }}>Fechar</button>
          </div>}
      </div>
    );
  }
}

export default Popup;