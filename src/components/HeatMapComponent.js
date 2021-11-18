import _, { each } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  getSolicitationUpdates,
  getPreferences,
  getNoticeUpdates,
} from "../actions";
import { REQUEST_PENDING } from "../actions/types";

class HeatMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chartdata: {}, chartoptions: {} };
  }

  componentDidMount() {}

  renderHeatmap() {
    let allCharsMap = {};
    let allCharacters = [];
    let sdArray = [];
    let ratingsArray = [];

    console.log(this.props);

    if (this.props.psycho) {
      this.props.psycho.map((eachMetric) => {
        if (!(eachMetric.fictionalcharname in allCharacters)) {
          allCharacters.push(eachMetric.fictionalcharname);
        }

        if (!(eachMetric.fictionalcharname in allCharsMap)) {
          allCharsMap[eachMetric.fictionalcharname] = {};
        }

        if (!(eachMetric.type in allCharsMap[eachMetric.fictionalcharname])) {
          allCharsMap[eachMetric.fictionalcharname][eachMetric.type] = {};
        }

        if (
          !(
            eachMetric.metric_class in
            allCharsMap[eachMetric.fictionalcharname][eachMetric.type]
          )
        ) {
          allCharsMap[eachMetric.fictionalcharname][eachMetric.type][
            eachMetric.metric_class
          ] = {};
        }

        allCharsMap[eachMetric.fictionalcharname][eachMetric.type][
          eachMetric.metric_class
        ] = eachMetric;
      });

      const char_index = allCharacters.indexOf(this.props.charactername);
      console.log(this.props.charactername, char_index);

      console.log("allCharsMap", allCharsMap);
      console.log(
        "allCharsMap[allCharacters[char_index]]",
        allCharsMap[allCharacters[char_index]]
      );

      if (!allCharsMap[allCharacters[char_index]]) {
        let old_chart = Chart.getChart("heatmapchart");
        if (old_chart) {
          old_chart.destroy();
        }
        return;
      }

      const one_char_means = allCharsMap[allCharacters[char_index]]["mean"];
      const all_labels = Object.keys(one_char_means);
      let all_data_points = [];
      let all_left_labels = [];
      let all_right_labels = [];
      all_labels.map((each_label) => {
        all_data_points.push(one_char_means[each_label]["metric"]);
        all_left_labels.push(
          this.props.psychometricsMetadata[each_label]["low"]
        );
        all_right_labels.push(
          this.props.psychometricsMetadata[each_label]["high"]
        );
      });

      const datasets = [
        {
          label: "value",
          backgroundColor: "rgba(219, 20, 0, 0.2)",
          borderColor: "rgba(219, 20, 0, 0.8)",
          data: all_data_points,
          yAxisID: "y0",
        },
      ];

      const chartData = {
        labels: all_labels,
        datasets: datasets,
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        legend: { display: false },
        scales: {
          y0: {
            weight: 1,
            position: "left",
            type: "category",
            display: false,
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
              padding: 0,
            },
            grid: {
              display: false,
            },
          },
          y1: {
            weight: 0,
            position: "left",
            type: "category",
            labels: all_left_labels,
            gridLines: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y2: {
            position: "right",
            type: "category",
            labels: all_right_labels,
            gridLines: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          x1: {
            id: "x1",
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          //   yAxes: [
          //     {
          //       id: "y0",
          //       weight: 1,
          //       position: "left",
          //       type: "category",
          //       display: false,
          //       gridLines: {
          //         display: false,
          //       },
          //       ticks: {
          //         display: false,
          //         padding: 0,
          //       },
          //     },
          //     {
          //       id: "y1",
          //       weight: 0,
          //       position: "left",
          //       type: "category",
          //       labels: all_left_labels,
          //       gridLines: {
          //         display: false,
          //       },
          //     },
          //     {
          //       id: "y2",
          //       position: "right",
          //       type: "category",
          //       labels: all_right_labels,
          //       gridLines: {
          //         display: false,
          //       },
          //     },
          //   ],
          //   xAxes: [
          //     {
          //       id: "x1",
          //       ticks: {
          //         beginAtZero: true,
          //       },
          //     },
          //   ],
        },
        plugins: {
          datalabels: {
            color: "red",
            align: "right",
            anchor: "start",
            formatter: function (value, context) {
              console.log(context);
              return chartData.labels[context.dataIndex];
            },
          },
          title: {
            display: true,
            text: this.props.actorname + " as " + this.props.charactername,
          },
          legend: {
            display: false,
          },
        },
      };

      //   this.setState({ chartdata: chartData, chartoptions: chartOptions });

      let old_chart = Chart.getChart("heatmapchart");
      if (old_chart) {
        old_chart.destroy();
      }
      let ctx = document.getElementById("heatmapchart").getContext("2d");

      //   ctx.destroy();
      let myBar = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: chartOptions,
      });

      //   one_char_means.map();
    }
  }

  render() {
    return (
      <div className="">
        {this.renderHeatmap()}
        {/* <Bar data={this.state.chartdata} options={this.state.chartoptions} /> */}
      </div>
    );

    // return <div></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fictionalCharMetrics: state.fictionalCharMetrics,
    psychometricsMetadata: state.psychometricsMetadata,
  };
};

export default connect(mapStateToProps, {})(HeatMapComponent);
