import 'whatwg-fetch'
import React, { Component } from 'react'
// import { BarChart } from 'react-d3'
import { Chart } from 'react-google-charts';

const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'
};

class Basic extends Component {
  constructor(props) {
  //   super(props);
  //   this.state = {
  //     barData:[
  //     {label: 'A', value: 5},
  //     {label: 'B', value: 6},
  //     {label: 'F', value: 7}],
  //     width:500,
  //     height:200,
  //     fillColor:'#3182bd',
  //     title:'Bar chart'
  // };
    super(props);
    this.state = {
      options: {
        title: 'Age vs. Weight comparison',
        hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      data: [
        ['Age', 'Weight'],
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7],
      ],
    };
  }

  componentWillMount() {
    // fetch("https://raw.githubusercontent.com/antvis/g2-react/master/examples/candleSticks.json",{headers:API_HEADERS})
    // .then((response) => response.json())
    // .then((responseData) => {
    //   // 创建数据源
    //   var Frame = G2.Frame;
    //   var frame = new Frame(responseData.data);
    //   frame.addCol('trend', function (obj) {
    //     return (obj.start <= obj.end) ? 0 : 1;
    //   });

    //   this.setState({
    //     data: frame
    //   });
    // }).catch(function (error) {
    //   console.log(error);
    // });

      // var Frame = G2.Frame;
      // var frame = new Frame(candle);
      // frame.addCol('trend', function (obj) {
      //   return (obj.start <= obj.end) ? 0 : 1;
      // });

      // this.setState({
      //   data: frame
      // });
  }

  render() {
      return (
          <Chart
            chartType="ScatterChart"
            data={this.state.data}
            options={this.state.options}
            graph_id="ScatterChart"
            width="100%"
            height="400px"
            legend_toggle
          />
      );
   }
}

export default Basic;