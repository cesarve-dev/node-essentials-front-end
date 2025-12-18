import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

function TodoList({ todoState, onCompleteTodo, onUpdateTodo }) {
  return (
    <>
      {todoState.isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <>
          {todoState.todoList.length === 0 ? (
            <p>Add a todo above to get started</p>
          ):(
            <ul className={styles.todoList}>
              {todoState.todoList.map((todo) => (
                <TodoListItem
                  key={todo.id}
                  todo={todo}
                  onCompleteTodo={onCompleteTodo}
                  onUpdateTodo={onUpdateTodo}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default TodoList;
