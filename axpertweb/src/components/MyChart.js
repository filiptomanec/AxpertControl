import React from "react";
import { Line } from 'react-chartjs-2';
import PropTypes from "prop-types";

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
        if(width < 800){
            return 250;
        } else {
            return 150;
        }
    }

    render() {
        return (
            <div className="chart">
                <Line
                    height = {this.setSize(this.props.winWidth)}
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
    chartData: {},
    winWidth: PropTypes.number
};

export default MyChart;