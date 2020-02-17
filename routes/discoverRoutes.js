const discover = require('../controllers/discover');

module.exports = app => {
  // Get All Users
  app.get('/api/dashboard', discover.getAllUsers);
  // Get User
  app.get('/api/dashboard/:id', discover.getDiscoverByUser);
  // Get All Discovers
  app.get('/api/discover', discover.getAllDiscovers);
  // Create Dicover
  app.post('/api/dashboard', discover.createDiscover);
};
