/* eslint-disable no-useless-escape */
import React, { Component } from "react";

import EstimateController from "../../controllers/EstimateController";

class TimeModalEstimate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderTimeModalEstimate: true
    };
  }
  componentDidMount = () => {
    if (this.state.renderTimeModalEstimate) {
      let estimateOverlay = [].slice.call(
          document.querySelectorAll(".overlay.-activity-time")
        ),
        modalContent = estimateOverlay[0].children[0],
        modalTitle = modalContent.children[0],
        target = document.querySelectorAll(".-addTime.-isActive");

      if (target !== undefined || target.length) {
        estimateOverlay[0].classList.add("-animate");
        estimateOverlay[0].classList.add("-isActive");
        modalTitle.innerText = target[0].dataset["title"];
        modalTitle.focus();
        setTimeout(function() {
          modalContent.classList.add("-isAnimated");
        }, 50);
      } else {
        console.warn("target not set");
      }
    }
  };

  timeUpdate = () => {
    let setHour = document.querySelectorAll(".hour-input")[0].value,
      setMin = document.querySelectorAll(".min-input")[0].value,
      showHrs = document.querySelectorAll(".-hrs > .time")[0],
      savedHour = document.querySelectorAll(".-addTime.-isActive")[0].dataset[
        "hour"
      ],
      showMin = document.querySelectorAll(".-min > .time")[0],
      savedMin = document.querySelectorAll(".-addTime.-isActive")[0].dataset[
        "min"
      ],
      activeEstimate = document.querySelectorAll(".-addTime.-isActive")[0];

    if (savedHour !== "0" || savedHour !== "") {
      showHrs.innerText = savedHour;
    }
    if (savedMin !== "0" || savedMin !== "") {
      showMin.innerText = savedMin;
    }
    if (showHrs.innerText !== setHour && setHour !== "") {
      showHrs.innerText = setHour;
      activeEstimate.setAttribute("data-hour", setHour);
    } else if (showHrs.innerText !== setHour && setHour === "") {
      showHrs.innerText = "00";
    }
    if (showMin.innerText !== setMin && setMin !== "") {
      showMin.innerText = setMin;
      activeEstimate.setAttribute("data-min", setMin);
    } else if (showMin.innerText !== setMin && setMin === "") {
      showMin.innerText = "00";
    }
  };

  saveTime = () => {
    let minutes = document.querySelectorAll(".min-input")[0].value,
      hours = document.querySelectorAll(".hour-input")[0].value,
      activeEstimate = document.querySelectorAll(".-addTime.-isActive"),
      overlay = document.querySelectorAll(".overlay.-activity-time");

    console.log("calling create estimate");

    const estimate = {
      estimated_date: "2019-04-20",
      activity_name: "Studies",
      activity_id: 1,
      student_email: "gaurav.shinde@wgu.edu",
      student_id: "f09204b0-5d57-11e9-ac22-7d66d9f182fa",
      estimated_time: "02:00"
    };

    const createEstimate = EstimateController.validateCreateEstimate(estimate);
    console.log(createEstimate);

    if (minutes === "" && hours === "") {
      // TODO: add call to api to remove existing database entry if it was set before
      // TODO: verify that it was added using dispatcher.
      activeEstimate[0].setAttribute("data-hour", "");
      activeEstimate[0].setAttribute("data-min", "");
      if (activeEstimate[0].innerText !== "Add Time") {
        //make dispatch call here to delete previous entry.
        activeEstimate[0].innerText = "Add Time";
      }
    } else if (minutes < 1 && hours < 1) {
      // make dispatch call here to delete previous entry.
      activeEstimate[0].innerText = "Add Time";
    } else if (minutes !== "" && hours !== "") {
      activeEstimate[0].innerText = hours + " hrs " + minutes + " min";
    } else if (hours === "" && minutes !== "") {
      activeEstimate[0].innerText = minutes + " min";
    }

    activeEstimate[0].classList.remove("-isActive");
    overlay[0].classList.remove("-isActive");
    setTimeout(() => {
      overlay[0].classList.remove("-animate");
      overlay[0].children[0].classList.remove("-isAnimated");
    }, 300);
    document.getElementsByClassName("time-container")[0].reset();
  };

  closeModal = () => {
    let overlay = document.querySelectorAll(".-activity-time.-isActive");
    overlay[0].classList.remove("-isActive");
    setTimeout(() => {
      overlay[0].classList.remove("-animate");
      overlay[0].children[0].classList.remove("-isAnimated");
    }, 300);
  };

  render() {
    return (
      <div className="overlay -activity-time">
        <div className="modal">
          <h2 className="title">No Title Found</h2>
          <span className="close" onClick={this.closeModal.bind(this)} />
          <form className="row time-container -activities-form">
            <ul className="col-sm-6 time-list -hour-list">
              <li className="list-item -title">
                <label htmlFor="Hours">Hours</label>
              </li>
              <li className="list-item -hrs">
                <input
                  type="number"
                  className="hour-input"
                  id="hours"
                  name="hours"
                  placeholder="00"
                  onBlur={this.timeUpdate.bind(this)}
                />
              </li>
            </ul>
            <ul className="col-sm-6 time-list -minute-list">
              <li className="list-item -title">
                <label htmlFor="min">Minutes</label>
              </li>
              <li className="list-item -min">
                <input
                  type="number"
                  className="min-input"
                  id="min"
                  name="minutes"
                  placeholder="00"
                  onBlur={this.timeUpdate.bind(this)}
                />
              </li>
            </ul>
          </form>
          <div className="totals-container">
            <div className="total -hrs">
              <span className="time">00</span>hrs
            </div>
            <div className="total -min">
              <span className="time">00</span>min
            </div>
            <div className="button-container -estimates">
              <button
                className="btn -hollow -white -submit"
                onClick={this.saveTime.bind(this)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeModalEstimate;
