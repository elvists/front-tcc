import React, { Component } from 'react';
import './DropDownOption.css'
import { Col, Row } from 'reactstrap';

class DropDownOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsComponent: [],
            selected: ""
        }
    }

    componentWillMount() {
        this.mountOptions(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.mountOptions(nextProps)
    }

    mountOptions(props) {
        var localOptionsComponent = []
        localOptionsComponent.push(<option key={Math.random()} value="">{"Selecione"}</option>)
        if (typeof props.item !== undefined && props.item.itemOptions !== undefined && props.item.itemOptions.length > 0) {
            props.item.itemOptions.forEach(element => {
                localOptionsComponent.push(<option key={Math.random()} value={element.value}>{element.label}</option>)
            });
        }
        this.setState({ optionsComponent: localOptionsComponent })
    }

    handleChange(event) {
        this.setState({ selected: event.target.value }, () => {
            this.props.changeOption(this.state.selected)
        });
    }

    render() {
        return (
            <Row>
                <Col xs="12" sm="12" md="6" className="label">
                    {this.props.item.itemLabel}
                </Col>

                <Col xs="12" sm="12" md="6" className="box">
                    <select className="form-control" value={this.state.selected} onChange={this.handleChange.bind(this)}>
                        {this.state.optionsComponent}
                    </select>
                </Col>

            </Row>
        );
    }
}

// DropDownOption.propTypes = {
//     item: PropTypes.shape({
//         itemLabel: PropTypes.string.isRequired,
//         itemOptions: PropTypes.arrayOf(PropTypes.shape({
//             label: PropTypes.string.isRequired,
//             value: PropTypes.string.isRequired,
//         })).isRequired
//     }).isRequired
// }

export default DropDownOption;

