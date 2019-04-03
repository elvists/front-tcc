import React, { Component } from 'react';
import PropTypes from 'prop-types'

class DropDownOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsComponent: [],
            selected: ""
        }
        
    this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount () {
        this.mountOptions();
     }
  
    mountOptions(){
        var localOptionsComponent = []
        this.props.options.forEach(element => {
            localOptionsComponent.push(<option value={element}>{element}</option>)
        });
        this.setState({ optionsComponent: localOptionsComponent })
    }

    handleChange(event) {
        this.setState({selected: event.target.value});
      }
    

    render() {
        return (
            <div>
                <select value={this.state.selected} onChange={this.handleChange}>
                    {this.state.optionsComponent}
                </select>{this.state.selected}
            </div>
        );
    }
}

DropDownOption.propTypes = {
    options: PropTypes.array.isRequired
}

export default DropDownOption;       

