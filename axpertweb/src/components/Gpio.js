import React from "react";
import PropTypes from "prop-types";
import Badge from 'react-bootstrap/Badge';

class Gpio extends React.Component {


    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let variant = "danger";
        if (this.props.value === 1) {
            variant = "success";
        }
        return (
            <Badge pill style={{ marginLeft: "5px", marginRight: "5px" }} variant={variant}>{this.props.label}</Badge>
        )
    }


}



Gpio.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
};

export default Gpio;