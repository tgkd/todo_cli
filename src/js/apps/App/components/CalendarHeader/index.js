import Moment from 'moment';
import React, { Component } from 'react';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
export default class CalendarHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { month, year, previousMonth, nextMonth } = this.props;


    return (
      <div>
        <div className='row center-sm center-xs center-md'>
          <div className='col-xs-1 col-sm-1 col-md-1'>
            <a href='#' className='calendar-container__nav calendar-container__nav--previous' onClick={ previousMonth }>
              <span className='fa fa-angle-left'/>
            </a>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-3'>
            <span className='calendar-container__selected-date'>{ moment().month(month).format('MMMM') } { year }</span>
          </div>
          <div className='col-xs-1 col-sm-1 col-md-1'>
            <a href='#' className='calendar-container__nav calendar-container__nav--next' onClick={ nextMonth }>
              <span className='fa fa-angle-right'/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}