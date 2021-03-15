
let DAO = require('../services/DAO').DAO;

test('Can inject DB into DAO', () => {
  DAO.db = "someDB";
  expect(DAO.db).toBe("someDB");
});

