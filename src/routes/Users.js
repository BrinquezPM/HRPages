import React, { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
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
  .table-wrapper {
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    overflow: auto;
  }

  table {
    border: none;
    width: 100%;
  }

  td {
    font-size: 0.875rem;
    font-weight: 500;
    height: 3.125rem;
    border: 0;
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
  pSize,
  pIndex,
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

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);
 
  function handlePageClick(newPageIndex){
    if(newPageIndex >0 && newPageIndex <= pSize){
      pIndex = newPageIndex;
      console.log("pIndex"+pIndex) 
      console.log("pSize"+pSize) 
    }

  }
  return (
    <>
        <code>
          {JSON.stringify(
            {
              pSize,
              pIndex
            },
            null,
            2
          )}
        </code>
      <TableStyles>

        <div className="table-wrapper">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
                <td colSpan="1"><p>loading</p> </td>
              ) : (
                <td colSpan="1">
                  Showing {page.length} of ~{pSize.pages}{" "}
                  results
                </td>
                )}
                <td></td>
                <td></td>

              <td colSpan="2">
                <div className="paginations">
                  <button
                    onClick={() => handlePageClick(pIndex-1) }
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
                    onClick={() =>handlePageClick(pIndex)}
                  >
                    {pageIndex + 1}
                  </button>{" "}
                  <button
                    style={{ width: 25, height: 25 }}
                    onClick={() =>handlePageClick(pIndex +1 )}
                  >
                    {pageIndex + 2}
                  </button>{" "}
                  <button
                    style={{ width: 25, height: 25 }}
                    onClick={() => handlePageClick(pIndex +2 )}
                  >
                    {pageIndex + 3}
                  </button>
                  {" ... "}
                  <button
                    style={{ width: 25, height: 25 }}
                    onClick={() => handlePageClick(pSize) }
                  >
                    {pSize}
                
                  </button>
                  {""}{" "}
                  <button
                    onClick={() =>handlePageClick(pIndex+1) }
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
        </div>

      </TableStyles>
    </>
  );
}

function Users() {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [userBeingDeleted, setUserBeingDeleted] = useState({});
  const toggleDeleteModal = (data) => {
    setIsDeleteModalActive(!isDeleteModalActive);
    setUserBeingDeleted(data);
  };
  const [pSize, setPageSize] = useState(5);
  const [pIndex, setPageIndex] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      let apiUrl = `http://localhost:55731/api/UserAPI/list?Page=${pIndex}&PageSize=${pSize}`
      axios
        .get(apiUrl)
        .then((response) => {
          setInfo(response.data);
          setIsLoading(false);
          console.log(response.data);
          setPageSize(response.data.pagination.pages);
          console.log(pSize);
        });
    };
    fetchData();
  }, [pIndex]);


  async function deactivateUser() {
    try {
      const postRequest = await axios
        .put("http://localhost:55731/api/UserAPI/softdelete", userBeingDeleted)
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
      : info?.data
          ?.filter((user) => user.isActive == true)
          .map((user) => ({
            name: `${user.firstname} ${" "} ${user.lastname}`,
            emailAddress: user.email,
            username: `${user.username}`,
            phoneNumber: user.phone,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
          }));

  let [tdata,setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize
        // setData(serverData.slice(startRow, endRow))

          // Your server could send back total page count.
          // For now we'll just fake it, too
        // setPageCount(Math.ceil(serverData.length / pageSize))

        setLoading(false)
      }
    }, 1000)
  }, [])
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email Address",
        accessor: "emailAddress",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Contact Number",
        accessor: "phoneNumber",
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
              style={{ cursor: "pointer", marginLeft: "30px" }}
              onClick={() => {
                const userDeletedData = {
                  user_firstName: data[row.row.id].firstname,
                  user_lastName: data[row.row.id].lastname,
                  user_email: data[row.row.id].emailAddress,
                  user_phoneNumber: data[row.row.id].phoneNumber,
                  user_username: data[row.row.id].username,
                  user_password: data[row.row.id].password,
                  confirm_pass: data[row.row.id].password,
                };

                toggleDeleteModal(userDeletedData);
              }}
            >
              <img src={bin} style={{ width: "1.5rem" }} />
            </span>
          </div>
        ),
      },
    ],
    [data]
  );

  

  return isLoading ? (
    <p> Loading </p>
  ) : (
    <>
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
            pIndex = {pIndex}
            pSize = {pSize}
          />
        </div>
      </div>

      {isDeleteModalActive && (
        <Modal
          onClick={toggleDeleteModal}
          onClose={deactivateUser}
          title="Remove User"
          icon={trashIllustration}
          btnTxt="Remove"
          description="Are you sure you want to remove the user?"
        />
      )}
    </>
  );
}

export default Users;