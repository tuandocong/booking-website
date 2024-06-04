import "./RoomTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RoomTable = () => {
  const { user } = useContext(AuthContext);
  const { data, reFetch } = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/rooms`
  );
  const rows = data;

  const deleteHandler = (e) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");

    if (shouldDelete) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", user.token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        id: e._id,
        hotelId: e.hotelId,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/rooms/delete-room`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          reFetch();
        })
        .catch((error) => console.error(error));
    }
  };

  const navigate = useNavigate();
  const editHandler = (id) => {
    navigate(`/rooms/edit/${id}`);
  };

  return (
    <TableContainer
      style={{ maxHeight: "500px", overflow: "auto" }}
      component={Paper}
      className="table-rt"
    >
      <Table
        sx={{ minWidth: 650, maxHeight: "100vh" }}
        aria-label="simple table"
      >
        <TableHead className="table-head-rt">
          <TableRow>
            <TableCell className="tableCell"> ID</TableCell>
            <TableCell className="tableCell">Title</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Max People</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">{row.title}</TableCell>
              <TableCell className="tableCell">{row.desc}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.maxPeople}</TableCell>
              <TableCell className="tableCell">
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    className="btn-delete-rt"
                    onClick={() => deleteHandler(row)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn-edit-rt"
                    onClick={() => editHandler(row._id)}
                  >
                    Edit
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomTable;
