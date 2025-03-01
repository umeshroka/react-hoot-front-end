import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import LogList from "./components/LogList/LogList";
import LogDetails from "./components/LogDetails/LogDetails";
import LogForm from "./components/LogForm/LogForm";

import { UserContext } from "./contexts/UserContext";
import * as logService from "./services/logService";

const App = () => {
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLogs = async () => {
      const LogsData = await logService.index();

      setLogs(LogsData);
    };
    if (user) fetchUserLogs();
  }, [user]);

  const handleAddLog = async (logFormData) => {
    const newLog = await logService.create(logFormData);
    setLogs([newLog, ...logs]);
    navigate("/logs");
  };

  const handleDeleteLog = async (logId) => {
    const deletedLog = await logService.deleteLog(logId);
    setLogs(logs.filter((hoot) => hoot._id !== deletedLog._id));
    navigate("/logs");
  };

  const handleUpdateLog = async (logId, logFormData) => {
    const updatedLog = await logService.update(logId, logFormData);
    setLogs(logs.map((log) => (logId === log._id ? updatedLog : log)));
    navigate(`/logs/${logId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/logs" element={<LogList logs={logs} />} />
            <Route
              path="/logs/:logId"
              element={<LogDetails handleDeleteLog={handleDeleteLog} />}
            />
            <Route
              path="/logs/new"
              element={<LogForm handleAddLog={handleAddLog} />}
            />
            <Route
              path="/logs/:logId/edit"
              element={<LogForm handleUpdateLog={handleUpdateLog} />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
