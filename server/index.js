const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

app.get("/", (req, res) => {
    res.json({ 
        message: "Hello World",
     });
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});