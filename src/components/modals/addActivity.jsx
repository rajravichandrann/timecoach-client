/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from 'react';

class AddActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            addActivity: true,
        }
    }

    componentDidMount = () => {
        let overlay = document.querySelectorAll('.overlay.-add-activity')[0],
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
            stringMo = month[date.getMonth() +1];

        overlay.classList.add('-animate');
        if(this.state.addActivity) {
            let activityOverlay = [].slice.call(document.querySelectorAll('.overlay.-add-activity')),
                modalContent = activityOverlay[0].children[0],
                modalTitle = modalContent.children[0],
                target = document.querySelectorAll('.-addTime.-isActive'),
                date = new Date();

            if(target !== undefined || target.length) {
                activityOverlay[0].classList.add('-animate');
                activityOverlay[0].classList.add('-isActive');
                modalTitle.innerText = stringDay + ' ' + stringMo + ', ' + date.getDay(); 
                setTimeout( function() {
                    modalContent.classList.add('-isAnimated');
                }, 50);
            } else {
                console.warn('target not set');
            }
        }
    }

    closeModal = () => {
        let overlay = document.querySelectorAll('.overlay.-isActive'),
            value = 1;

        overlay[0].classList.remove('-isActive');
        setTimeout(() => {
            overlay[0].classList.remove('-animate');
            overlay[0].children[0].classList.remove('-isAnimated');
        }, 300);
        
        // this.props.childCall(value);
    }

    setActivity = (e) => {
        if(e.target.className.indexOf('-isActive') < 0) {
            e.target.classList.add('-isActive');
        } else {
            e.target.classList.remove('-isActive');
        }
    }

    renderActivities = (props) => {
        let activityEle = document.querySelectorAll('.list-item.-isActive'),
            savedData = [];

        if(this.state.setActivity) {
            this.closeModal();
            let prevActivities = JSON.parse(window.localStorage.getItem('unsavedActivities'));

            // remove local storage parameters
            localStorage.removeItem('unsavedActivities');

            for(let v = 0; v < activityEle.length; v++) {
                prevActivities.push(activityEle[v].dataset['name']);
                activityEle[v].classList.remove('-isActive');
            }
            console.log('previous activities', prevActivities);

            localStorage.setItem('unsavedActivities', JSON.stringify(prevActivities));
            this.props.refresh(prevActivities);
            this.props.childCall(true);

        } else {
            this.setState({setActivity: true});
            this.closeModal();
            for(let i = 0; i < activityEle.length; i++) {
                savedData.push(activityEle[i].dataset['name']);
                activityEle[i].classList.remove('-isActive');
            }

            //save this data to localStorage
            window.localStorage.setItem('unsavedActivities', JSON.stringify(savedData));
            this.props.refresh(savedData);
            this.props.childCall(true);
        }
    }

    render() {
        return (
            <div className="overlay -add-activity">
                <div className="modal">
                    <h3 className="list-title -date"></h3>
                    <div className="close" onClick={this.closeModal.bind(this)}></div>
                    <div className="activity-container">
                        <ul className="activity-list">
                            <li className="list-item -list-subTitle">Activities</li>
                            <li className="list-item -sleep" data-name="Sleep" onClick={this.setActivity.bind(this)}>Sleep</li>
                            <li className="list-item -school" data-name="School and homework" onClick={this.setActivity.bind(this)}>School and homework</li>
                            <li className="list-item -job" data-name="Job" onClick={this.setActivity.bind(this)}>Job</li>
                            <li className="list-item -social" data-name="Social Media" onClick={this.setActivity.bind(this)}>Social</li>
                            <li className="list-item -tv" data-name="Watching TV" onClick={this.setActivity.bind(this)}>Watching TV</li>
                            <li className="list-item -exercise" data-name="Exercise" onClick={this.setActivity.bind(this)}>Exercise</li>
                            <li className="list-item -misc" data-name="Misc" onClick={this.setActivity.bind(this)}>Misc</li>
                        </ul>
                    </div>
                    <div className="button-container -add-activity -right">
                        <button className="btn -next -filled-modalButton" onClick={this.renderActivities.bind(this)}>Done</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddActivity;