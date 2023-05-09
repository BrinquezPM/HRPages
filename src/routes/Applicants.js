import React, { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "../App.css";
import styled from "styled-components";
import * as BsIcons from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import bin3 from "../Images/bin3.png";
import Chip2 from "../components/Chip/Chip2";
import { Link } from "react-router-dom";
import magnify from "../Images/magnify-expand.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
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

          <tr>
            <td colSpan={headerGroups[0].headers.length}></td>
          </tr>

          <tr>
            {loading ? (
              <td colSpan="1">Loading...</td>
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
        </tbody>
      </table>
    </>
  );
}

function Applicants() {
  const [rowId, setRowId] = useState(null);
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Styles = styled.div`
    padding: 1rem;

    .pagination {
      padding: 0.5rem;
    }
  `;

  useEffect(() => {
    const fetchUsers = async () => {
      await axios
        .get("http://localhost:55731/api/ApplicantAPI/list?Page=0&PageSize=5")
        .then((response) => {
          setInfo(response.data);
          setIsLoading(false);
          console.log(response.data);
        });
    };
    fetchUsers();
  }, []);


  async function deleteApplicant() {
    try {
      const postRequest = await axios
        .delete("http://localhost:55731/api/ApplicantAPI/delete", {
          apl_id: rowId,
        })
        .catch((error) => {
          console.log(error);
          console.log(postRequest.data);
        });
    } catch (error) {
      console.log(error);
    }
    //setIsDeactivateModalActive(!isDeactivateModalActive);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setRowId(id);
  };
  const navigate = useNavigate();
  let data =
    info.data === undefined
      ? ""
      : info?.data?.map((applicant) => ({
          id:applicant.id,
          name: `${applicant.name}`,
          dateSubmitted: new Date(applicant.createdDate).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          ),
          position: `${applicant.position.name}`,
          status: <Chip2 statusId={applicant.status} />,
        }));

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Date Submitted",
        accessor: "dateSubmitted",
      },
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (row) => (
          <div>
            <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              const rowId= row.row.id;
              navigate(`/applicantDetails/${rowId}`);
            }}
          >
            <img id="appliDeatils-btn" src={magnify} alt="magnify"></img>
          </span>
            <span
              style={{ cursor: "pointer", marginLeft: "35px" }}
              onClick={() => handleShow(row.row.id)}
            >
              <BsIcons.BsTrashFill size={25} />
            </span>
          </div>
        ),
      },
    ],
    []
  );
  const [setData] = React.useState([]);
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

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <Styles>
      <div style={{ marginLeft: "20%", marginTop: -500 }}>
        <h2 style={{ marginLeft: "5%" }}>Applicants</h2>
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
            <Button variant="danger" onClick={deleteApplicant(rowId)}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Styles>
  );
}

export default Applicants;
