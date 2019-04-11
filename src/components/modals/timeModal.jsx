/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import moment from "moment";

class TimeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderTimeModal: true
    };
  }
  componentDidMount = () => {
    if (this.state.renderTimeModal) {
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

  isValidDate = dateString => {
    console.log(dateString);
    let dateArray = dateString.split("/"),
      passedYear = dateArray[0],
      currentYear = moment().year();
    // First check for the pattern

    if (
      dateString.match(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/)
    ) {
      if (
        parseInt(passedYear) < currentYear ||
        parseInt(passedYear) > currentYear
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  dateUpdate = e => {
    if (!this.isValidDate(e.target.value)) {
      e.target.classList.add("-hasError");
      e.target.nextSibling.classList.add("-isVisible");
    } else {
      if (e.target.className.indexOf("-hasError") > 0) {
        e.target.classList.remove("-hasError");
        e.target.classList.add("-isValid");
        e.target.nextSibling.classList.remove("-isVisible");
      }
    }
  };

  saveTime = () => {
    let minutes = document.querySelectorAll(".min-input")[0].value,
      hours = document.querySelectorAll(".hour-input")[0].value,
      activeEstimate = document.querySelectorAll(".-addTime.-isActive"),
      overlay = document.querySelectorAll(".overlay.-activity-time");

    console.log("calling create estimate");

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
            <ul className="col-sm-12 time-list -minute-list">
              <li className="list-item -title">
                <label htmlFor="date">Date</label>
              </li>
              <li className="list-item -date">
                <input
                  id="date"
                  type="date"
                  className="date-input"
                  name="activityDate"
                  placeholder="MM/DD/YYYY"
                  onBlur={this.dateUpdate.bind(this)}
                />
                <span className="error-msg">
                  the date must fall within the current year and 7 days from
                  your estimate date.
                </span>
              </li>
            </ul>
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

export default TimeModal;
