import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as logService from "../../services/logService";
import { UserContext } from "../../contexts/UserContext";

const LogDetails = (props) => {
  const { logId } = useParams();
  const { user } = useContext(UserContext);
  const [log, setLog] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      const logData = await logService.show(logId);
      setLog(logData);
    };
    fetchLog();
  }, [logId]);


  if (!log) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <h1>{log.title}</h1>
          <p>
            {`${log.author.username} posted on
                ${new Date(log.createdAt).toLocaleDateString()}`}
          </p>
          {log.author._id === user._id && (
            <>
              <Link to={`/logs/${logId}/edit`}>Edit</Link>

              <button onClick={() => props.handleDeleteLog(logId)}>
                Delete
              </button>
            </>
          )}
        </header>
        <p>{log.text}</p>
      </section>
    </main>
  );
};

export default LogDetails;
