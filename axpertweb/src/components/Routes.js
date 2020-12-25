import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';


import RangeSlider from 'react-bootstrap-range-slider';

import Gpio from "./Gpio";
import Pwm from "./Pwm";
import TextTeplota from "./TextTeplota";
import MyButton from "./MyButton";

let SERVER = "http://localhost:1001/api";

class Routes extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            state: 0, // 0 - waiting, 1 err, 2 data
            errMessage: "",
            data: null
        }
    }

    componentDidMount() {
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource(SERVER);
            source.onmessage = (event) => {
                this.setState({
                    state: 2,
                    data: JSON.parse(event.data)
                });
            }
        } else {
            this.setState({
                state: 1,
                errMessage: "Sorry, your browser does not support server-sent events..."
            });
        }
    }

    ajaxSendClick(button) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Stisk odeslán
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Button: button }));
    }

    ajaxSendThermostat1Value(value) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Hodnota odeslána
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Thermostat1: value }));
    }

    ajaxSendThermostat2Value(value) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Hodnota odeslána
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Thermostat2: value }));
    }

    ajaxSendThermostat3Value(value) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Hodnota odeslána
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Thermostat3: value }));
    }

    ajaxSendThermostat4Value(value) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Hodnota odeslána
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Thermostat4: value }));
    }

    ajaxSendPwm1Value(analog) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Stav odeslán
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Pwm1: analog }));
    }

    ajaxSendPwm2Value(analog) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Stav odeslán
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Pwm2: analog }));
    }

    ajaxSendPwm3Value(analog) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Stav odeslán
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Pwm3: analog }));
    }

    ajaxSendPwm4Value(analog) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Stav odeslán
            }
        }
        xhttp.open("POST", SERVER, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ Pwm4: analog }));
    }


    clickCall() {
        alert("Ahoj!");
    }

    render() {

        let body;
        if (this.state.state === 0) {
            body = (
                <Alert variant="warning">
                    Čekám na data
                </Alert>
            );
        } else if (this.state.state === 1) {
            body = (
                <Alert variant="danger">
                    {this.state.errMessage}
                </Alert>
            );
        } else {
            body = (
                <div>
                    <Container>
                        <Card style={{ marginBottom: "10px" }}>
                            <Card.Body>
                                <TextTeplota value={this.state.data.AC_output_active_power} label={"AC_output_active_power"} />
                                <TextTeplota value={this.state.data.AC_output_apparent_power} label={"AC_output_apparent_power"} />
                                <TextTeplota value={this.state.data.AC_output_frequency} label={"AC_output_frequency"} />
                                <TextTeplota value={this.state.data.AC_output_voltage} label={"AC_output_voltage"} />
                                <TextTeplota value={this.state.data.Battery_capacity} label={"Battery_capacity"} />
                                <TextTeplota value={this.state.data.Battery_charging_current} label={"Battery_charging_current"} />
                                <TextTeplota value={this.state.data.Battery_discharge_current} label={"Battery_discharge_current"} />
                                <TextTeplota value={this.state.data.Battery_voltage} label={"Battery_voltage"} />
                                <TextTeplota value={this.state.data.Grid_frequency} label={"Grid_frequency"} />
                                <TextTeplota value={this.state.data.Grid_voltage} label={"Grid_voltage"} />
                                <TextTeplota value={this.state.data.InverterTemperature} label={"InverterTemperature"} />
                                <TextTeplota value={this.state.data.Output_Load_Percent} label={"Output_Load_Percent"} />
                                <TextTeplota value={this.state.data.PV_Input_Voltage} label={"PV_Input_Voltage"} />
                                <TextTeplota value={this.state.data.PV_Input_Watt} label={"PV_Input_Watt"} />
                                <TextTeplota value={this.state.data.PV_input_current_for_battery} label={"PV_input_current_for_battery"} />
                                <TextTeplota value={this.state.data.Timestamp} label={"Timestamp"} />
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            );
        }


        return (
            <Container>
                <Navbar expand="lg" variant="light" bg="light" style={{ marginBottom: "10px" }}>
                    <Navbar.Brand>Smart Home</Navbar.Brand>
                </Navbar>
                {body}
            </Container>
        )
    }


}

export default Routes; 