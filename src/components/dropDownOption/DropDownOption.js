import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './DropDownOption.css'

class DropDownOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsComponent: [],
            selected: ""
        }
    }

    componentWillMount () {
        this.mountOptions();
     }
  
    mountOptions(){
        var localOptionsComponent = []
        localOptionsComponent.push(<option key={Math.random()} value="">{"Selecione"}</option>)
        this.props.item.itemOptions.forEach(element => {
            localOptionsComponent.push(<option key={Math.random()} value={element.value}>{element.label}</option>)
        });
        this.setState({ optionsComponent: localOptionsComponent })
    }
    
    handleChange(event) {
        this.setState({selected: event.target.value}, () => {
            this.props.changeOption(this.state.selected)
        });
    }

    render() {
        return (
            <div  className="DropDownOption">
                {this.props.item.itemLabel}
                <div className="box"> 
                    <select value={this.state.selected} onChange={this.handleChange.bind(this)}>
                        {this.state.optionsComponent}
                    </select>
                </div>
            </div>
        );
    }
}

DropDownOption.propTypes = {
    item: PropTypes.shape({
        itemLabel: PropTypes.string.isRequired,
        itemOptions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })).isRequired
    }).isRequired
}

export default DropDownOption;       

