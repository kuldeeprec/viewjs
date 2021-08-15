import dayjs from 'dayjs';
import Vue from 'vue';


Vue.filter('dateToHumanShort', (value) => {
  if (value) {
    return dayjs(value).format('MMMM D, YYYY');
  }
  return value;
});

Vue.filter('toUpperCase', (value) => {
  if (!value) return '';
  return value.toUpperCase();
});
