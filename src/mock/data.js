import Mock from 'mockjs';
import { param2Obj } from 'utils';

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@cname',
    auditor: '@cname',
    title: '@ctitle(10, 20)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['FD', 'FE', 'BI', 'VN'],
    'school|1': ['内厝中学','新店中学','厦门市国祺中学','厦门市第二外国语学校','厦门市五显中学','厦门市东山中学','厦门市启悟中学','同安一中','巷西中学','刘五店中学','巷南中学','彭厝学校','巷东中学','厦门市竹坝学校','厦门市澳溪中学','厦门市城东中学','厦门华兴学校','厦门市美林中学','厦门市莲美中学'],
    'test|1': ['入学', '七上', '七下', '八上', '八下', '九上', '九下' ],
    'subject|10': ['语文', '数学', '英语', '物理', '地理', '思品', '历史', '化学'],
    'status|1': ['published', 'draft', 'deleted'],
    pageviews: '@integer(300, 5000)',
    'array1|12': ["@float(0, 1, 1, 1)"],
    'array2|11': ["@float(0, 1, 1, 1)"],
    "number1|1-100": 100,
    "number2|1-100": 100,
    "number3|1-100": 100,
    "number4|1-100": 100,
    "number5|1-100": 100,
    "number6|1-100": 100,
    "number7|1-100": 100,
    "number8|1-100": 100,
    float1: '@float(0, 1, 1, 1)',
    float2: '@float(0, 1, 1, 1)',
    float3: '@float(0, 1, 1, 1)',
    float4: '@float(0, 1, 1, 1)',
    float5: '@float(0, 1, 1, 1)',
    float6: '@float(0, 1, 1, 1)',
    float7: '@float(0, 1, 1, 1)',
    float8: '@float(0, 1, 1, 1)',
    name1: '@cname()',
    name2: '@cname()',
    name3: '@cname()',
    name4: '@cname()',
    name5: '@cname()'
  }));
}

export default {
  getList: config => {
    const { importance, type, title, page, limit, sort } = param2Obj(config.url);
    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false;
      if (type && item.type !== type) return false;
      if (title && item.title.indexOf(title) < 0) return false;
      return true;
    });
    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
    return {
      total: mockList.length,
      list: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC网站', pv: 1024 }, { key: 'mobile网站', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  })
};
