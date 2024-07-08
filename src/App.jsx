import { Routes, Route } from "react-router-dom";
// importing components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { setUserCredentials } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userCredentials = JSON.parse(
      localStorage.getItem("savvy-user-credentials")
    );
    userCredentials && dispatch(setUserCredentials(userCredentials));
  }, []);

  return (
    <main className="h-[100vh] p-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
