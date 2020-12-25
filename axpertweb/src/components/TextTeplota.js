import React from "react";
import PropTypes from "prop-types";

class TextTeplota extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div style={{ marginTop: "3px", marginBottom: "3px" }}>
                {this.props.label} = {this.props.value}
            </div>
        )
    }
}

TextTeplota.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
};

export default TextTeplota;