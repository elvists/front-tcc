import React from "react";
import "./Popup.css";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Popup extends React.Component {

  constructor() {
    super()
    this.state = {
      barComponent: [],
      resultComponent: []
    }
  }

  componentWillMount() {
    this.mountResult();
  }

  mountResult() {
    var localresultComponent, localBarComponent = []
    var cores = ["#1334d8","#148214","#e24b22","#69ceb8" ]
    var i =0
    this.props.result.algoritmos.forEach(element => {
      localBarComponent.push(<Bar dataKey={element}  fill={cores[i]} />);
      i++;
    });
    
    this.setState({ resultComponent: localresultComponent, barComponent: localBarComponent })
  }


  render() {
    return (
      <div className='popup'>
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
        </div>
      </div>
    );
  }
}

export default Popup;