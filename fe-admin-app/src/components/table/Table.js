import "./table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
// import { useEffect, useState } from "react";

const TableHome = () => {
  const { data } = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/transaction/latest`
  );
  const rows = data;

  const getDate = (date) => {
    const currentDate = new Date(date);
    return `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
  };

  return (
    <TableContainer component={Paper} className="table-home">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="table-head-home">
          <TableRow>
            <TableCell className="tableCell"> ID</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Hotel</TableCell>
            <TableCell className="tableCell">Room</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">{row.user}</TableCell>
              {row.hotel ? (
                <TableCell className="tableCell">{row.hotel.name} </TableCell>
              ) : (
                <TableCell className="tableCell">None </TableCell>
              )}
              <TableCell className="tableCell">{row.room.join(",")}</TableCell>
              <TableCell className="tableCell">
                {getDate(row.startDate)} - {getDate(row.endDate)}
              </TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.payment}</TableCell>
              <TableCell className="tableCell">
                <span className={`status-home ${row.status}`}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHome;
