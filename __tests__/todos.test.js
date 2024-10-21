const request = require('supertest');
const { app, server } = require('../app'); // Import both app and server

describe('Todo API', () => {
  afterAll(() => {
    // Close the server after all tests are done to free up resources
    server.close();
  });

  // Test GET /todos
  it('should return an empty list of todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // Test POST /todos
  it('should create a new todo', async () => {
    const newTodo = { task: 'Test new task' };
    const res = await request(app).post('/todos').send(newTodo);
    expect(res.statusCode).toBe(201);
    expect(res.body.task).toBe(newTodo.task);
    expect(res.body.completed).toBe(false);
  });

  // Test GET /todos/:id
  it('should get a todo by ID', async () => {
    const res = await request(app).get('/todos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('task', 'Test new task');
    expect(res.body).toHaveProperty('completed', false);
  });

  // Test PUT /todos/:id
  it('should update a todo', async () => {
    const updatedTodo = { task: 'Updated task', completed: true };
    const res = await request(app).put('/todos/1').send(updatedTodo);
    expect(res.statusCode).toBe(200);
    expect(res.body.task).toBe(updatedTodo.task);
    expect(res.body.completed).toBe(true);
  });

  // Test DELETE /todos/:id
  it('should delete a todo', async () => {
    const res = await request(app).delete('/todos/1');
    expect(res.statusCode).toBe(204);

    const getRes = await request(app).get('/todos/1');
    expect(getRes.statusCode).toBe(404);
  });
});
