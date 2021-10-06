import React from "react";
import { connect } from "react-redux";
import { getNoticeUpdates } from "../../actions";
import { REQUEST_PENDING } from "../../actions/types";

class AddNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice_id: "",
    };
  }

  onSubmit = () => {
    this.props.getNoticeUpdates(this.state.notice_id);
  };

  handleNoticeChange = (event) => {
    this.setState({ notice_id: event.target.value });
  };

  renderNotices() {
    if (this.props.requestStatus == REQUEST_PENDING) {
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

    return (
      <React.Fragment>
        {this.props.notices.map((notice) => {
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
        })}
      </React.Fragment>
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

  render() {
    return (
      <div>
        <div className="ui container form">
          <div className="inline field">
            <input
              type="text"
              value={this.state.notice_id}
              onChange={this.handleNoticeChange}
            />
            <button className="ui blue right button" onClick={this.onSubmit}>
              Add Notice
            </button>
          </div>
        </div>
        {/* <div className="ui container segment">
          <div className="ui items"></div>
          <div className="item">
            <div className="ui grid">
              <div className="row">
                <div className="ten wide column">
                  <div className="content">
                    <a className="header">Mass Emergency Notification System</a>
                    <div className="meta">
                      Mass and Targeted Emergency Notification System for
                      Emergency Notification, and Personnel Accountability. The
                      system will support 500 Personnel, must be web-enabled
                      using a net-centric approach to leverage existing IT
                      infrastructures.
                    </div>
                  </div>
                </div>
                <div className="three wide column">
                  <div className="content">
                    <h4 className="header">Agency:</h4>
                    <div className="meta">Department of Defense</div>
                  </div>
                  <div class="ui hidden divider"></div>
                  <div className="content">
                    <h4 className="header">Subagency:</h4>
                    <div className="meta">Department of the Navy</div>
                  </div>
                </div>
                <div className="three wide column">
                  <div className="content">
                    <h4 className="header">Office:</h4>
                    <div className="meta">XYZ Office Name</div>
                  </div>
                  <div className="ui hidden divider"></div>
                  <div className="content">
                    <h4 className="header">Type:</h4>
                    <div className="meta">Sources Sought</div>
                  </div>
                </div>
              </div>
              <div class="ui divider" style={{ width: "100%" }}></div>
              <div className="row">
                <div className="two wide column">
                  <div className="content">
                    <h4 className="header">Notice Id:</h4>
                    <div className="meta">XXXXXXXX</div>
                  </div>
                </div>
                <div className="four wide column">
                  <div className="content">
                    <h4 className="header">Solicitation Number:</h4>
                    <div className="meta">FA5270-16-Q-0020</div>
                  </div>
                </div>
                <div className="three wide column">
                  <div className="content">
                    <h4 className="header">Posted Date:</h4>
                    <div className="meta">1/1/2020</div>
                  </div>
                </div>
                <div className="three wide column">
                  <div className="content">
                    <h4 className="header">Deadline:</h4>
                    <div className="meta">1/1/2020</div>
                  </div>
                </div>
                <div className="two wide column">
                  <div className="content">
                    <h4 className="header">NAICS:</h4>
                    <div className="meta">517410</div>
                  </div>
                </div>
                <div className="two wide column">
                  <div className="content">
                    <h4 className="header">Set Aside:</h4>
                    <div className="meta">8(a)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {this.renderNotices()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notices: Object.values(state.notices),
    requestStatus: state.requestStatus,
  };
};

export default connect(mapStateToProps, { getNoticeUpdates })(AddNotice);
