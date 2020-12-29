import React from "react";
import { Line } from 'react-chartjs-2';
import PropTypes, { number } from "prop-types";

class MyChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'Home'
    }

    setSize(width) {
        if (width < 800) {
            return 250;
        } else {
            return 150;
        }
    }

    render() {
        if (this.props.battery) {
            return (
                <div className="chart">
                    <Line
                        height={this.setSize(this.props.winWidth)}
                        data={this.props.chartData}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        suggestedMin: (this.props.min - 1),
                                        suggestedMax: (this.props.max + 1)
                                    }
                                }]
                            },
                            title: {
                                display: this.props.displayTitle,
                                text: this.props.label,
                                fontSize: 25
                            },
                            legend: {
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            }
                        }}
                    />
                </div>
            )
        } else {
            return (
                <div className="chart">
                    <Line
                        height={this.setSize(this.props.winWidth)}
                        data={this.props.chartData}
                        options={{
                            title: {
                                display: this.props.displayTitle,
                                text: this.props.label,
                                fontSize: 25
                            },
                            legend: {
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            }
                        }}
                    />
                </div>
            )
        }

    }
}

MyChart.propTypes = {
    chartData: PropTypes.array,
    winWidth: PropTypes.number,
    battery: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number
};

export default MyChart;