import React from 'react';

import cs from 'classnames';
import moment from 'moment';
import 'moment-range';

import DaysView from './day-view';

class Calendar extends React.Component {
  constructor(props, context) {
    super(props, context);

    const date = props.date ? moment(this.toDate(props.date)) : null;
    const minDate = props.minDate ? moment(this.toDate(props.minDate)) : null;
    const maxDate = props.maxDate ? moment(this.toDate(props.maxDate)) : null;
    const format = props.format || 'MM-DD-YYYY';
    const minView = parseInt(props.minView, 10) || 0;
    const computableFormat = props.computableFormat || 'MM-DD-YYYY';
    const strictDateParsing = props.strictDateParsing || false;
    const parsingFormat = props.parsingFormat || format;

    this.state = {
      date,
      minDate,
      maxDate,
      format,
      computableFormat,
      inputValue: date ? date.format(format) : undefined,
      minView,
      currentView: minView || 0,
      isVisible: false,
      strictDateParsing,
      parsingFormat
    }
  }

  toDate(date) {
    return date instanceof Date ? date : new Date(date)
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
  }

  componentWillReceiveProps(nextProps) {
    let newState = {
      date: nextProps.date ? moment(this.toDate(nextProps.date)) : this.state.date,
      inputValue:
        nextProps.date ? moment(this.toDate(nextProps.date)).format(this.state.format) : null,
    };

    if (nextProps.disabled === true) {
      newState.isVisible = false
    }

    this.setState(newState)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
  }

  changeDate(e) {
    this.setState({ inputValue: e.target.value })
  };

  checkIfDateDisabled(date) {
    return date && this.state.minDate && date.isBefore(this.state.minDate, 'day')
      || date && this.state.maxDate && date.isAfter(this.state.maxDate, 'day')
  }

  documentClick(e) {
    if (!this.state.isCalendar) {
      this.setVisibility(false)
    }
    this.setState({ isCalendar: false })
  }

  inputBlur(e) {
    let newDate = null;
    let computableDate = null;
    const date = this.state.inputValue;
    const format = this.state.format;
    const parsingFormat = this.state.parsingFormat;

    if (date) {
      newDate = moment(date, parsingFormat, true);
      if (!newDate.isValid() && !this.props.strictDateParsing) {
        let d = new Date(date);
        if (isNaN(d.getTime())) {
          d = new Date()
        }
        newDate = moment(d)
      }

      computableDate = newDate.format(this.state.computableFormat)
    }

    this.setState({
      date: newDate,
      inputValue: newDate ? newDate.format(format) : null
    });

    if (this.props.onChange) {
      this.props.onChange(computableDate)
    }

    if (this.props.onBlur) {
      this.props.onBlur(e, computableDate)
    }
  }

  inputFocus(e) {
    if (this.props.openOnInputFocus) {
      this.toggleClick();
    }

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  nextView = () => {
    if (this.checkIfDateDisabled(this.state.date)) {
      return;
    }
    this.setState({
      currentView: ++this.state.currentView
    })
  };

  prevView = date => {
    let newDate = date;
    if (this.state.minDate && date.isBefore(this.state.minDate, 'day')) {
      newDate = this.state.minDate.clone();
    }

    if (this.state.maxDate && date.isAfter(this.state.maxDate, 'day')) {
      newDate = this.state.maxDate.clone();
    }

    if (this.state.currentView === this.state.minView) {
      this.setState({
        date: newDate,
        inputValue: date.format(this.state.format),
        isVisible: false
      });
      if (this.props.onChange) {
        this.props.onChange(date.format(this.state.computableFormat))
      }
    } else {
      this.setState({
        date,
        currentView: --this.state.currentView
      })
    }
  };

  setDate = (date, isDayView = false) => {
    if (this.checkIfDateDisabled(date)) return;

    this.setState({
      date,
      inputValue: date.format(this.state.format),
      isVisible: this.props.closeOnSelect
      && isDayView ? !this.state.isVisible : this.state.isVisible
    });

    if (this.props.onChange) {
      this.props.onChange(date.format(this.state.computableFormat))
    }
  };

  setVisibility(val) {
    const value = val !== undefined ? val : !this.state.isVisible;

    if (this.state.isVisible !== value && !this.props.disabled) {
      this.setState({ isVisible: value })
    }
  }
  calendarClick = () => {
    this.setState({ isCalendar: true })
  };

  todayClick = () => {
    const today = moment().startOf('day');

    if (this.checkIfDateDisabled(today)) {
      return;
    }
    this.setState({
      date: today,
      inputValue: today.format(this.state.format),
      currentView: this.state.minView
    });

    if (this.props.onChange) {
      this.props.onChange(today.format(this.state.computableFormat))
    }
  };

  toggleClick() {
    this.setState({ isCalendar: true });
    this.setVisibility()
  }

  render() {
    let calendarDate = this.state.date || moment();
    let view = <DaysView
      date={calendarDate}
      nextView={this.nextView}
      maxDate={this.state.maxDate}
      minDate={this.state.minDate}
      setDate={this.setDate}
    />;

    let todayText = this.props.todayText || (moment.locale() === 'de' ? 'Heute' : 'Today');
    let calendarClass = cs({
      'input-calendar-wrapper': true,
      'icon-hidden': this.props.hideIcon
    });

    let calendar = !this.state.isVisible || this.props.disabled ? '' :
      <div className={calendarClass} onClick={this.calendarClick}>
        {view}
        <span
          className={
            `today-btn${this.checkIfDateDisabled(moment().startOf('day')) ? ' disabled' : ''}`
          }
          onClick={this.todayClick}>
          {todayText}
        </span>
      </div>;

    let calendarIcon = this.props.hideIcon || this.props.disabled ? '' :
        <span className="icon-wrapper calendar-icon" onClick={this.toggleClick} >
          <img src="/assets/calendar-ico.svg" alt="calendar"/>
        </span>;

    const inputClass = this.props.inputFieldClass || 'input-calendar-field';

    return (
      <div className="input-calendar">
        <input
          name={this.props.inputName}
          className={inputClass}
          onBlur={this.inputBlur}
          onChange={this.changeDate}
          onFocus={this.inputFocus}
          placeholder={this.props.placeholder}
          type="text"
          value={this.state.inputValue || ''}
        />
        {calendarIcon}
        {calendar}
      </div>
    )
  }
}

export default Calendar;