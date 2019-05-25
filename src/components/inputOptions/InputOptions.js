import React, { Component } from 'react';
import './InputOptions.css'
import { Col, Row } from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class InputOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
    }


    handleChange(event) {
        this.setState({ value: event }, () => {
            this.props.changeValue(this.state.value)
        });
    }

    render() {
        return (
            <Row>
                <Col xs="12" sm="6" md="6" className="label">
                    {this.props.label}
                </Col>

                <Col xs="12" sm="6" md="6" className="box">
                    <InputRange
                        maxValue={100}
                        minValue={1}
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)} />
                </Col>

            </Row>
        );
    }
}

export default InputOptions;

