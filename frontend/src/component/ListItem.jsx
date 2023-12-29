import { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import axios from "axios";

const ListItem = ({ todos, getTodos }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      await axios.delete(
        `http://localhost:5248/api/TodoItem/${todos.email}/${todos.itemId}`
      );
      console.log("Deleted Successfully");
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{todos.itemName}</p>
        <ProgressBar progress={todos.progress} />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>

      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getTodos={getTodos}
          todos={todos}
        />
      )}
    </li>
  );
};

export default ListItem;
