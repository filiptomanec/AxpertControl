import React from "react";
import PropTypes from "prop-types";
import ProgressBar from 'react-bootstrap/ProgressBar';

class Pwm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <ProgressBar style={{marginTop: "3px", marginBottom: "3px" }} now={this.props.value} max={100} label={this.props.label + ": " + this.props.value + "%"} />
        )
    }
}

Pwm.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
};

export default Pwm;