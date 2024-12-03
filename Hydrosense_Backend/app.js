import express from 'express';
import cors from 'cors';
import index from './src/routes/index.router.js';
import config from './src/config/config.js';


const app = express();
const PORT = 3001;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/", index);

app.use((req, res) => {
    res.status(404).send("Wrong route");
});

config.connect().then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT); 
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
    console.log("No database available");
});
