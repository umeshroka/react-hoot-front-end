import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import * as userService from "../../services/userService";

import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [sentimentData, setSentimentData] = useState([]);
  const [emotionsData, setEmotionsData] = useState([]);
  const [keywordData, setKeywordData] = useState({});
  const [entityData, setEntityData] = useState({});

  const [loading, setLoading] = useState(true); 
  const [noLogs, setNoLogs] = useState(false); 


  useEffect(() => {
    const fetchUserDashboardData = async () => {
      if (!user?._id) return;

      try {
        const data = await userService.index(user._id);

        if (
          !data.sentimentData.length &&
          !data.emotionsData.length &&
          !Object.keys(data.keywordData).length &&
          !Object.keys(data.entityData).length
        ) {
          setNoLogs(true); // Set noLogs to true if there is no data
        } else {
          setSentimentData(data.sentimentData);
          setEmotionsData(data.emotionsData);
          setKeywordData(data.keywordData);
          setEntityData(data.entityData);
          setNoLogs(false); // Set noLogs to false if there is data
        }

        setSentimentData(data.sentimentData);
        setEmotionsData(data.emotionsData);
        setKeywordData(data.keywordData);
        setEntityData(data.entityData);
        setLoading(false);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    if (user) fetchUserDashboardData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (noLogs) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>No logs yet</p>
      </div>
    );
  }

  const sortedSentimentData = sentimentData.sort((a, b) => new Date(a.date) - new Date(b.date));
  const sortedEmotionsData = emotionsData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const sentimentChartData = {
    labels: sortedSentimentData.map((item) => item.date),
    datasets: [
      {
        label: "Sentiment Score",
        data: sortedSentimentData.map((item) => item.score),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const emotionsChartData = {
    labels: sortedEmotionsData.map((item) => item.date), // Date as labels
    datasets: [
      {
        label: "Joy",
        data: sortedEmotionsData.map((item) => item.emotions.joy),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
      {
        label: "Sadness",
        data: sortedEmotionsData.map((item) => item.emotions.sadness),
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.1,
      },
      {
        label: "Fear",
        data: sortedEmotionsData.map((item) => item.emotions.fear),
        fill: false,
        borderColor: "rgba(255, 159, 64, 1)",
        tension: 0.1,
      },
      {
        label: "Disgust",
        data: sortedEmotionsData.map((item) => item.emotions.disgust),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Anger",
        data: sortedEmotionsData.map((item) => item.emotions.anger),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };

  const keywordChartData = {
    labels: Object.keys(keywordData),
    datasets: [
      {
        label: "Keyword Frequency",
        data: Object.values(keywordData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Donut chart for Entity Frequency
  const entityChartData = {
    labels: Object.keys(entityData),
    datasets: [
      {
        label: "Entity Frequency",
        data: Object.values(entityData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ width: "45%", margin: "20px auto" }}>
        <h3>Sentiment Trend</h3>
        <Line data={sentimentChartData} />
      </div>

      <div style={{ width: "45%", margin: "20px auto" }}>
        <h3>Emotions Trend</h3>
        <Line data={emotionsChartData} />
      </div>

      <div style={{ width: "45%", margin: "20px auto" }}>
        <h3>Keyword Frequency</h3>
        <Doughnut data={keywordChartData} />
      </div>

      <div style={{ width: "45%", margin: "20px auto" }}>
        <h3>Entity Frequency</h3>
        <Doughnut data={entityChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
