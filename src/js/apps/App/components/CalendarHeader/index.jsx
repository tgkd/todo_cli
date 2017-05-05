import moment from 'moment';
import React, { Component } from 'react';

export default class CalendarHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { month, year, previousMonth, nextMonth } = this.props;

    return (
      <div>
        <div className='row center-xs calendar-container__month'>
          <div className='col-xs-1'>
            <a href='#' className='calendar-container__nav calendar-container__nav--previous' onClick={ previousMonth }>
              <span className='fa fa-angle-left'/>
            </a>
          </div>
          <div className='col-xs-5 col-sm-4 col-md-3 calendar-container__month-name'>
            <span className='calendar-container__selected-date'>{ moment().locale('ru').month(month).format('MMMM') } { year }</span>
          </div>
          <div className='col-xs-1'>
            <a href='#' className='calendar-container__nav calendar-container__nav--next' onClick={ nextMonth }>
              <span className='fa fa-angle-right'/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}