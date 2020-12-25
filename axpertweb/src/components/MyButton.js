import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';

 

class MyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

 

        };
    }

 

    clickHandler(id) {
        if (this.props.clickhandler !== undefined) {            
                this.props.clickhandler(id);           
        }
    }

 

    render() {    
        let variant = "outline-primary";
        if (this.props.value === true) {
            variant = "success";
        }
        return (
            <Button style={{ marginRight: "4px", marginBottom: "4px" }} size="sm" onClick={() => this.clickHandler(this.props.Button)} variant={variant}>{this.props.label}</Button>
        );
    }
}

 

MyButton.propTypes = {
    clickhandler: PropTypes.func,    
    Button: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool
};

 

export default MyButton; 
