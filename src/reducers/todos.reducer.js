const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  addTodo: 'addTodo',
  updateTodo: 'updateTodo',
  deleteTodo: 'deleteTodo',
  revertDeleteTodo: 'revertDeleteTodo',
  revertTodo: 'revertTodo',
  completeTodo: 'completeTodo',
  startRequest: 'startRequest',
  endRequest: 'endRequest',
  setLoadError: 'setLoadError',
  clearError: 'clearError',
};

const initialState = {
  todoList: [],
  isLoading: true,
  isSaving: false,
  errorMessage: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      return {
        ...state,
        todoList: action.tasks,
        isLoading: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };

    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.addTodo: {
      const savedTodo = {
        id: action.records[0]['id'],
        ...action.records[0].fields,
      };
      if (!action.records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: [savedTodo, ...state.todoList],
        isSaving: false,
      };
    }
    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };

    case actions.completeTodo: {
      const updatedTodos = state.todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
      return {
        ...state,
        todoList: [...updatedTodos],
      };
    }

    case actions.revertTodo:
    case actions.updateTodo: {
      const updatedTodos = state.todoList.map((todo) => {
        if (todo.id === action.editedTodo.id) {
          return { ...action.editedTodo };
        }
        return todo;
      });

      const updatedState = {
        ...state,
        todoList: [...updatedTodos],
      };
      if (action.error) {
        updatedState.errorMessage = action.error.message;
      }

      return {
        ...updatedState,
      };
    }

    case actions.deleteTodo:
      return {
        ...state,
        todoList: state.todoList.filter(el => {
          return el.id !== action.id;
        })
      };

    case actions.revertDeleteTodo: {
      const updatedTodos = state.todoList;
      if (!updatedTodos.find((todo) => todo.id === action.revertTodoItem.id)) {
        updatedTodos.splice(action.revertTodoIndex, 0, action.revertTodoItem);
      }
      return {
        ...state,
        todoList: updatedTodos
      };
    }

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
  }
}

export { actions, initialState, reducer };
