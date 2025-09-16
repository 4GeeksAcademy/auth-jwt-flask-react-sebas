export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    login_data: {},
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "login_data":
      const { email, jwt_token } = action.payload;

      return {
        ...store,
        login_data: { email, jwt_token },
      };

    case "logout":
      return {
        ...store,
        login_data: {},
      };

    default:
      throw Error("Unknown action.");
  }
}
