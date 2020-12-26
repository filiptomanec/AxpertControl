import React from "react";
import PropTypes, { string } from "prop-types";
import { Bar, Line, Pie } from 'react-chartjs-2';

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

    render() {
        return (
            <div className="chart">
                <Line
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

MyChart.propTypes = {
    chartData: {}
};

export default MyChart;