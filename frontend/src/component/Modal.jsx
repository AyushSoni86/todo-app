import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getTodos, todos }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    email: editMode ? todos.email : cookies.Email,
    title: editMode ? todos.itemName : null,
    itemDescription: "Something++",
    progress: editMode ? todos.progress : 50,
    date: editMode ? "" : new Date(),
    itemId: editMode ? todos.itemId : null,
  });

  console.log(data);

  const postData = async (e) => {
    console.log("inside post data");
    e.preventDefault();
    try {
      const apiUrl = `http://localhost:5248/api/TodoItem/${data.email}`;
      const response = await axios.post(apiUrl, {
        itemName: data.title,
        progress: data.progress,
        email: data.email,
        itemDescription: "Something++",
      });
      console.log("Post Todo Response:", response.data);
      setShowModal(false);
      getTodos();
    } catch (error) {
      console.error("Error posting todo:", error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `http://localhost:5248/api/TodoItem/${data.email}/${data.itemId}`;
      const response = await axios.put(apiUrl, {
        itemId: data.itemId,
        itemName: data.title,
        itemDescription: "Updated ItemDescription field++",
        progress: data.progress,
        email: data.email,
        date: new Date(),
      });
      console.log("PUT Todo Response:", response.data);
      setShowModal(false);
      getTodos();
    } catch (error) {
      console.error("Error Updating todo:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={50}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current Progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? updateData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
