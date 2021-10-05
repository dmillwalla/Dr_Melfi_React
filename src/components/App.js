import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import { Link } from "react-router-dom";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui grid">
      <Router history={history}>
        <div className="four wide column">
          <div className="ui left fixed vertical menu">
            <div className="item">
              {/* <div className="ui segment"> */}
              <img
                className="ui mini circular left image"
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
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit" exact component={StreamEdit} />
                <Route path="/streams/list" exact component={StreamList} />
                <Route
                  path="/streams/delete/:id"
                  exact
                  component={StreamDelete}
                />
                <Route path="/streams/:id" exact component={StreamShow} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
