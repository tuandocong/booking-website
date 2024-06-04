import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import EditRoom from "./pages/editRoom/EditRoom";
import EditHotel from "./pages/editHotel/EditHotel";

function App() {
  //kiem tra thong tin user
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user.isAdmin) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="login" element={<Login />} />

            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <List type="user" />
                </ProtectedRoute>
              }
            />

            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List type="hotel" />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />

              <Route
                path="edit/:idHotel"
                element={
                  <ProtectedRoute>
                    <EditHotel />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List type="room" />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />

              <Route
                path="edit/:idRoom"
                element={
                  <ProtectedRoute>
                    <EditRoom />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="transactions"
              element={
                <ProtectedRoute>
                  <List type="trans" />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
