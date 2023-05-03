import React, { useState }from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "../App.css";
import styled from 'styled-components'
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bin3 from '../Images/bin3.png';
import Chip from "../components/Chip/Chip";
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
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="4">Loading...</td>
            ) : (
              <td colSpan="4">
                Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                results
              </td>
            )}
            <td>
          <div className="pagination">
        <button onClick={() => gotoPage(pageIndex)}>{pageIndex + 1}</button>{" "}
        <button onClick={() => gotoPage(pageIndex + 1)}>{pageIndex + 2}</button>{" "}
        <button onClick={() => gotoPage(pageIndex + 2)}>{pageIndex + 3}</button>
        {" ... "}
        <button onClick={() => gotoPage(pageOptions.length)}>
          {pageOptions.length}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>  

            </td>
          </tr>
          
        </tbody>
        <tfoot>
         
        </tfoot>
      </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
     
    </>
  )
}

function Applicants() {

  const Styles = styled.div`
  padding: 1rem;

  .pagination {
    padding: 0.5rem;
  }
`


const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  const data = [
    {
      name: "John Doe",
      dateSubmitted: "2022-04-22",
      position: "Developer",
      status: <Chip statusId={1} style={{ backgroundColor: "green" }} />,
    },
    {
      name: "Jane Smith",
      dateSubmitted: "2022-04-20",
      position: "Designer",
      status: <Chip statusId={2} />,
    },
    // Add more data here
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: "Name", accessor: "name", 
      },
      {
        Header: "Date Submitted", accessor: "dateSubmitted",
      },
      {
        Header: "Position", accessor: "position",
      },
      {
        Header: "Status", accessor: "status",
      },
      {
        Header: "Actions", accessor: "actions",
        Cell: (row) => (
          <div>
            <span style={{ cursor: "pointer" }}>
              <Link to="/applicantDetails">
                <img id="appliDeatils-btn" 
                  src={magnify}
                  alt="magnify">
                </img>
              </Link>
            </span>
            <span style={{ cursor: "pointer", marginLeft: "35px"  }}  onClick={handleShow}><BsIcons.BsTrashFill size={25}/></span>
          </div>
        ),
      },  
    ],
    []
  );
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
      <div style={{marginLeft: 250, marginTop: -500}}>
        <h2 style={{marginLeft: 70}}>Applicants</h2>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
      </div>

      <div>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{border: "none"}}>
        </Modal.Header>
        <Modal.Body>
        <div className="text-center">
          <img src={bin3} alt="bin3" style={{alignContent: "center"}}></img>
          <h2>Remove User</h2>
          <span>Are you sure you want to remove the user?</span>
          </div>
          </Modal.Body>
        <Modal.Footer style={{display: "flex", justifyContent: "center", border: "none"}}>
          <Button variant="danger" onClick={handleClose}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </Styles>
  )


  }

  
export default Applicants;