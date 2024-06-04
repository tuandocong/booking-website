import "./transaction.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Transaction = () => {
  const { user } = useContext(AuthContext);
  const { data } = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/transaction/user?name=${user.username}`
  );

  const rows = data;
  const getDate = (date) => {
    const startDate = new Date(date);
    return `${startDate.getDate()}/${
      startDate.getMonth() + 1
    }/${startDate.getFullYear()}`;
  };

  return (
    <div>
      <Navbar></Navbar>
      <Header type="list" />

      <div className="tcontain">
        <div className="tTitle">Your Transactions</div>
        <TableContainer
          style={{ maxHeight: "400px", overflow: "auto" }}
          component={Paper}
          className="table"
        >
          <Table
            sx={{ minWidth: 650, maxHeight: "100vh" }}
            aria-label="simple table"
          >
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="tableCell headText"> #</TableCell>
                <TableCell className="tableCell headText">Hotel</TableCell>
                <TableCell className="tableCell headText">Room</TableCell>
                <TableCell className="tableCell headText">Date</TableCell>
                <TableCell className="tableCell headText">Price</TableCell>
                <TableCell className="tableCell headText">
                  Payment Method
                </TableCell>
                <TableCell className="tableCell headText">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={row._id}>
                  <TableCell className="tableCell">{i + 1}</TableCell>
                  <TableCell className="tableCell">
                    {row.hotel ? row.hotel.name : "None"}
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.room.join(", ")}
                  </TableCell>
                  <TableCell className="tableCell">
                    {getDate(row.startDate)} - {getDate(row.endDate)}
                  </TableCell>
                  <TableCell className="tableCell">{row.price}</TableCell>
                  <TableCell className="tableCell">{row.payment}</TableCell>
                  <TableCell className="tableCell status">
                    <span className={`status ${row.status}`}>{row.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Transaction;
