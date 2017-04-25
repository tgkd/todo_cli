import User from 'libs/user';

const user = new User();

user.get()
  .then(user => {
    System.import('apps/App').then(App => App.default(user.data));
  })
  .catch(e => {

    System.import('apps/Auth').then(Auth => Auth.default(e));
  });
