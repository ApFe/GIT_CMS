import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'ApFe',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: 'ApFe'
  }
];

const Users = [];

for (let i = 0; i < 57; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    com_map: Mock.Random.image('40x40', '#4A7BF7', 'Hello'),
    addr: Mock.mock('@county(true)'),
    'pirce|100-200': 1,
    birth: Mock.Random.datetime(),
    sex: Mock.Random.integer(0, 1),
    burst_sort:Mock.Random.integer(0, 1),
    'com_stock|500-1000':1,
    'com_sales|200-600':1,
    comTF: Mock.Random.integer(0, 1),
    explosion: Mock.Random.integer(0, 1),
    title_number: Mock.Random.integer()
  }));
}

export { LoginUsers, Users };
