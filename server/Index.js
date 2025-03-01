import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/analyze-text", async (req, res) => {
    try {
        const { text } = req.body;
        const response = await axios.post("http://localhost:5000/predict/", { text });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "NLP Service Unavailable" });
    }
});

app.listen(4000, () => console.log("MERN API running on port 4000"));
