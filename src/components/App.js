import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import AddNotice from "./proposals/AddNotice";
import TrackNotice from "./proposals/TrackNotice";
import NoticeUpdates from "./proposals/NoticeUpdates";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import history from "../history";

import { REQUEST_PENDING } from "../actions/types";
import {
  getAllActors,
  getActor,
  getActorMetrics,
  getPsychoMetadata,
  clearCurrentActor,
} from "../actions";
import LoadingOverlay from "react-loading-overlay";
import DashboardContainer from "./DashboardContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedActor: "" };
  }

  componentDidMount() {
    // this.props.getSolicitationUpdates();
    this.props.getAllActors();
    this.props.getPsychoMetadata();
  }

  renderOptions() {
    if (this.props && this.props.actors && this.props.actors.actors) {
      const sorted_actors = Object.keys(this.props.actors.actors).sort();
      return sorted_actors.map((each_actor) => {
        return (
          <option
            value={this.props.actors.actors[each_actor]}
            key={this.props.actors.actors[each_actor]}
          >
            {each_actor}
          </option>
        );
      });
    }
  }

  handleSelection = (event) => {
    console.log(event.target.value);
    this.setState({ selectedActor: event.target.value });
    this.props.clearCurrentActor();
    this.props.getActor(event.target.value);
    this.props.getActorMetrics(event.target.value);
  };

  render() {
    return (
      <LoadingOverlay
        active={this.props.isActive}
        spinner
        text="Loading..."
        styles={{
          wrapper: {
            height: "100%",
          },
        }}
      >
        <div className="ui grid stackable" style={{ height: "100%" }}>
          <Router history={history}>
            <div className="four wide column">
              {/* <div className="ui vertical left fixed  menu"> */}
              <div
                className="ui vertical fluid tabular menu"
                style={{ height: "100%" }}
              >
                <div className="item">
                  {/* <div className="ui segment"> */}
                  {/* <img
                    className="ui small circular left image"
                    src="https://picsum.photos/200/200"
                  />
                  <div className="ui hidden divider"></div>
                  <span>
                    <h3>
                      John Doe <i className="angle down icon"></i>
                    </h3>
                  </span> */}
                  {/* </div> */}
                </div>

                <div className="item">
                  <span>
                    <h3>Actors</h3>
                    <div className="ui hidden divider"></div>
                  </span>
                  <select
                    className="ui dropdown "
                    value={this.state.selectedActor}
                    onChange={this.handleSelection}
                    style={{ height: "auto" }}
                  >
                    <option value="">---Select Actor---</option>
                    {this.renderOptions()}
                  </select>
                </div>
                {/* <Link to="/streams/new" className="item">
                  Input
                </Link>

                <Link to="/streams/edit" className="item">
                  Tracking
                </Link>

                <Link to="/streams/list" className="item">
                  Updates
                </Link> */}
              </div>
            </div>
            <div className="twelve wide stretched column">
              <div className="pusher">
                <div className="" style={{ marginTop: "20px" }}>
                  {/* <Header /> */}
                  {/* <Switch>
                    <Route path="/" exact component={NoticeUpdates} />
                    <Route path="/streams/new" exact component={AddNotice} />
                    <Route path="/streams/edit" exact component={TrackNotice} />
                    <Route
                      path="/streams/list"
                      exact
                      component={NoticeUpdates}
                    />
                  </Switch> */}
                  <DashboardContainer />
                </div>
              </div>
            </div>
          </Router>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isActive: state.requestStatus == REQUEST_PENDING,
    actors: state.actors,
    // isActive: true,
  };
};

export default connect(mapStateToProps, {
  getAllActors,
  getActor,
  getActorMetrics,
  getPsychoMetadata,
  clearCurrentActor,
})(App);
