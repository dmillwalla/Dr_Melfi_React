import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import HeatMapComponent from "./HeatMapComponent";

import {
  getSolicitationUpdates,
  getPreferences,
  getNoticeUpdates,
} from "../actions";
import { REQUEST_PENDING } from "../actions/types";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedchar: "" };
  }

  componentDidMount() {
    // let canvas = document.getElementById("heatmapchart");
    // let heightRatio = 10;
    // canvas.height = canvas.width * heightRatio;
  }

  renderHeatMap() {
    if (
      this.props.actors.current_actor &&
      this.props.fictionalCharMetrics &&
      this.props.fictionalCharMetrics[this.props.actors.current_actor.id] &&
      this.state.selectedchar
    ) {
      const actor_obj = this.props.actors.current_actor;
      console.log(actor_obj);

      let fictional = this.props.fictionalCharMetrics[actor_obj.id];

      let all_movies = [];
      let all_state_array = [];
      fictional.map((eachMetric) => {
        if (!(eachMetric.moviename in all_movies)) {
          all_movies.push(eachMetric.moviename);
        }

        let icon_style = "film";
        if (eachMetric.mediawork.includes("tv")) {
          icon_style = "tv";
        }

        let to_add = {
          character: eachMetric.fictionalcharname,
          movie: eachMetric.moviename,
          iconclass: icon_style,
        };
        all_state_array.push(to_add);
      });

      return (
        <div>
          <HeatMapComponent
            psycho={this.props.fictionalCharMetrics[actor_obj.id]}
            actorname={actor_obj.name}
            charactername={this.state.selectedchar}
          />
        </div>
      );
    }
  }

  setCharacter = (character) => {
    this.setState({ selectedchar: character });
  };

  renderCreditIcons() {
    if (
      this.props.actors.current_actor &&
      this.props.fictionalCharMetrics &&
      this.props.fictionalCharMetrics[this.props.actors.current_actor.id]
    ) {
      const actor_obj = this.props.actors.current_actor;
      console.log("rendering credits", actor_obj);

      let fictional = this.props.fictionalCharMetrics[actor_obj.id];

      console.log(fictional.length);

      let all_movies = [];
      let all_state_array = [];

      fictional.map((eachMetric) => {
        if (!all_movies.includes(eachMetric.moviename)) {
          // console.log(eachMetric.moviename, all_movies);
          all_movies.push(eachMetric.moviename);
          let icon_style = "film";
          if (eachMetric.mediawork.includes("tv")) {
            icon_style = "tv";
          }

          let to_add = {
            character: eachMetric.fictionalcharname,
            movie: eachMetric.moviename,
            iconclass: icon_style,
          };
          all_state_array.push(to_add);
        }
      });

      return all_state_array.map((each_char) => {
        return (
          <a
            className={
              "item " +
              (this.state.selectedchar === each_char.character ? "active" : "")
            }
            key={each_char.movie}
            onClick={() => {
              this.setCharacter(each_char.character);
            }}
          >
            <i className={each_char.iconclass + " icon"}></i>
            <div className="content">
              <div className="header">{each_char.character}</div>
              <div className="description">{each_char.movie}</div>
            </div>
          </a>
        );
      });
    }
  }

  renderActorDetails() {
    if (this.props.actors.current_actor) {
      const actor_obj = this.props.actors.current_actor;
      return (
        <div>
          <div className="ui card">
            <div className="image">
              <img src={actor_obj.photo_url} />
            </div>
            <div className="content">
              <a className="header">{actor_obj.name}</a>
              <div className="meta">
                <span className="date">Actor</span>
              </div>
              <div className="description">
                Place of Birth: {actor_obj.place_of_birth}
              </div>
              <div className="description">Birthday: {actor_obj.birthday}</div>
              <div className="description">Deathday: {actor_obj.deathday}</div>
              <div className="description">Gender: {actor_obj.gender}</div>
            </div>
          </div>
          <h2 className="ui header">
            <i className="star icon"></i>
            <div className="content">
              Starred In:
              <div className="sub header">
                Click to view psychometric profile
              </div>
            </div>
          </h2>
          <div className="ui secondary vertical menu">
            {this.renderCreditIcons()}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui feed">
        <div className="ui fluid container stackable grid">
          <div className="five wide column">{this.renderActorDetails()}</div>
          <div className="eleven wide column">
            <canvas id="heatmapchart" height="5000" width="500" />
            {this.renderHeatMap()}
          </div>
        </div>

        {/* {this.renderUpdates()} */}
      </div>
    );

    // return <div></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    actors: state.actors,
    fictionalCharMetrics: state.fictionalCharMetrics,
  };
};

export default connect(mapStateToProps, {})(DashboardContainer);
