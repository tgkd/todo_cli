import { any, isEqual, filter } from 'underscore';

export default function difference (array){
  const rest = [].concat.apply([], [].slice.call(arguments, 1));

  const containsEquals = (obj, target) => {
    if (obj == null) {
      return false;
    }
    return any(obj, function(value) {
      return isEqual(value, target);
    });
  };

  return filter(array, (value) => {
    return ! containsEquals(rest, value);
  });
};