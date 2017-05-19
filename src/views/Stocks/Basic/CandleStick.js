import createG2 from 'g2-react'
import G2 from 'g2'
import React,{ Component } from 'react'
import candleStickData from "./candleStick.json"

const CandleStickChart = createG2(chart => {
  let frame = chart.get('data');
  chart.col('date',{type:'time',mask:'yyyy-mm-dd'});
  chart.axis('date',{title:null});
  chart.axis('start+end+highest+lowest',{title:null});
  chart.axis('value',false);
  chart.legend({position:'top'});
  chart.tooltip({crosshairs:true});
  chart.schema().position('date*(start+end+highest+lowest)')
                .color('trend',['#8F454A',"#39495E"])
                .shape('candle')
                .tooltip('start*end*highest*lowest');
  
  chart.line().position('date*value').color('type', ['#AC4640', '#2D3C48', '#609099', '#BE7459']);

  //slider
  var chart1 = new G2.Chart({id:'c1',forceFit:true,height:60,plotCfg:{margin:[0,20,10,80]}});
  chart1.source(frame,{'date':{type:'time',mask:'yyyy-mm-dd'}});
  chart1.axis('date',{
      title:null,
      labels:null,
      tickLine:null,
      line:{
        stroke:'#444'
      }
  });
  chart1.axis('volume',false);
  chart1.interval().position('date*volumn').color('#81BC9D').tooltip('volume');
  chart1.legend('trend',false);

  var slider = new G2.Plugin.slider({
     domId:'slider',
     height:26,
     xDim:'date',
     yDim:'end',
     charts:[chart,chart1],
     start:'2015-06-04',
     end:'2016-01-15'
  })

  slider.render();
});

class CandleStick extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
          data: [],
          width: 500,
          height: 250,
          plotCfg: {
             margin: [10, 100, 50, 120],
          },
          forceFit:true
      };
       this.chartId  = "rc-g2-candlestick";
      // this.changeHandler = this.changeHandler.bind(this);
    }

    // changeHandler() {
    //  this.setState({
    //   data: chartdata.slice(chartdata.length / 2, chartdata.length - 1),
    //  });
    // }

    splitData(rawData) {
      var values = [];
      for (var i = 0; i < rawData.length; i++) {
        var item = rawData[i];
        values.push(item.end);
      }
      return {
        'md5':  this.calculateMA(5, values),
        'md10': this.calculateMA(10, values),
        'md20': this.calculateMA(20, values),
        'md30': this.calculateMA(30, values)
      };
    }

    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push(null);
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
      }
      return result;
    }

    componentWillMount(){
      var source = [];
      var values = this.splitData(candleStickData);
      for(var i = 0, l = candleStickData.length; i < l; i++) {
        var item = {};
        var arr = candleStickData[i];
        item.date = new Date(arr[0]).getTime();
        item.start = arr[1];
        item.end = arr[2];
        item.lowest = arr[3];
        item.highest = arr[4];
        if (arr[1] <= arr[2]) {
          item.trend = 'up';
        } else {
          item.trend = 'down';
        }
        item.volumn = arr[5];
        item.md5 = values.md5[i];
        item.md10 = values.md10[i];
        item.md20 = values.md20[i];
        item.md30 = values.md30[i];
        source.push(item);
      }
      var Frame = G2.Frame;
      var frame = new Frame(source);
      frame = Frame.combinColumns(frame, ['md5','md10','md20','md30'], 'value', 'type');
      this.setState({
        data: frame
      });

    }

    componentDidMount() {
      // this.initChart(this.props);
    }

    render() {
      var data = this.state.data;
      if (data instanceof G2.Frame)
      {
        data = data.toJSON()
      }
      if(data.length === 0)
      {
        return (<div></div>);
      }
      else
      {
        return (
            <div>
              <CandleStickChart
                data={this.state.data}
                width={this.state.width}
                height={this.state.height}
                plotCfg={this.state.plotCfg}
                forceFit={this.state.forceFit}
              />
            </div>
          );
      }
    }
  }

  // CandleStick.propTypes = {
  //   data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  //   width: React.PropTypes.number.isRequired,
  //   height: React.PropTypes.number.isRequired,
  //   plotCfg: React.PropTypes.object,
  //   forceFit: React.PropTypes.bool,
  //   configs: React.PropTypes.object,
  // };

export default CandleStick;
