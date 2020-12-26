import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { Chart } from "react-google-charts";


import RangeSlider from 'react-bootstrap-range-slider';

import Gpio from "./Gpio";
import Pwm from "./Pwm";
import TextTeplota from "./TextTeplota";
import MyButton from "./MyButton";
import MyChart from "./MyChart";

let SERVER = "http://localhost:1001/api";

class Routes extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            state: 0, // 0 - waiting, 1 err, 2 data
            errMessage: "",
            data: null,
            chartData: {},
            avOutData: {}
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

    setChartData(mojedata) {
        this.state.chartData = {
            labels: mojedata.chartTime,
            datasets: [
                {
                    label: 'Výkon [W]',
                    data: mojedata.chartData,
                    backgroundColor: [
                        'rgba(55, 200, 132, 0.6)'
                    ]
                }
            ]
        }
        this.state.avOutData = {
            labels: mojedata.chartTime,
            datasets: [
                {
                    label: 'Výkon [W]',
                    data: mojedata.acChartData,
                    backgroundColor: [
                        'rgba(55, 132, 200, 0.6)'
                    ]
                }
            ]
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
            this.setChartData(this.state.data);
            body = (
                <div>
                    <Container>
                        <Row>
                            <Col md>
                                <Card style={{ marginBottom: "10px" }}>
                                    <Card.Body>
                                        <TextTeplota value={this.state.data.AC_output_active_power} label={"AC - výstupní výkon"} jednotka={"W"} />
                                        <TextTeplota value={this.state.data.AC_output_apparent_power} label={"AC - zdánlivý výkon"} jednotka={"kVA"} />
                                        <TextTeplota value={this.state.data.AC_output_frequency} label={"AC - výstupní frekvence"} jednotka={"Hz"} />
                                        <TextTeplota value={this.state.data.AC_output_voltage} label={"AC - výstupní napětí"} jednotka={"V"} />
                                        <TextTeplota value={this.state.data.Battery_capacity} label={"Kapacita baterie"} jednotka={"%"} />
                                        <TextTeplota value={this.state.data.Battery_charging_current} label={"Nabíjecí proud baterie"} jednotka={"A"} />
                                        <TextTeplota value={this.state.data.Battery_discharge_current} label={"Vybíjecí proud baterie"} jednotka={"A"} />
                                        <TextTeplota value={this.state.data.Battery_voltage} label={"Napětí baterie"} jednotka={"V"} />
                                        <TextTeplota value={this.state.data.Grid_frequency} label={"Síťová frekvence"} jednotka={"Hz"} />
                                        <TextTeplota value={this.state.data.Grid_voltage} label={"Síťové napětí"} jednotka={"V"} />
                                        <TextTeplota value={this.state.data.InverterTemperature} label={"Teplota měniče"} jednotka={"°C"} />
                                        <TextTeplota value={this.state.data.Output_Load_Percent} label={"Zatížení měniče"} jednotka={"%"} />
                                        <TextTeplota value={this.state.data.PV_Input_Voltage} label={"PV - vstupní napětí"} jednotka={"V"} />
                                        <TextTeplota value={this.state.data.PV_Input_Watt} label={"PV - vstupní výkon"} jednotka={"W"} />
                                        <TextTeplota value={this.state.data.PV_input_current_for_battery} label={"PV - vstupní proud do baterie"} jednotka={"A"} />
                                        <TextTeplota value={this.state.data.Timestamp} label={"Datum"} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md>
                                <Card style={{ marginBottom: "10px" }}>
                                    <Card.Body>
                                        <MyChart chartData={this.state.chartData} label='PV - vstupní výkon' legendPosition="bottom"></MyChart>
                                        <MyChart chartData={this.state.avOutData} label='AC - výstupní výkon'legendPosition="bottom"></MyChart>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
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