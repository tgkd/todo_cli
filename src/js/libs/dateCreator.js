import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export function getCalendar(year, month) {
  let startDate = moment([year, month]).startOf('month');

  let calendar = [];
  while (startDate.month() === month) {
    let first = moment(startDate).startOf('isoWeek');
    let end = moment(startDate).endOf('isoWeek');
    calendar.push(moment.range(first, end));
    startDate = moment(first).add(7, 'day');
  }
  return calendar;
}

export function sortTasks(tasks, sortType) {
  return tasks.sort(function (left, right) {
    return moment.parseZone(left.end).diff(moment.parseZone(right.end), sortType);
  });
}