import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Container, Row, Col } from 'react-bootstrap';

import TextHodnota from "./TextHodnota";
import MyChart from "./MyChart";

let SERVER = "http://192.168.0.101:1001/api";

class Routes extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            state: 0, // 0 - waiting, 1 err, 2 data
            errMessage: "",
            data: null,
            chartData: {},
            avOutData: {},
            batteryOutData: {},
            windowWidth: window.innerWidth
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
        this.state.batteryOutData = {
            labels: mojedata.chartTime,
            datasets: [
                {
                    label: 'Napětí [V]',
                    data: mojedata.batteryChartData,
                    backgroundColor: [
                        'rgba(155, 132, 200, 0.6)'
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
                    <Row>
                        <Col md>
                            <Container>

                                <Col md>
                                    <Card style={{ marginBottom: "10px" }}>
                                        <Card.Body>
                                            <TextHodnota value={this.state.data.AC_output_active_power} label={"AC - výstupní výkon"} jednotka={"W"} />
                                            <TextHodnota value={this.state.data.AC_output_apparent_power} label={"AC - zdánlivý výkon"} jednotka={"kVA"} />
                                            <TextHodnota value={this.state.data.AC_output_frequency} label={"AC - výstupní frekvence"} jednotka={"Hz"} />
                                            <TextHodnota value={this.state.data.AC_output_voltage} label={"AC - výstupní napětí"} jednotka={"V"} />
                                            <TextHodnota value={this.state.data.Battery_capacity} label={"Kapacita baterie"} jednotka={"%"} />
                                            <TextHodnota value={this.state.data.Battery_charging_current} label={"Nabíjecí proud baterie"} jednotka={"A"} />
                                            <TextHodnota value={this.state.data.Battery_discharge_current} label={"Vybíjecí proud baterie"} jednotka={"A"} />
                                            <TextHodnota value={this.state.data.Battery_voltage} label={"Napětí baterie"} jednotka={"V"} />
                                            <TextHodnota value={this.state.data.Grid_frequency} label={"Síťová frekvence"} jednotka={"Hz"} />
                                            <TextHodnota value={this.state.data.Grid_voltage} label={"Síťové napětí"} jednotka={"V"} />
                                            <TextHodnota value={this.state.data.InverterTemperature} label={"Teplota měniče"} jednotka={"°C"} />
                                            <TextHodnota value={this.state.data.Output_Load_Percent} label={"Zatížení měniče"} jednotka={"%"} />
                                            <TextHodnota value={this.state.data.PV_Input_Voltage} label={"PV - vstupní napětí"} jednotka={"V"} />
                                            <TextHodnota value={this.state.data.PV_Input_Watt} label={"PV - vstupní výkon"} jednotka={"W"} />
                                            <TextHodnota value={this.state.data.PV_input_current_for_battery} label={"PV - vstupní proud do baterie"} jednotka={"A"} />
                                            <TextHodnota value={this.state.data.Timestamp} label={"Datum"} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/*
                            <Col md>
                                <Card style={{ marginBottom: "10px" }}>
                                    <Card.Body>

                                    </Card.Body>
                                </Card>
                            </Col>
                            */}

                            </Container>
                        </Col>
                        <Col md>
                            <MyChart chartData={this.state.chartData} label='PV - vstupní výkon' legendPosition="bottom" winWidth={this.state.windowWidth} battery={false}></MyChart>
                            <MyChart chartData={this.state.avOutData} label='AC - výstupní výkon' legendPosition="bottom" winWidth={this.state.windowWidth} battery={false}></MyChart>
                            <MyChart chartData={this.state.batteryOutData} label='Napětí baterie' legendPosition="bottom" winWidth={this.state.windowWidth} battery={true} min={this.state.data.min} max={this.state.data.max}></MyChart>
                        </Col>
                    </Row>
                </div>
            );
        }


        return (
            <Container>
                <Navbar expand="lg" variant="light" bg="light" style={{ marginBottom: "10px" }}>
                    <Navbar.Brand>Domácí FVE</Navbar.Brand>
                </Navbar>
                {body}
            </Container>
        )
    }


}

export default Routes; 