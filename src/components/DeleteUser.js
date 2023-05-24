import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { deleteUser } from "../services/UserSevice";

function DeleteUser(props) {
  const { showDeleteModal, handleClose, dataDeleteUser,handleDeleteFromModal } = props;

  const handleDeleteUser = async () => {
    let res = await deleteUser(dataDeleteUser.id);
    console.log(res)
    if (res && +res.statusCode===204){
      toast.success("Delete User Success");
      handleDeleteFromModal ( dataDeleteUser);
      handleClose();
    } else {
      toast.error ('Edit User Unsucces')
    }
  };
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal
          show={showDeleteModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Delete a User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="body-delete-user">
              Do you want to delete user, email = {dataDeleteUser.email} ?
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteUser}>
              Yes
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

export default DeleteUser;
