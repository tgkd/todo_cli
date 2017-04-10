import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];

export default function getCalendar(year, month) {
  const startDate = moment([year, month]);
  const firstDay = moment(startDate).startOf('month');
  const endDay = moment(startDate).endOf('month');
  const monthRange = moment.range(firstDay, endDay);
  let weeks = [];

  for (let day of monthRange.by('day')) {
    let ref = day.week();
    if (weeks.indexOf(ref) < 0) {
      weeks.push(day.week());
    }
  }
  let calendar = [];
  let firstWeekDay;
  let lastWeekDay;

  for (let i = 0; i < weeks.length; i++) {
    let week = weeks[i];

    if (i > 0 && week < weeks[i - 1]) {
      firstWeekDay = moment([year, month]).add(1, 'year').week(week).day(1);
      lastWeekDay = moment([year, month]).add(1, 'year').week(week).day(7);
    } else {
      firstWeekDay = moment([year, month]).week(week).day(1);
      lastWeekDay = moment([year, month]).week(week).day(7);
    }
     let numbOfDay = parseInt(firstWeekDay.format('D'));
     if(i === 0 && numbOfDay === 2) {
       weeks = insert(weeks, 1, week);
       let prevYear = month === 0 ? year - 1 : year;
       let prevMonth = month === 0 ? 11 : month;
       let prevWeek = week === 1 ? 53 : week - 1;

       firstWeekDay = moment([prevYear, prevMonth]).week(prevWeek).day(1);
       lastWeekDay = moment([prevYear, prevMonth]).week(prevWeek).day(7);
     }
    if (firstWeekDay.month() === month || lastWeekDay.month() === month) {
      let weekRange = moment.range(firstWeekDay, lastWeekDay);
      calendar.push(weekRange);
    }
  }

  return calendar;
};