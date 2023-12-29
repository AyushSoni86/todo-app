import ListHeader from "./component/ListHeader";
import ListItem from "./component/ListItem";
import { useEffect, useState } from "react";
import axios from "axios";
import Auth from "./component/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [todos, setTodos] = useState(null);

  const email = cookies.Email;
  const authToken = cookies.AuthToken;
  const name = cookies.Name;

  console.log("email, authToken, name -> ", email, name, authToken);

  const getTodos = async () => {
    try {
      console.log("inside get todos method");
      const response = await axios.get(
        `http://localhost:5248/api/TodoItem/${email}`
      );
      setTodos(response.data);
      console.log("response data->", response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getTodos();
    }
  }, []);

  const sortedTodos = todos?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"🌴 Holiday Tick List"} getTodos={getTodos} />
          <p className="user-name">👋 Welcome back {name}</p>
          {sortedTodos?.map((todos) => (
            <ListItem key={todos.itemId} todos={todos} getTodos={getTodos} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
