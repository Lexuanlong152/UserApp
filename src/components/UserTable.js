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
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

function UserTable(props) {
  const [listUsers, setListUser] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [fieldSort, setFieldSort] = useState("id");
  const [dataExport, setDataExport] = useState([]);

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

  const handleClickAddButton = () => {
    setShowAddModal(true);
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
    setShowAddModal(false);
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
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = _.filter(cloneListUser, (listUser) =>
        listUser.email.includes(textSearch)
      );

      setListUser(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 1000);

  const getUserExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["id", "name", "first_name", "last_name"]);
      listUsers.map((user) => {
        let array = [];
        array[0] = user.id;
        array[1] = user.email;
        array[2] = user.first_name;
        array[3] = user.last_name;
        result.push(array);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("File is not CSV");
        // alert("File is not CSV");
        return;
      }
      Papa.parse(file, {
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error( "Wrong fomat header CSV file");
              } else {
                let result = [];
                rawCSV.map((user, index) => {
                  if (index > 0 && user.length === 3) {
                    let obj = {};
                    obj.email = user[0];
                    obj.first_name = user[1];
                    obj.last_name = user[2];
                    result.push(obj);
                  }
                });
                setListUser(result);
              }
            } else {
              toast.error("Wrong fomat with CSV file");
              // alert("Wrong fomat with CSV file");
            }
          } else {
            toast.error("Not found data in CSV file");
            // alert("Not found data in CSV file");
          }
        },
      });
    }
  };

  return (
    <>
      <div className="my-3 d-flex align-items-center justify-content-between">
        <span>
          <b>List User :</b>
        </span>
        <div>
          <label htmlFor="import-file" className="btn btn-secondary me-3">
            <i className="fa-solid fa-file-import me-2"></i>
            Import
          </label>
          <input
            id="import-file"
            type="file"
            onChange={(e) => handleImportCSV(e)}
            hidden
          />
          <CSVLink
            data={dataExport}
            asyncOnClick={true}
            onClick={(event, done) => getUserExport(event, done)}
            filename={"user.csv"}
            className="btn btn-info me-3"
            target="_blank"
          >
            <i className="fa-solid fa-file-export me-2"></i>
            Export
          </CSVLink>
          <Button onClick={handleClickAddButton} className="btn btn-primary">
            <i className="fa-solid fa-circle-plus me-2"></i>
            Add New
          </Button>
        </div>
      </div>
      <AddUser
        showAddModal={showAddModal}
        handleClose={handleClose}
        // handleClickAddButton = {handleClickAddButton}
        handleUpdateTable={handleUpdateTable}
      />
      <div className="col-6 my-3">
        <input
          className=" form-control"
          // value={searchKey}
          placeholder="Search email... "
          onChange={(event) => handleSearch(event)}
        />
      </div>
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
            listUsers.map((listUser, index) => (
              <tr key={index}>
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
