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
import LoadingOverlay from "react-loading-overlay";

const App = (props) => {
  console.log(props);
  return (
    <LoadingOverlay
      active={props.isActive}
      spinner
      text="Loading..."
      styles={{
        wrapper: {
          height: "100%",
        },
      }}
    >
      <div className="ui grid" style={{ height: "100%" }}>
        <Router history={history}>
          <div className="four wide column">
            {/* <div className="ui vertical left fixed  menu"> */}
            <div
              className="ui vertical fluid tabular menu"
              style={{ height: "100%" }}
            >
              <div className="item">
                {/* <div className="ui segment"> */}
                <img
                  className="ui small circular left image"
                  src="https://picsum.photos/200/200"
                />
                <div className="ui hidden divider"></div>
                <span>
                  <h3>
                    John Doe <i className="angle down icon"></i>
                  </h3>
                </span>
                {/* </div> */}
              </div>
              <Link to="/streams/new" className="item">
                Input
              </Link>

              <Link to="/streams/edit" className="item">
                Tracking
              </Link>

              <Link to="/streams/list" className="item">
                Updates
              </Link>
            </div>
          </div>
          <div className="twelve wide stretched column">
            <div className="pusher">
              <div className="" style={{ marginTop: "20px" }}>
                {/* <Header /> */}
                <Switch>
                  <Route path="/" exact component={NoticeUpdates} />
                  <Route path="/streams/new" exact component={AddNotice} />
                  <Route path="/streams/edit" exact component={TrackNotice} />
                  <Route path="/streams/list" exact component={NoticeUpdates} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => {
  return {
    isActive: state.requestStatus == REQUEST_PENDING,
    // isActive: true,
  };
};

export default connect(mapStateToProps)(App);
