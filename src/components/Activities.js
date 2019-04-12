import React, { Component } from "react";
import TimeModal from "../components/modals/timeModal";
import ActivityList from "../components/modals/activityList";
import ActivityModal from "../components/modals/addActivity";

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "empty",
      renderActivityList: false,
      activityList: [],
      addActivity: false,
      data: true
    };

    this.addActivityToList = this.addActivityToList.bind(this);
    this.addTime = this.addTime.bind(this);
  }

  componentDidMount = () => {
    let date = new Date(),
      activities = [
        //     {
        //         "estimated_date": "2019-02-06",
        //         "activity_name": "Eat",
        //         "student_email": "zach.manning@wgu.edu",
        //         "updatedAt": "2019-02-06 16:55:43",
        //         "logged_time": "01:15",
        //         "student_id": "8423a460-2958-11e9-8af5-27c9d9e924af",
        //         "activities_id": "0a3f2ce0-2a30-11e9-ad65-27ffa0362f25",
        //         "activity_id": 7
        //     }
      ];

    let activityLength = this.sizeObject(activities);
    if (activityLength) {
      document
        .querySelectorAll(".empty-activities")[0]
        .classList.add("-hidden");
      this.setState({
        renderActivityList: true
      });

      // document.querySelectorAll('.logged-activities > .activities')[0].classList.remove('-hidden');
      setTimeout(function() {
        let activities = document.querySelectorAll(
          ".logged-activities > .activities"
        )[0];

        activities.classList.remove("-hidden");

        let targetSelectors = document.querySelectorAll(
            ".activities > .list-item"
          ),
          delay = 300,
          incrementDelayBy = 200;

        for (let i = 0; i < targetSelectors.length; i++) {
          targetSelectors[i].classList.add("-animate");
        }

        targetSelectors.forEach((arrayElement, index) => {
          setTimeout(function() {
            targetSelectors[index].className += " -fade-in";
          }, (delay += incrementDelayBy));
        });
      }, 300);
    } else {
      console.log("no entries made");
    }
  };

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

  sizeObject = obj => {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  addActivity = props => {
    console.log("addActivity Activities.jsx line 93");
    if (this.state.addActivity) {
      console.log("addActivityModal is set to true");
      let overlay = document.querySelectorAll(".overlay.-add-activity")[0],
        date = new Date(),
        weekday = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ],
        stringDay = weekday[date.getDay()],
        stringMo = month[date.getMonth() + 1];

      overlay.classList.add("-animate");
      let activityOverlay = [].slice.call(
          document.querySelectorAll(".overlay.-add-activity")
        ),
        modalContent = activityOverlay[0].children[0],
        modalTitle = modalContent.children[0],
        target = document.querySelectorAll(".-addTime.-isActive");

      if (target !== undefined || target.length) {
        activityOverlay[0].classList.add("-animate");
        activityOverlay[0].classList.add("-isActive");
        modalTitle.innerText =
          stringDay + " " + stringMo + ", " + date.getDay();

        setTimeout(function() {
          modalContent.classList.add("-isAnimated");
        }, 50);
      } else {
        console.warn("target not set");
      }
    } else {
      this.setState({
        addActivity: true
      });
    }
  };

  addTime = e => {
    let target = e.target;
    target.classList.add("-isActive");
    if (this.state.renderTimeModal) {
      console.log(
        "this.state.renderTimeModal was already set to true: addTime()"
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
      this.setState({ renderTimeModal: true }, () => {
        if (this.state.renderTimeModal) {
          console.log("true");
        }
      });
    }
  };

  activityList = () => {};

  refreshActivities = renderedList => {
    console.log("refreshActivities method", renderedList);
    this.setState({ renderedList });
  };

  addActivityToList = renderedList => {
    // console.log('the data passed to addActivityToList: ', data);
    if (renderedList) {
      this.setState({ renderActivityList: true }, () => {
        if (this.state.renderActivityList) {
          // remove hidden class from logged activities container
          document
            .querySelectorAll(".logged-activities > .activities")[0]
            .classList.remove("-hidden");
          let targetSelectors = document.querySelectorAll(
              ".activities > .list-item"
            ),
            delay = 0,
            incrementDelayBy = 150;

          for (let i = 0; i < targetSelectors.length; i++) {
            targetSelectors[i].classList.remove("-hidden");
            targetSelectors[i].classList.add("-animate");
          }

          targetSelectors.forEach((arrayElement, index) => {
            setTimeout(function() {
              targetSelectors[index].className += " -fade-in";
            }, (delay += incrementDelayBy));
          });
        }
      });
    }

    // Hide the empty activities container div.
    document.querySelectorAll(".empty-activities")[0].classList.add("-hidden");
  };

  render() {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    const stringDate = year + ", " + month + " " + day;

    return (
      <div className="app-container">
        <div className="activity-container">
          <div className="date-container">
            <span className="today">Today</span>
            <span className="date">{stringDate}</span>
          </div>
          <div className="button-container -activities">
            <button
              className="btn -large -blue"
              onClick={this.addActivity.bind(this)}
            >
              Add Activity
            </button>
          </div>
        </div>
        <div className="empty-activities">
          No activities. Let's get started!
        </div>
        {this.state.renderedList ? (
          <ActivityList addTime={this.addTime} list={this.state.renderedList} />
        ) : null}
        {this.state.addActivity ? (
          <ActivityModal
            childCall={this.addActivityToList}
            refresh={this.refreshActivities}
            list={this.state.activityList}
          />
        ) : null}
        {this.state.renderTimeModal ? <TimeModal /> : null}
      </div>
    );
  }
}

export default Activities;
