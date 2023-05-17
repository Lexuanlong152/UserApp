import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react";
import { FetchAllUser } from "../services/UserSevice";
import ReactPaginate from 'react-paginate';
import AddUser from "./AddUser";

function UserTable(props) {
  const [listusers, setListUser] = useState([]);
  // const [totalUsers,setTotalUsers] = useState(0);
  const [totalPages,setTotalPages] = useState(0);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await FetchAllUser(page);
    // console.log(res)
    if (res && res.data ) {
      // setTotalUsers(res.total)
      setTotalPages(res.total_pages)
      setListUser(res.data);
    }
  };
  const handlePageClick = (event) =>{
    getUsers(+event.selected + 1);
  }

  const handleUpdateTable = (user) =>{
    setListUser([user,...listusers]);

  }
//   console.log(listusers);
  return (
    <>
    <AddUser 
    handleUpdateTable={handleUpdateTable}
    />
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {listusers &&
          listusers.length > 0 &&
          listusers.map((listuser) => (
            <tr key={listuser.id}>
              <td>{listuser.id}</td>
              <td>{listuser.email}</td>
              <td>{listuser.first_name}</td>
              <td>{listuser.last_name}</td>
            </tr>   
          ))}
      </tbody>
    </Table>
    <ReactPaginate 
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
