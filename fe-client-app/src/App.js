import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Transaction from "./pages/transaction/transaction";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  //kiem tra thong tin user
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels"
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels/:id"
          element={
            <ProtectedRoute>
              <Hotel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
