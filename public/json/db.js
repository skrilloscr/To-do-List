const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Custom route to delete all tasks
server.delete('/tasks', (res) => {
  router.db.set('tasks', []);
  router.db.write();
  res.sendStatus(200);
});

// ... (other JSON Server configurations)

server.use(middlewares);
server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});
