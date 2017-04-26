const apiConf = {
  methods: {
    auth: {
      login: {
        url: '/api/user/login',
        method: 'post'
      },
      logout: {
        url: '/api/user/logout',
        method: 'post'
      },
      register: {
        url: '/api/user/register',
        method: 'post'
      },
      getUser: {
        url: '/api/user/find_by_email',
        method: 'post'
      },
    },
    user: {
      getInfo : {
        url: '/api/user_actions/get_user_info',
        method: 'get'
      },
      updateInfo: {
        url: '/api/user_actions/update_user_info',
        method: 'post'
      },
      terminateSession : {
        url: '/api/user_actions/terminate_user_session',
        method: 'get'
      }
    },
    task: {
      list: {
        url: '/api/task/list',
        method: 'get'
      },
      create: {
        url: '/api/task/create_task',
        method: 'post'
      },
      update: {
        url: '/api/task/update_task',
        method: 'post'
      },
      del: {
        url: '/api/task/delete_task',
        method: 'delete'
      }
    },
  },
  backendUrl: PRODUCTION ? PRODUCTION_API_URL : 'http://localhost:3000'
};

export default apiConf;