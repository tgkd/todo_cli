import React, {Component} from 'react';
import DatePicker from '../DatePicker';
import moment from 'moment';

export default class extends Component {
  constructor(props) {
    super(props);
    const now = moment();
    this.state = {
      title: '',
      end: now.locale('ru').format('D MMMM YYYY'),
      done: false,
      calendarVisible: false,
      formattedDate: now,
      error: false,
      errorMessage: ''
    };
  }

  toggleCalendar() {
    this.setState({
      calendarVisible: !this.state.calendarVisible
    });
  }

  isValidInput() {
    const { title, formattedDate } = this.state;
    const TaskTitle = title.trim();
    return !((TaskTitle.length === 0 ) || !formattedDate.isValid());
  }

  createTask() {
    const { title, done, formattedDate } = this.state;
    let date = formattedDate.format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z';
    const taskTitle = title.trim();
    const newTask = {
      title: taskTitle,
      end: date,
      done
    };
    if (this.isValidInput()) {
      this.props.createHandler(newTask);
      this.setState({
        title: ''
      });
    } else {
      this.setState({
        title: '',
        error: true,
        errorMessage: 'Укажите название задачи'
      });
    }
  }

  setTaskTitle(e) {
    this.setState({
      title: e.target.value,
      error: false
    });
  }

  setDate(date) {
    const endDate = date.locale('ru').format('D MMMM YYYY');
    this.setState({
      calendarVisible: false,
      end: endDate,
      formattedDate: date
    });
  }

  getInputClass() {
    let { error } = this.state;
    let { apiError } = this.props;
    return `input ${error || apiError ? 'input--red' : 'input--blue'} tasks-container__input`;
  }

  render() {
    const { title, calendarVisible, end, error, errorMessage, formattedDate } = this.state;
    return (
      <div className='row middle-xs middle-sm middle-md'>
        <div className='col-xs-12 col-sm-10 col-md-10'>
          <div className='input-container'>
            <input type='text'
                   className={::this.getInputClass()}
                   onChange={::this.setTaskTitle}
                   placeholder={error ? errorMessage : 'Новое дел'}
                   value={title}/>
            <div
              className="input-container__img tasks-container__datepicker row middle-xs middle-sm middle-md end-xs end-sm end-md"
              onClick={::this.toggleCalendar}>
              <span className='input-container__date'>{end}</span>
              <svg
                className='input-container__calendar-ico'
                width="18" height="20" viewBox="0 0 18 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>8F18FF8D-0089-4998-AECB-EA32DEACFFFF</title>
                <path
                  d="M16 2h-1V0h-2v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H2V7h14v11zM4 9h5v5H4V9z"
                  fill="#566394"/>
              </svg>
            </div>
            {calendarVisible &&
            <DatePicker toggleCalendar={::this.toggleCalendar} date={formattedDate} setDate={::this.setDate}/>}
          </div>
        </div>
        <div className='col-xs-12 col-sm-2 col-md-2'>
          <button className='btn btn-default btn--greyblue tasks-container__btn-add' onClick={::this.createTask}>
            Добавить
          </button>
        </div>
      </div>
    );
  }
}