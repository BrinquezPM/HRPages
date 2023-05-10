import React, { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "../App.css";
import styled from "styled-components";
import Modal from "../components/Modal/Modal";
import Chip2 from "../components/Chip/Chip2";
import { Link, redirect } from "react-router-dom";
import magnify from "../Images/magnify-expand.png";
import bin from "../Images/trash-icon.png";
import trashIllustration from "../Images/trash-illustration.png";
import axios from "axios";
import { useLocation } from "react-router";

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

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      <TableStyles>
        <table id="applicant-table" {...getTableProps()}>
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

            {/* <tr>
              <td colSpan={headerGroups[0].headers.length}></td>
            </tr> */}
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

function Applicants() {
  const location = useLocation();
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [applicantIdBeingDeleted, setApplicantIdBeingDeleted] = useState();
  const toggleDeleteModal = (applicantId) => {
    setIsDeleteModalActive(!isDeleteModalActive);
    setApplicantIdBeingDeleted(applicantId);
  };
  const Styles = styled.div`
    // padding: 1rem;

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
        .delete(
          `http://localhost:55731/api/ApplicantAPI/delete?id=${applicantIdBeingDeleted}`
        )
        .catch((error) => {
          console.log(error);
          console.log(postRequest.data);
        });
    } catch (error) {
      console.log(error);
    }
    setIsDeleteModalActive(false);
    location.reload();
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let data =
    info.data === undefined
      ? ""
      : info?.data?.map((applicant) => ({
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
          applicantid: applicant.id,
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
            <span style={{ cursor: "pointer" }}>
              <Link to={`/applicantDetails/${data[row.row.id].applicantid}`}>
                <img id="appliDeatils-btn" src={magnify} alt="magnify"></img>
              </Link>
            </span>
            <span
              style={{ cursor: "pointer", marginLeft: "35px" }}
              onClick={() => toggleDeleteModal(data[row.row.id].applicantid)}
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
      <div id="applicants-container">
        <h2 style={{ marginBottom: "20px" }}>Applicants</h2>
        <Table
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
        />
      </div>
      {isDeleteModalActive && (
        <Modal
          onClick={toggleDeleteModal}
          onClose={deleteApplicant}
          title="Remove Applicant"
          icon={trashIllustration}
          btnTxt="Remove"
          description="Are you sure you want to remove the applicant?"
        />
      )}
    </Styles>
  );
}

export default Applicants;
