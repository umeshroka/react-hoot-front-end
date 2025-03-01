import { Link } from 'react-router';

const LogList = (props) => {
    return (
        <main>
          {props.logs.map((log) => (
            <Link key={log._id} to={`/logs/${log._id}`}>
              <article>
                <header>
                  <h2>{log.title}</h2>
                  <p>
                    {`${log.author.username} posted on
                    ${new Date(log.createdAt).toLocaleDateString()}`}
                  </p>
                </header>
                <p>{log.text}</p>
              </article>
            </Link>
          ))}
        </main>
      );
};
export default LogList;
