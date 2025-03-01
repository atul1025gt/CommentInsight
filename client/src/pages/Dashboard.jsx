import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  // Function to generate random data for 10 comments
  const generateRandomData = () => {
    const emotionLabels = ["joy", "sadness", "anger", "fear", "surprise"];
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        sentiment_probability: parseFloat((Math.random()).toFixed(2)),
        emotion_probability: parseFloat((Math.random()).toFixed(2)),
        spam_probability: parseFloat((Math.random()).toFixed(2)),
        sarcasm_probability: parseFloat((Math.random()).toFixed(2)),
        emotion_label:
          emotionLabels[Math.floor(Math.random() * emotionLabels.length)],
      });
    }
    return data;
  };

  const [commentsData, setCommentsData] = useState([]);

  // Generate random data on component mount
  useEffect(() => {
    setCommentsData(generateRandomData());
  }, []);

  // Compute average probabilities across all comments
  const computeAverageProbabilities = (data) => {
    let sumSentiment = 0,
      sumEmotion = 0,
      sumSpam = 0,
      sumSarcasm = 0;
    data.forEach((comment) => {
      sumSentiment += comment.sentiment_probability;
      sumEmotion += comment.emotion_probability;
      sumSpam += comment.spam_probability;
      sumSarcasm += comment.sarcasm_probability;
    });
    const count = data.length;
    return {
      sentiment: count ? parseFloat((sumSentiment / count).toFixed(2)) : 0,
      emotion: count ? parseFloat((sumEmotion / count).toFixed(2)) : 0,
      spam: count ? parseFloat((sumSpam / count).toFixed(2)) : 0,
      sarcasm: count ? parseFloat((sumSarcasm / count).toFixed(2)) : 0,
    };
  };

  const averageProbabilities = computeAverageProbabilities(commentsData);

  // Transform the averages for the bar chart
  const avgChartData = [
    { category: "Sentiment", value: averageProbabilities.sentiment },
    { category: "Emotion", value: averageProbabilities.emotion },
    { category: "Spam", value: averageProbabilities.spam },
    { category: "Sarcasm", value: averageProbabilities.sarcasm },
  ];

  // Aggregate emotion label distribution for the pie chart
  const emotionDistribution = commentsData.reduce((acc, comment) => {
    const label = comment.emotion_label;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(emotionDistribution).map((label) => ({
    name: label,
    value: emotionDistribution[label],
  }));

  // Define colors for the pie chart slices
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

  return (
    <div className="dashboard">
      <header className="app-header">
        <div className="app-name">CommentInsight</div>
      </header>
      <div className="dashboard-content">
        <h1>Real Time Sentiment Analysis</h1>

        {/* Bar Chart: Overall Average Probabilities */}
        <div className="chart-container">
          <h2>Average Probabilities</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={avgChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 1]} />
              <Tooltip formatter={(value) => `${value}`} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Average Probability" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Emotion Label Distribution */}
        <div className="chart-container">
          <h2>Emotion Label Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
