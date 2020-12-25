import React from "react";
import PropTypes from "prop-types";
import ProgressBar from 'react-bootstrap/ProgressBar';

class Ad extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <ProgressBar style={{marginTop: "3px", marginBottom: "3px" }} now={this.props.value} max={1799} label={this.props.label + ": " + this.props.value} />
        )
    }
}

Ad.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
};

export default Ad;