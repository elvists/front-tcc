import React, { Component } from 'react';
import Switch from "react-switch"; 
import { Col,  Row } from 'reactstrap';

class SwitchOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.default
        }
    }

    handleChange(event) {
        this.setState({ checked: event }, () => {
            this.props.changeSwitch(this.state.checked)
        });
    }



    render() {
        return (
            <Row>
                <Col  xs="12" sm="8" md="8" className="label">
                    {this.props.label}
                </Col>

                <Col xs="12" sm="4" md="4" className="box">
                    <Switch disabled={this.props.disabled} onChange={this.handleChange.bind(this)} checked={this.state.checked} />
                </Col>

            </Row>

        );
    }
}

export default SwitchOption;