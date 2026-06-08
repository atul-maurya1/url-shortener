import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config();

app.get("/", (req, res) => {
	res.send("live"); 
});

const PORT = process.env.PORT;
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`server is running at http://localhost:${PORT}`);
	});
})
.catch(() => {
    console.log("connection fail") 
})
