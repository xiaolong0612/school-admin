import { param2Obj } from 'utils';

const userMap = {
  教研员: {
    role: ['7'],
    token: '教研员',
    introduction: '我是教研员',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '教研员',
    uid: '007',
    indexPath: ''
  },
  教育局领导: {
    role: ['9'],
    token: '教育局领导',
    introduction: '我是领导',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '工程师小王',
    uid: '009',
    indexPath: ''
  }
}

export default {
  loginByAccount: config => {
    const { account } = JSON.parse(config.body);
    return userMap[account];
  },
  getInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return Promise.reject('a');
    }
  },
  logout: () => 'success'
};
