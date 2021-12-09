const express = require("express");
const router = express.Router();
const board = require("../models/board");

router.use(async (req, res) => {
    const data = req.body;
    const mode = data.mode;
    let result = {
        message = "",
    };
    try {
        switch (mode) {
            case "add":
                result = await board.add(data);
                break;
            case "get":
                result = await board.get(data);
                break;
            case "view":
                result = await board.view(data.idx);
                break;
            case "delete":
                result = await board.delete(data.idx);
                break;
            case "edit":
                result = await board.edit(data);
                break;
        } 
    } catch (err) {
        console.log(err.message);
        result.message = err.message;
    }
    res.json(result);
});
module.exports = router;