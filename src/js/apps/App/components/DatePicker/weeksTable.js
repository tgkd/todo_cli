import React, {Component} from 'react';

export default class Weeks extends Component {
  constructor(props) {
    super(props);
  }

  setDate(day, e) {
    this.props.setDate(day, e);
  }

  render() {
    const { calendar, month, date } = this.props;
    let weeks = [];
    if (calendar) {
      weeks = calendar.map((week, id) => {
        let dayList = [];

        for (let day of week.by('days')) {
          dayList.push(day);
        }

        let days = dayList.map((day) => {
          let dayClasses = "calendar__day";
          if (!(day.month() === month)) {
            dayClasses += " calendar__day--muted";
          }
          if (day.format('DD-MM-YYYY') === date.format('DD-MM-YYYY')) {
            dayClasses += " calendar__day--selected";
          }
          return (
            <td className="calendar__cell" key={day.format('D-MM')}>
              <div className={ dayClasses } onClick={ this.setDate.bind(this, day) }>
                <span href="#" className='calendar__day-date'>{ day.format('D') }</span>
              </div>
            </td>
          );
        });
        return <tr key={ id }>{ days }</tr>;
      });
    }

    return (
      <tbody>
      {weeks}
      </tbody>
    );
  }
}