import React, { Component } from "react";
import TimeModalEstimate from "../components/modals/timeModalEstimate";

class Estimates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderTimeModalEstimate: false
    };
  }

  addTime(e) {
    let target = e.target;
    target.classList.add("-isActive");
    if (this.state.renderTimeModalEstimate) {
      console.log(
        "this.state.renderTimeModalEstimate was already set to true: addTime()"
      );
      let estimateOverlay = [].slice.call(
          document.querySelectorAll(".overlay.-activity-time")
        ),
        modalContent = estimateOverlay[0].children[0],
        modalTitle = modalContent.children[0],
        activeEstimate = document.querySelectorAll(".-addTime.-isActive"),
        hourInput = document.getElementsByClassName("hour-input"),
        savedHour = document.querySelectorAll(".-addTime.-isActive")[0].dataset[
          "hour"
        ],
        minInput = document.getElementsByClassName("min-input"),
        savedMin = document.querySelectorAll(".-addTime.-isActive")[0].dataset[
          "min"
        ];

      estimateOverlay[0].classList.add("-animate");
      estimateOverlay[0].classList.add("-isActive");
      modalTitle.innerText = target.dataset["title"];
      modalTitle.focus();

      if (savedMin !== 0 || savedMin !== "" || savedMin !== "0") {
        if (minInput[0].value === 0) {
          document.querySelectorAll(".-min > .time").innerText = "00";
          activeEstimate[0].setAttribute("data-min", "");
        } else {
          minInput[0].setAttribute("value", savedMin);
          document.querySelectorAll(".-min > .time")[0].innerText = savedMin;
        }
      }

      if (savedHour !== 0 || savedHour !== "" || savedHour !== "0") {
        if (hourInput[0].value === 0) {
          document.querySelectorAll(".-hrs > .time").innerText = "00";
          activeEstimate[0].setAttribute("data-hour", "");
        } else {
          hourInput[0].setAttribute("value", savedHour);
          document.querySelectorAll(".-hrs > .time")[0].innerText = savedHour;
        }
      }

      if (!savedHour.length) {
        document.querySelectorAll(".-hrs > .time")[0].innerText = "00";
      }

      if (!savedMin.length) {
        document.querySelectorAll(".-min > .time")[0].innerText = "00";
      }

      setTimeout(function() {
        modalContent.classList.add("-isAnimated");
      }, 150);
    } else {
      this.setState({
        renderTimeModalEstimate: true
      });
    }
  }

  renderElements = (targetSelectors, delay, incrementDelayBy) => {
    for (let i = 0; i < targetSelectors.length; i++) {
      targetSelectors[i].classList.add("-animate");
    }

    targetSelectors.forEach((arrayElement, index) => {
      setTimeout(function() {
        targetSelectors[index].className += " -fade-in";
      }, (delay += incrementDelayBy));
    });
  };

  componentDidMount() {
    setTimeout(() => {
      document
        .getElementsByClassName("estimate-list")[0]
        .classList.add("-animate");
    }, 100);

    //set animation parameters.
    let targetSelectors = document.querySelectorAll(
        ".estimate-list > .list-item"
      ),
      delay = 300,
      incrementDelayBy = 200;

    this.renderElements(targetSelectors, delay, incrementDelayBy);
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="page-title">Estimates</h1>
        <div className="paragraph-container">
          <p className="description">
            Don't worry about getting it perfect. This is a reflection exercise,
            not a science experiment.
          </p>
        </div>
        <div className="estimate-container">
          <div className="row title-container">
            <div className="row col-sm-7 title-wrap">
              <h3 className="-heading-3 -semi-bold col-sm-6">Activity</h3>
              <h3 className="-heading-3 -semi-bold col-sm-6 -right">
                Estimate Time
              </h3>
            </div>
          </div>
          <ul className="estimate-list">
            <li className="list-item" onClick={this.addTime.bind(this)}>
              <span className="col-sm-6 name">Sleep</span>
              <span
                className="col-sm-6 add-estimate -addTime"
                data-hour=""
                data-min=""
                data-id="1"
                data-title="Sleep"
              >
                Add Time
              </span>
            </li>
            <li className="list-item">
              <span className="col-sm-6 name">School and homework</span>
              <span
                className="col-sm-6 add-estimate -addTime"
                data-hour=""
                data-min=""
                data-id="2"
                data-title="School and Homework"
                onClick={this.addTime.bind(this)}
              >
                Add Time
              </span>
            </li>
            <li className="list-item">
              <span className="col-sm-6 name">Job</span>
              <span
                className="col-sm-6 add-estimate -addTime"
                data-hour=""
                data-min=""
                data-id="3"
                data-title="Job"
                onClick={this.addTime.bind(this)}
              >
                Add Time
              </span>
            </li>
            <li className="list-item">
              <span className="col-sm-6 name">Social Media</span>
              <span
                className="col-sm-6 add-estimate -addTime"
                data-hour=""
                data-min=""
                data-id="4"
                data-title="Social Media"
                onClick={this.addTime.bind(this)}
              >
                Add Time
              </span>
            </li>
            <li className="list-item">
              <span className="col-sm-6 name">TV</span>
              <span
                className="col-sm-6 add-estimate -addTime"
                data-hour=""
                data-min=""
                data-id="5"
                data-title="TV"
                onClick={this.addTime.bind(this)}
              >
                Add Time
              </span>
            </li>
            <li className="list-item">
              <span className="col-sm-6 name">Exercise</span>
              <span
                className="col-sm-6 add-estimate -addTime"
                data-hour=""
                data-min=""
                data-id="6"
                data-title="Exercise"
                onClick={this.addTime.bind(this)}
              >
                Add Time
              </span>
            </li>
            <li className="list-item">
              <span className="col-sm-6 name">Misc</span>
              <span
                className="col-sm-6 add-estimate -addTime"
                data-hour=""
                data-min=""
                data-id="7"
                data-title="Misc"
                onClick={this.addTime.bind(this)}
              >
                Add Time
              </span>
            </li>
          </ul>
          {this.state.renderTimeModalEstimate ? (
            <TimeModalEstimate student={this.props.student} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Estimates;
