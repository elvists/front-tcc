import React, { Component } from 'react';
import './InputOptions.css'
import { Col, Row, Input } from 'reactstrap';

class InputOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }


    handleChange(event) {
        this.setState({ value: event.target.value }, () => {
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
                    <Input placeholder="Valor" min={1} max={100} type="number" defaultValue={1} onChange={this.handleChange.bind(this)} />
                </Col>

            </Row>
        );
    }
}

export default InputOptions;

