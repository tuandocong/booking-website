import "./hoteltable.css";
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
const HotelTable = () => {
  const { user } = useContext(AuthContext);
  const token = user.token;

  // const { data, reFetch } = useFetch("http://localhost:5000/hotels");
  const { data, reFetch } = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/hotels`
  );
  const rows = data;

  const deleteHandler = (e) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");

    if (shouldDelete) {
      const hotelId = e.target.id;
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: "Add your name in the body",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/hotels/delete-hotel/${hotelId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          alert(result);
          reFetch();
        })
        .catch((error) => {
          alert("Delete fail! Check this Hotel in transtion.");
          console.error(error);
        });
    }
  };

  const navigate = useNavigate();
  const editHandler = (id) => {
    navigate(`/hotels/edit/${id}`);
  };
  return (
    <TableContainer
      style={{ maxHeight: "500px", overflow: "auto" }}
      component={Paper}
      className="table-ht"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="table-head-ht">
          <TableRow>
            <TableCell className="tableCell"> ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Title</TableCell>
            <TableCell className="tableCell">City</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">{row.type}</TableCell>
              <TableCell className="tableCell">{row.title}</TableCell>
              <TableCell className="tableCell">{row.city}</TableCell>
              <TableCell className="tableCell">
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    className="btn-delete-ht"
                    id={row._id}
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                  <button
                    className="btn-edit-ht"
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

export default HotelTable;
