import { param2Obj } from 'utils';

const userMap = {
  任课教师: {
    role: ['0'],
    token: '任课教师',
    introduction: '任课教师',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '任课教师',
    uid: '000',
    indexPath: ''
  },
  班主任: {
    role: ['1'],
    token: '班主任',
    introduction: '我是班主任',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '工程师小王',
    uid: '001',
    indexPath: ''
  },
  备课组长: {
    role: ['2'],
    token: '备课组长',
    introduction: '备课组长',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '备课组长',
    uid: '002',
    indexPath: ''
  },
  年段长: {
    role: ['3'],
    token: '年段长',
    introduction: '年段长',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '年段长',
    uid: '003',
    indexPath: ''
  },
  教研组长: {
    role: ['4'],
    token: '教研组长',
    introduction: '教研组长',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '教研组长',
    uid: '004',
    indexPath: ''
  },
  教务处: {
    role: ['5'],
    token: '教务处',
    introduction: '教务处',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '教务处',
    uid: '005',
    indexPath: ''
  },
  校领导: {
    role: ['6'],
    token: '校领导',
    introduction: '校领导',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '校领导',
    uid: '006',
    indexPath: ''
  },
  教研员: {
    role: ['7'],
    token: '教研员',
    introduction: '我是教研员',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '教研员',
    uid: '007',
    indexPath: '/instructor/index'
  },
  进修校领导: {
    role: ['8'],
    token: '进修校领导',
    introduction: '进修校领导',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '进修校领导',
    uid: '008',
    indexPath: ''
  },
  教育局领导: {
    role: ['9'],
    token: '教育局领导',
    introduction: '我是领导',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '教育局',
    uid: '009',
    indexPath: ''
  },
  学生: {
    role: ['10'],
    token: '学生',
    introduction: '学生',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '学生',
    uid: '010',
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
