import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTable, useSortBy, usePagination } from "react-table";
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import magnify from "../Images/magnify-expand.png";
import bin from "../Images/trash-icon.png";
import addIcon from "../Images/add-icon.png";
import trashIllustration from "../Images/trash-illustration.png";

const TableStyles = styled.div`
  table {
    border-radius: 5px !important;
    border: 1px solid #d9d9d9;
    width: 100%;
  }

  td {
    font-size: 0.875rem;
    font-weight: 500;
    height: 3.125rem;
    border: 0;
    // display: flex;
  }

  th {
    font-size: 0.9375rem;
    height: 3.125rem;
    border: 0;
    font-weight: 600;
  }

  tfoot {
    border-top: 1px solid #d9d9d9;
    width: 100%;
  }
`;

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },

    useSortBy,
    usePagination
  );


  React.useEffect(() => {
    fetchData();
  }, [fetchData, pageSize]);

  return (
    <>
      <TableStyles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}

                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((rows, i) => {
              prepareRow(rows);
              return (
                <tr {...rows.getRowProps()}>
                  {rows.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              {loading ? (
                <td colSpan="1"></td>
              ) : (
                <td colSpan="1">
                  Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                  results
                </td>
              )}
              <td></td>
              <td></td>

              <td colSpan="2">
                <div className="paginations">
                  <button
                    onClick={() => gotoPage(pageIndex + 1)}
                    style={{
                      width: 74,
                      height: 25,
                      borderRadius: 5,
                      backgroundColor: "#4E9E32",
                      color: "white",
                      marginRight: 17,
                      border: "none",
                    }}
                  >
                    prev
                  </button>
                  <button
                    style={{ width: 25, height: 25 }}
                    onClick={() => gotoPage(pageIndex)}
                  >
                    {pageIndex + 1}
                  </button>{" "}
                  <button
                    style={{ width: 25, height: 25 }}
                    onClick={() => gotoPage(pageIndex + 1)}
                  >
                    {pageIndex + 2}
                  </button>{" "}
                  <button
                    style={{ width: 25, height: 25 }}
                    onClick={() => gotoPage(pageIndex + 2)}
                  >
                    {pageIndex + 3}
                  </button>
                  {" ... "}
                  <button
                    style={{ width: 25, height: 25 }}
                    onClick={() => gotoPage(pageOptions.length)}
                  >
                    {pageOptions.length}
                  </button>
                  {""}{" "}
                  <button
                    onClick={() => gotoPage(pageIndex + 1)}
                    style={{
                      width: 74,
                      height: 25,
                      borderRadius: 5,
                      backgroundColor: "#4E9E32",
                      color: "white",
                      marginLeft: 17,
                      border: "none",
                    }}
                  >
                    next
                  </button>{" "}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </TableStyles>
    </>
  );
}

function Users() {
  const Styles = styled.div`
    .pagination {
      padding: 0.5rem;
    }
  `;

  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [usernameBeingDeleted, setUsernameBeingDeleted] = useState();
  const toggleDeleteModal = (username) => {
    setIsDeleteModalActive(!isDeleteModalActive);
    setUsernameBeingDeleted(username);
  };
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `http://localhost:55731/api/ApplicantAPI/list`;
      console.log(apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          setInfo(response.data);
          setIsLoading(true);
          console.log(response.data);
          console.log(response.data.pagination.pages);
          setPageSize(response.data.pagination.pages);
        });
    };
    fetchData();
  }, []);

  async function deactivateUser() {
    try {
      const postRequest = await axios
        .put("http://localhost:55731/api/UserAPI/softdelete", {
          user_id: info.id,
          user_firstName: info.firstname,
          user_lastName: info.lastname,
          user_email: info.email,
          user_phoneNumber: info.phoneNumber,
          user_username: info.username,
          user_password: info.password,
          confirm_pass: info.upassword,
        })
        .catch((error) => {
          console.log(error);
          console.log(postRequest.data);
        });
    } catch (error) {
      console.log(error);
    }
    handleClose();
    window.location.reload(); 
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let data =
    info.data === undefined
      ? ""
      : info?.data?.map((user) => ({
          name: `${user.firstname} ${" "} ${user.lastname}`,
          EmailAddress: user.email,
          username: `${user.username}`,
          ContactNumber: user.phone,
        }));

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email Address",
        accessor: "EmailAddress",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Contact Number",
        accessor: "ContactNumber",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (row) => (
          <div>
            <Link to={`/user-profile/${data[row.row.id].username}`}>
              <span style={{ cursor: "pointer" }}>
                <img id="appliDeatils-btn" src={magnify} alt="magnify"></img>
              </span>
            </Link>
            <span
              style={{ cursor: "pointer", marginLeft: "50px" }}
              onClick={handleShow}
            >
              <img src={bin} style={{ width: "1.5rem" }} />
            </span>
          </div>
        ),
      },
    ],
    [data]
  );

  const [setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {

    const fetchId = ++fetchIdRef.current;

    setLoading(true);

    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        // setData(data.slice(startRow, endRow));

        setPageCount(Math.ceil(data.length / pageSize));

        setLoading(true);
      }
    }, 1000);
  }, []);

  return isLoading ? (
    <p> Loading </p>
  ) : (
    <Styles>
      <div id="users-container">
        <div class="row-container users-header">
          <h2>Users</h2>
          <Link to="/userformcreate">
            <button className="Add-User-btn">
              {" "}
              <img src={addIcon} style={{ width: "1.5625rem" }} />
            </button>
          </Link>
        </div>

        <div>
          <Table
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
          />
        </div>
      </div>

      {isDeleteModalActive && (
        <Modal
          onClick={toggleDeleteModal}
          onClose={deactivateUser}
          title="Remove Applicant"
          icon={trashIllustration}
          btnTxt="Remove"
          description="Are you sure you want to remove the applicant?"
        />
      )}
    </Styles>
  );
}

export default Users;
