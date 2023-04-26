import React, { useState }from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "../App.css";
import styled from 'styled-components'
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bin3 from '../Images/bin3.png';


function Table({
  columns,
  data,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,

    },
   
    useSortBy,
    usePagination
  )

  const firstPageRows = rows.slice(0, 20)
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
          {rows.map(
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
        </tbody>
      </table>
    
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
      status: "HR Interview",
    },
    {
      name: "Jane Smith",
      dateSubmitted: "2022-04-20",
      position: "Designer",
      status: "Job Offer",
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
        Cell: (row) => {
          let borderColor, textColor;
          switch (row.value) {
            case "Pre-screening":
              borderColor = "blue";
              textColor = "blue";
              break;
            case "HR Interview":
            case "Technical interview":
              borderColor = "green";
              textColor = "green";
              break;
            case "Final Interview":
              borderColor = "yellow";
              textColor = "yellow";
              break;
            case "Job Offer":
            case "Accepted job offer":
              borderColor = "red";
              textColor = "red";
              break;
            default:
              borderColor = "black";
              textColor = "inherit";
          }

          return (
            <button
              style={{
                border: `2px solid ${borderColor}`,
                backgroundColor: "transparent",
                color: textColor,
                cursor: "pointer",
                padding: "0.5rem",
                paddingInlineEnd: "20%",
                paddingInlineStart: "20%",
                borderRadius: "0.4rem"
              }}
            >
              {row.value}
            </button>
          );
        }
        
      },
      {
        Header: "Actions", accessor: "actions",
        Cell: (row) => (
          <div>
            <span style={{ cursor: "pointer" }}><AiIcons.AiOutlineSearch size={30} /></span>
            <span style={{ cursor: "pointer", marginLeft: "35px"  }}  onClick={handleShow}><BsIcons.BsTrashFill size={25}/></span>
          </div>
        ),
      },  
    ],
    []
  );
    
   

  return (

    <Styles>
      <div style={{marginLeft: 200}}>
        <h2 style={{marginLeft: 70}}>Applicants</h2>
      <Table
        columns={columns}
        data={data}
 
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