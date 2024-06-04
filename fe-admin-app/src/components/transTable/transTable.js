import "./transTable.css";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch";

const TransTable = () => {
  // const { data } = useFetch("http://localhost:5000/transaction");
  const { data } = useFetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/transaction`
  );

  const rows = data.map((item) => {
    const getDate = (date) => {
      const currentDate = new Date(date);
      return `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;
    };

    return {
      id: item._id,
      user: item.user,
      hotel: item.hotel ? item.hotel.name : "None",
      room: item.room.join(","),
      date: `${getDate(item.startDate)}-${getDate(item.endDate)}`,
      price: item.price,
      payment: item.payment,
      status: item.status,
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "user",
      headerName: "User",
      width: 150,
    },
    {
      field: "hotel",
      headerName: "Hotel",
    },
    {
      field: "room",
      headerName: "Room",
    },
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "price",
      headerName: "Price",
    },
    {
      field: "payment",
      headerName: "Payment Method",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
    },
  ];

  return (
    <div className="table-trans">
      <Box sx={{ height: 550, overflow: "auto", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default TransTable;
