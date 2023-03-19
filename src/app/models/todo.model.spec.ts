import { TODO } from "./todo.model";

describe('describe for todo model', () => {
  let todo: TODO;

  beforeEach(() => {
    todo = new TODO('buy food', false);
  })
  it('should create a instance successfully', () => {
    expect(todo).toBeTruthy()
  })

  it('should return an id',() => {
    const id = todo.id;
    expect(id).toBe(todo.id);
  })

  it('should return is editing property', () => {
    const isEditing = todo.isEditing;
    expect(isEditing).toBe(todo.isEditing);
  })

  it('should set is editing value', () => {
    expect(todo.isEditing).toBeFalse();
    todo.isEditing = true;
    expect(todo.isEditing).toBeTrue();
  })
  it('should get todo title', () => {
    const title = todo.title;
    expect(title).toBe(todo.title);
  })
  it('should set new todo title', () => {
    const newTitle = 'eat things    ';
    todo.title = newTitle;
    expect(newTitle.trim()).toBe(todo.title);
  });
  it('should get completed property', () => {
    const completed = todo.completed;
    expect(completed).toBe(todo.completed);
  })
  it('should set completed property', () => {
    expect(todo.completed).toBeFalse();
    todo.completed = true;
    expect(todo.completed).toBeTrue();
  });
  it('should return todo value', () => {
    const value = todo.getValues();
    expect({
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }).toEqual(value);
  })
});
