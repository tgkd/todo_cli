import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);
moment.locale('ru');

let indexOf = [].indexOf || function (item) {
    for (let i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }
    return -1;
  };

export default function getCalendar(year, month) {
  const startDate = moment([year, month]);
  const firstDay = moment(startDate).startOf('month');
  const endDay = moment(startDate).endOf('month');
  const monthRange = moment.range(firstDay, endDay);
  let weeks = [];

  for (let day of monthRange.by('day')) {
    let ref = day.week();
    if (indexOf.call(weeks, ref) < 0) {
      weeks.push(day.week());
    }
  }
  let calendar = [];
  let firstWeekDay;
  let lastWeekDay;

  let i = 0;
  while (i < weeks.length) {
    let week = weeks[i];
    if (i > 0 && week < weeks[i - 1]) {
      firstWeekDay = moment([year, month]).add(1, 'year').week(week).day(1);
      lastWeekDay = moment([year, month]).add(1, 'year').week(week).day(7);
    } else {
      firstWeekDay = moment([year, month]).week(week).day(1);
      lastWeekDay = moment([year, month]).week(week).day(7);
    }
    let weekRange = moment.range(firstWeekDay, lastWeekDay);
    calendar.push(weekRange);
    i++;
  }
  return calendar;
};