import { useCookies } from "react-cookie";
import Modal from "./Modal";
import { useState } from "react";

const ListHeader = ({ listName, getTodos }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const signout = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    removeCookie("Name");
    window.location.reload();
    console.log("Sign Out");
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          Add New
        </button>
        <button className="signout" onClick={signout}>
          Sign Out
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"create"}
          setShowModal={setShowModal}
          getTodos={getTodos}
        />
      )}
    </div>
  );
};

export default ListHeader;
