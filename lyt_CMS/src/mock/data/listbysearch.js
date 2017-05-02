import Mock from 'mockjs';
const obj1 = [
  {
    id: 1
  }
];

const mockListBySearch = [];

for (let i = 0; i < 1005; i++) {
  mockListBySearch.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname()
  }));
}

export { mockListBySearch, obj1 };
