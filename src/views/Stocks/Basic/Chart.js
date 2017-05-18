import createG2 from 'g2-react';
import React from 'react'
import chartdata from "./data.json"

let uniqueId = 0;
function generateUniqueId() {
  return `rc-g2-${uniqueId++}`;
}

const Line = createG2(chart => {
  chart.line().position('time*price').color('name').shape('spline').size(2);
  chart.render();
});

class Chart extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
          data: chartdata.slice(0, chartdata.length / 2 - 1),
          width: 500,
          height: 250,
          plotCfg: {
          margin: [10, 100, 50, 120],
        },
        forceFit:true
      };
      this.chartId = generateUniqueId();
      this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler() {
     this.setState({
      data: chartdata.slice(chartdata.length / 2, chartdata.length - 1),
     });
    }

    componentDidMount() {
      // this.initChart(this.props);
    }

    render() {
      return (
        <div>
          <Line
            data={this.state.data}
            width={this.state.width}
            height={this.state.height}
            plotCfg={this.state.plotCfg}
          />
          <button onClick={this.changeHandler}>Change Data</button>
        </div>
      );
    }
  }

  Chart.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    plotCfg: React.PropTypes.object,
    forceFit: React.PropTypes.bool,
    configs: React.PropTypes.object,
  };

export default Chart;
