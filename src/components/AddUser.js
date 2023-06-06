import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserSevice";
import { ToastContainer, toast } from "react-toastify";

function AddUser(props) {
  const { showAddModal, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleAddUser = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Add User Success");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("Add User Unsucces");
    }
  };

  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showAddModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Name :</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Job:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddUser}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default AddUser;
