/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

class ActivityList extends Component {
    constructor(props) {
        super(props);
    }

    renderElements = (targetSelectors, delay, incrementDelayBy) => {

        for(let i = 0; i < targetSelectors.length; i++) {
            targetSelectors[i].classList.add('-animate');
        }
        
        targetSelectors.forEach((arrayElement, index) => {
            setTimeout(function(){
                targetSelectors[index].className  += ' -fade-in';
           }, delay += incrementDelayBy);
        });
    }

    componentDidMount = () => {

        setTimeout(function() {
            let targetSelectors = document.querySelectorAll('.activities > .list-item'),
                delay = 0,
                incrementDelayBy = 200;

            for(let i = 0; i < targetSelectors.length; i++) {
                targetSelectors[i].classList.remove('-hidden');
                targetSelectors[i].classList.add('-animate');
            }
            
            targetSelectors.forEach((arrayElement, index) => {
                setTimeout(function(){
                    targetSelectors[index].className  += ' -fade-in';
               }, delay += incrementDelayBy);
            });
        },250);
    }

    deleteActivity = () => {
        console.log('delete this activity');
    }

    render() {
        const activityArray = this.props.list;
        return (
            <div className="logged-activities">
                <ul id="activity-list" className="activities -hidden">
                    {activityArray.map(i => {
                        return <li className="list-item -activity -new -hidden" key={i}><span className="col-sm-6 name">{i}</span><span className="col-sm-6 add-activity -addTime" data-hour="" data-min="" data-date="" data-title={i} onClick={this.props.addTime}>Add Time</span><span className="delete" onClick={this.deleteActivity.bind(this)}></span></li>
                    })}
                </ul>
            </div>
        );
    }
}
export default ActivityList;