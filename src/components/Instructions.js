import React, { Component } from "react";
import queryString from "query-string";
import StudentController from "../controllers/StudentController";

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInstructions: true
    };
  }

  renderElements(targetSelectors, delay, incrementDelayBy) {
    for (let i = 0; i < targetSelectors.length; i++) {
      targetSelectors[i].classList.add("-animate");
    }

    targetSelectors.forEach((arrayElement, index) => {
      setTimeout(function() {
        targetSelectors[index].className += " -fade-in";
      }, (delay += incrementDelayBy));
    });
  }

  async componentWillMount() {
    const params = queryString.parse(window.location.search);
    console.log(params);

    let validateCreateStudent = await StudentController.validateCreateStudent(
      params
    );

    if (validateCreateStudent) {
    }

    console.log(this.state.displayInstructions);
    if (this.state.displayInstructions) {
      let overlay = document.getElementsByClassName("overlay"),
        entries = [];
      //   date = new Date(),
      //  today = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      //  TODO: get list of default estimates and validate instructions
      setTimeout(function() {
        overlay[0].classList.add("-animate");
        if (entries.length < 1) {
          overlay[0].classList.add("-isActive");
          setTimeout(function() {
            document
              .getElementsByClassName("modal")[0]
              .classList.add("-isAnimated");
          }, 50);
        }
      }, 350);
    }
  }

  componentDidMount() {
    if (!this.state.displayInstructions) {
      let targetSelectors = Array.from(
          document.querySelectorAll(".estimate-list > .list-item")
        ),
        delay = 300,
        incrementDelayBy = 150,
        estimateList = Array.from(document.querySelectorAll(".estimate-list"));
      setTimeout(function() {
        estimateList[0].classList.add("-animate");
      }, delay);
      this.renderElements(targetSelectors, delay, incrementDelayBy);
    }
  }

  modalFadeout = () => {
    let overlay = document.getElementsByClassName("overlay -isActive");
    overlay[0].classList.remove("-isActive");

    //renderEstimates
    document
      .getElementsByClassName("estimate-list")[0]
      .classList.add("-animate");
    let targetSelectors = document.querySelectorAll(
        ".estimate-list > .list-item"
      ),
      delay = 500,
      incrementDelayBy = 250;

    this.renderElements(targetSelectors, delay, incrementDelayBy);
  };

  importAllImages = r => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  instructionModule = e => {
    let button = e.target,
      direction = button.getAttribute("data-value"),
      currentActive = document.getElementsByClassName(
        "slide-container -isActive"
      ),
      next = currentActive[0].nextSibling,
      prev = currentActive[0].previousSibling,
      buttonContainer = document.getElementsByClassName("button-container"),
      backButton = document.getElementsByClassName("-back");

    if (direction > 0) {
      if (next.nextSibling === null) {
        //last slide use case
        let targetSelectors = Array.from(
            document.querySelectorAll(".estimate-list > .list-item")
          ),
          delay = 300,
          incrementDelayBy = 150;
        this.modalFadeout();
        this.renderElements(targetSelectors, delay, incrementDelayBy);
      } else {
        currentActive[0].classList.remove("-isActive");
        next.classList.add("-isActive");
        if (buttonContainer[0].className.indexOf("-right") !== 0) {
          buttonContainer[0].classList.remove("-right");
          backButton[0].classList.remove("-hidden");
        }
      }
    } else {
      currentActive[0].classList.remove("-isActive");
      prev.classList.add("-isActive");
      if (prev.previousSibling === null || prev.previousSibling === undefined) {
        backButton[0].classList.add("-hidden");
        buttonContainer[0].classList.add("-right");
      }
    }
  };

  render() {
    const images = this.importAllImages(
      require.context("../assets/images", false, /\.(png|jpe?g|svg)$/)
    );
    return (
      <div className="overlay">
        <div className="modal -instructions">
          <div className="slide-container -isActive">
            <img src={images["step1.png"]} alt="" className="slide-image" />
            <p className="description">
              Step 1: Estimate how much time you think you spend on your
              “everyday” activities.
            </p>
          </div>
          <div className="slide-container">
            <img src={images["step2.png"]} alt="" className="slide-image" />
            <p className="description">
              Step 2: For 7 days, log how you spend your time. For example, if
              you spend an evening watching TV, you would log that time as
              “Entertainment.”
            </p>
          </div>
          <div className="slide-container">
            <img src={images["step3.png"]} alt="" className="slide-image" />
            <p className="description">
              Step 3: Get your results. See how your estimates match up with
              your actual time usage for the week.
            </p>
          </div>
          <div className="slide-container">
            <img src={images["step4.png"]} alt="" className="slide-image" />
            <p className="description">
              Step 4: Reflect. Use your results to answer a few short questions
              about how you spend your time.
            </p>
          </div>
          <div className="slide-container">
            <img src={images["step5.png"]} alt="" className="slide-image" />
            <p className="description">
              Step 5: Submit your reflection and come to the next Live Session
              ready to discuss your results to get credit for the assignment.
            </p>
          </div>
          <div className="button-container -instructions -right">
            <button
              className="btn -back -hollow -hidden"
              data-value="-1"
              onClick={this.instructionModule}
            >
              Back
            </button>
            <button
              className="btn -next -filled-modalButton"
              data-value="1"
              onClick={this.instructionModule}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Instructions;
