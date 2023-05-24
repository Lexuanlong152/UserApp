import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { FetchAllUser } from "../services/UserSevice";
import ReactPaginate from "react-paginate";
import AddUser from "./AddUser";
import Button from "react-bootstrap/esm/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditUser from "./EditUser";
import _, { debounce } from "lodash";
import DeleteUser from "./DeleteUser";
import "./UserTable.scss";


function UserTable(props) {
  const [listUsers, setListUser] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [fieldSort, setFieldSort] = useState("id");
 

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await FetchAllUser(page);

    if (res && res.data) {
      setTotalPages(res.total_pages);
      setListUser(res.data);
    }
  };
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUsers]);
  };
  const handleClickEditButton = (user) => {
    setDataEditUser(user);
    setShowEditModal(true);
  };

  const handleClickDelete = (user) => {
    setShowDeleteModal(true);
    setDataDeleteUser(user);
  };
  const handleClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleEditFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((listUser) => listUser.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };

  const handleDeleteFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = cloneListUser.filter((listUser) => listUser.id !== user.id);
    setListUser(cloneListUser);
  };

  const handleSort = (sortBy, fieldSort) => {
    setSortBy(sortBy);
    setFieldSort(fieldSort);

    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.sortBy(cloneListUser, [fieldSort], [sortBy]);
    setListUser(cloneListUser);
  };

  const handleSearch = debounce((event) => {
    let textSearch = event.target.value;
   
    if (textSearch) {
      console.log("hi");
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = _.filter(cloneListUser, (listUser) =>
        listUser.email.includes(textSearch)
      );
     
      setListUser(cloneListUser);
    } else {
      getUsers(1);
    }
  },1000);

 
  return (
    <>
       <div className="col-6 mt-3">
        <input 
        className=" form-control" 
        // value={searchKey}
        placeholder="Search ... "
        onChange={(event) => handleSearch(event)}
        />
      </div>
      <AddUser handleUpdateTable={handleUpdateTable} />
      <EditUser
        showEditModal={showEditModal}
        handleClose={handleClose}
        handleEditFromModal={handleEditFromModal}
        dataEditUser={dataEditUser}
      />
      <DeleteUser
        showDeleteModal={showDeleteModal}
        handleClose={handleClose}
        dataDeleteUser={dataDeleteUser}
        handleDeleteFromModal={handleDeleteFromModal}
      />
      <Table striped bordered hover>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <div>
              <th className="d-flex justify-content-around align-items-center">
                <span>ID</span>
                <div>
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-up-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-down-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </div>
              </th>
            </div>
            <th>Email</th>
            <div>
              <th className="d-flex justify-content-around align-items-center">
                <span>First Name</span>
                <div>
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-up-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-down-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </div>
              </th>
            </div>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((listUser) => (
              <tr key={listUser.id}>
                <td>{listUser.id}</td>
                <td>{listUser.email}</td>
                <td>{listUser.first_name}</td>
                <td>{listUser.last_name}</td>
                <td className="d-flex justify-content-center">
                  <Button
                    style={{ width: "80px" }}
                    className="btn btn-primary me-3"
                    onClick={() => handleClickEditButton(listUser)}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </Button>
                  <Button
                    style={{ width: "100px" }}
                    className="btn btn-danger me-3"
                    onClick={() => handleClickDelete(listUser)}
                  >
                    <i className="bi bi-trash3 me-1"></i>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        className="d-flex justify-content-center"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-tiem"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-tiem"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

export default UserTable;
