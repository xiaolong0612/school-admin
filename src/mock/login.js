const userMap = {
  teacher: {
    role: ['teacher'],
    token: 'teacher',
    introduction: '我是老师',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '老师'
  },
  student: {
    role: ['student'],
    token: 'student',
    introduction: '我是学生',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '学生'

  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '工程师小龙君'
  }
}

export default {
  loginByEmail: config => {
    const { account } = config.params;
    return new Promise((resolve, reject) => {
      if (userMap[account]) {
        setTimeout(() => {
          resolve([200, {
            data: userMap[account]
          }]);
        }, 500);
      } else {
        reject('账号不正确')
      }
    })
  },
  getInfo: config => {
    const { token } = config.params;
    return new Promise((resolve, reject) => {
      if (userMap[token]) {
        setTimeout(() => {
          resolve([200, {
            data: userMap[token]
          }]);
        }, 100);
      } else {
        reject('获取失败')
      }
    })
  },
  logout: () => new Promise(resolve => {
    setTimeout(() => {
      resolve([200, { data: 'success' }]);
    }, 100);
  })
};
