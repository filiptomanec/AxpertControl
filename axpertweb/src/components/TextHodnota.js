import React from "react";
import PropTypes from "prop-types";

class TextHodnota extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div style={{ marginTop: "3px", marginBottom: "3px" }}>
                {this.props.label} = {this.props.value} {this.props.jednotka} 
            </div>
        )
    }
}

TextHodnota.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    jednotka: PropTypes.string,
};

export default TextHodnota;