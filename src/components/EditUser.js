import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../services/UserSevice";
import { ToastContainer, toast } from "react-toastify";

function EditUser(props) {
  const { handleEditFromModal, showEditModal, dataEditUser, handleClose } =
    props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updatedAt) {
      toast.success("Edit User Success");
      handleEditFromModal({
        first_name: name,
        id: dataEditUser.id,
      });
      handleClose();
    } else {
      toast.error("Edit User Unsucces");
    }
  };

  useEffect(() => {
    if (showEditModal) {
      setName(dataEditUser.first_name);
    }
  }, [dataEditUser]);

  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showEditModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Edit a User</Modal.Title>
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
            <Button variant="primary" onClick={handleEditUser}>
              Save
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

export default EditUser;
