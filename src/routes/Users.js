import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTable, useSortBy, usePagination } from "react-table";
import "../App.css";
import styled from 'styled-components'
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
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

function Users() {

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
        Header: "Name", accessor: "name", 
      },
      {
        Header: "Email Address", accessor: "EmailAddress",
      },
      {
        Header: "Username", accessor: "username",
      },
      {
        Header: "Contact Number", accessor: "ContactNumber",
      },
      {
        Header: "Actions", accessor: "actions",
        Cell: (row) => (
          <div>
            <span style={{ cursor: "pointer" }}><AiIcons.AiOutlineSearch size={30} /></span>
            <span style={{ cursor: "pointer", marginLeft: "50px"  }}  onClick={handleShow}>
              
              <BsIcons.BsTrashFill size={25}/>
              </span>
          </div>
        ),
      },  
    ],
    []
  );
    
   

  return (

    <Styles>
      <div style={{marginLeft: 238, display: "flex", alignItems: "center", marginTop: -650}}>
        <h2 style={{marginLeft: 70}}>Users</h2>
        <button className="Add-User-btn" style={{ marginLeft: "80.5%"}}> <AiIcons.AiOutlinePlus size={30} /> </button>
        </div>
        <div style={{marginLeft: 250}}>
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

  
export default Users;