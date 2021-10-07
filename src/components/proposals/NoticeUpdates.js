import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import {
  getSolicitationUpdates,
  getPreferences,
  getNoticeUpdates,
} from "../../actions";
import { REQUEST_PENDING } from "../../actions/types";

class NoticeUpdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedNotice: "" };
  }

  componentDidMount() {
    // this.props.getSolicitationUpdates();
    this.props.getPreferences("def_pref");
  }

  renderLoader() {
    return (
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  renderEachProposal(proposalObj) {
    console.log(proposalObj.row_id);
    const title = proposalObj.Title || "N/A";
    const desc = proposalObj.Description || "N/A";
    const dept = proposalObj.Dept || "N/A";
    const subTier = proposalObj.SubTier || "N/A";
    const office = proposalObj.Office || "N/A";
    const type = proposalObj.Type || "N/A";
    const noticeId = proposalObj.NoticeId || "N/A";
    const solNum = proposalObj.SolNum || "N/A";
    const postedDate = proposalObj.PostedDate || "N/A";
    const deadline = proposalObj.Deadline || "N/A";
    const naicscode = proposalObj.naicscode || "N/A";
    const setAside = proposalObj.SetAside || "N/A";

    return (
      <div className="ui grid">
        <div className="row">
          <div className="ten wide column">
            <div className="content">
              <a className="header">{title}</a>
              <div className="meta">{desc}</div>
            </div>
          </div>
          <div className="three wide column">
            <div className="content">
              <h4 className="header">Agency:</h4>
              <div className="meta">{dept}</div>
            </div>
            <div className="ui hidden divider"></div>
            <div className="content">
              <h4 className="header">Subagency:</h4>
              <div className="meta">{subTier}</div>
            </div>
          </div>
          <div className="three wide column">
            <div className="content">
              <h4 className="header">Office:</h4>
              <div className="meta">{office}</div>
            </div>
            <div className="ui hidden divider"></div>
            <div className="content">
              <h4 className="header">Type:</h4>
              <div className="meta">{type}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="four wide column">
            <div className="content">
              <h4 className="header">Notice Id:</h4>
              <div className="meta">{noticeId}</div>
            </div>
          </div>
          <div className="two wide column">
            <div className="content">
              <h4 className="header">Solicitation Number:</h4>
              <div className="meta">{solNum}</div>
            </div>
          </div>
          <div className="three wide column">
            <div className="content">
              <h4 className="header">Posted Date:</h4>
              <div className="meta">{postedDate}</div>
            </div>
          </div>
          <div className="three wide column">
            <div className="content">
              <h4 className="header">Deadline:</h4>
              <div className="meta">{deadline}</div>
            </div>
          </div>
          <div className="two wide column">
            <div className="content">
              <h4 className="header">NAICS:</h4>
              <div className="meta">{naicscode}</div>
            </div>
          </div>
          <div className="two wide column">
            <div className="content">
              <h4 className="header">Set Aside:</h4>
              <div className="meta">{setAside}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderChangeSummary(notice) {
    if (notice.SolNewDeadline) {
      return (
        <div>
          <a>Deadline</a> was changed to <a>{notice.Deadline}</a>
        </div>
      );
    }
  }

  renderUpdates() {
    console.log(this.props.notices);
    return this.props.notices.map((notice) => {
      return (
        <div className="ui container segment" key={notice.row_id}>
          <div className="ui items">
            <div className="item">
              {console.log(notice)}
              {this.renderEachProposal(notice)}
            </div>
          </div>
        </div>
      );
    });
  }

  handleSelection = (event) => {
    console.log(event.target.value);
    this.setState({ selectedNotice: event.target.value });
    this.props.getNoticeUpdates(event.target.value);
  };

  renderOptions() {
    if (
      this.props &&
      this.props.preferences &&
      this.props.preferences.notices
    ) {
      return this.props.preferences.notices.map((eachNoticeEl) => {
        return (
          <option value={eachNoticeEl} key={eachNoticeEl}>
            {eachNoticeEl}
          </option>
        );
      });
    }
  }

  render() {
    // if (!this.props.stream) {
    //   return <div>Loading...</div>;
    // }

    // if (this.props.requestStatus == REQUEST_PENDING) return <div></div>;

    // this.renderLoader();

    return (
      <div className="ui feed">
        <div className="ui container">
          <div class="ui massive horizontal list">
            <div className="item header">
              <a className="ui basic label massive" style={{ border: "none" }}>
                Updates
              </a>
            </div>
            <div className="item">
              <a
                className="ui basic label massive grey"
                style={{ border: "none" }}
              >
                Similar
              </a>
            </div>
            <div className="item">
              <select
                className="ui dropdown massive"
                value={this.state.selectedNotice}
                onChange={this.handleSelection}
                style={{ height: "auto" }}
              >
                <option value="">---Select Notice---</option>
                {this.renderOptions()}
              </select>
            </div>
          </div>
        </div>
        {this.renderUpdates()}
      </div>
    );

    // return <div></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.preferences);
  return {
    notices: Object.values(state.notices),
    requestStatus: state.requestStatus,
    preferences: state.preferences,
  };
};

export default connect(mapStateToProps, {
  getSolicitationUpdates,
  getPreferences,
  getNoticeUpdates,
})(NoticeUpdates);
