import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTable, useSortBy, usePagination } from "react-table";
import "../App.css";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import bin3 from "../Images/bin3.png";
import axios from "axios";
import { Link } from "react-router-dom";
import magnify from "../Images/magnify-expand.png";

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount
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
    state: { pageIndex, pageSize }    
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount
    },
   
    useSortBy,
    usePagination
  )

   // Listen for changes in pagination and use the state to fetch our new data
   React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (

                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
 
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            (rows, i) => {
              prepareRow(rows);
              return (
                <tr {...rows.getRowProps()}>
                  {rows.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
          
          <tr>
            <td colSpan={headerGroups[0].headers.length}></td>
          </tr>

          <tr  >
            {loading ? (
              <td colSpan="1">Loading...</td>
            ) : (
              <td colSpan="1" >
                Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                results
              </td>
            )}
          <td></td>
          <td></td>
      
            <td colSpan="2">
          <div className="paginations">
        <button onClick={() => gotoPage(pageIndex + 1)} style={{width:74, height: 25, borderRadius: 5, backgroundColor: "#4E9E32", color: "white", marginRight: 17, border: "none"}}>
          prev
        </button>
        <button style={{width:25, height: 25}} onClick={() => gotoPage(pageIndex)}>{pageIndex + 1}</button>{" "}
        <button style={{width:25, height: 25}}  onClick={() => gotoPage(pageIndex + 1)}>{pageIndex + 2}</button>{" "}
        <button style={{width:25, height: 25}}  onClick={() => gotoPage(pageIndex + 2)}>{pageIndex + 3}</button>
        {" ... "}
        <button style={{width:25, height: 25}}  onClick={() => gotoPage(pageOptions.length)}>
          {pageOptions.length}
        </button>{""}{" "}{" "}{" "}
        <button onClick={() => gotoPage(pageIndex + 1)}  style={{width:74, height: 25, borderRadius: 5, backgroundColor: "#4E9E32", color: "white", marginLeft: 17, border: "none"}}>
          next
        </button>{" "}
      </div>  

            </td>
          </tr>
          
        </tbody>
      </table>
    </>
  )
}

function Users() {
  const Styles = styled.div`
    padding: 1rem;

    .pagination {
      padding: 0.5rem;
    }
  `;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = [
    {
      name: "John Doe",
      EmailAddress: "JohnDoe@gmail.com",
      username: "JohnDoe",
      ContactNumber: "(+63)9532123456",
    },
    {
      name: "Jane Smith",
      EmailAddress: "JaneSmith@gmail.com",
      username: "JaneSmith",
      ContactNumber: "(+63)9532123456",
    },
    // Add more data here
  ];

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
            <Link to="/userformdetails">
            <span style={{ cursor: "pointer" }}>
            <img id="appliDeatils-btn" 
                  src={magnify}
                  alt="magnify">
                </img>
            </span>
            </Link>
            <span
              style={{ cursor: "pointer", marginLeft: "50px" }}
              onClick={handleShow}
            >
              <BsIcons.BsTrashFill size={25} />
            </span>
          </div>
        ),
      },
    ],
    []
  );
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:55731/api/UserAPI/list?PageSize=5`)
        .then((response) => {
          setInfo(response.data);
          console.log(response.data);
          console.log(info);
        })
        .catch(function (error) {});
    };
    fetchData();
  }, []);

  const [ setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(data.slice(startRow, endRow));

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(data.length / pageSize));

        setLoading(false);
      }
    }, 1000);
  }, []);
   
  return (
    <Styles>
      <div
        style={{
          marginLeft: 238,
          display: "flex",
          marginTop: -500,
        }}
      >
        <h2 style={{ marginLeft: '6%'}}>Users</h2>
        <Link to="/userformcreate" style={{ marginLeft: '76%'}}>
        <button className="Add-User-btn" >
          {" "}
          <AiIcons.AiOutlinePlus size={30} />{" "}
        </button>
        </Link>
      </div>
      <div style={{ marginLeft: 250 }}>
        {/*info?.data?.map((infor) => ({infor.firstname}))*/}
        <Table 
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        />
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img
                src={bin3}
                alt="bin3"
                style={{ alignContent: "center" }}
              ></img>
              <h2>Remove User</h2>
              <span>Are you sure you want to remove the user?</span>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "center",
              border: "none",
            }}
          >
            <Button variant="danger" onClick={handleClose}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Styles>
  );
}

export default Users;
