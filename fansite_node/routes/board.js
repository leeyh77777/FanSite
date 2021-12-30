const express = require("express");
const router = express.Router();
const board = require("../models/board");

router.use(async (req, res) => {
    const data = req.body;
    const mode = data.mode;
    let message = "";
    let success = false;
    let returnData = {};
    let result = {};
    try {
        switch (mode) {
			case "list" : 
				success = true;
				returnData = await board.get(data);
				break;
            case "add":
                result = await board.add(data);
                if (!result) {
                    throw new Error("게시글 등록 실패");
                }
                success = true;
                returnData = { idx : result };
                break;
            case "get":
                if (!data.idx) {
					throw new Error("게시글등록번호 누락");
				}
				
				result = await board.get(data.idx);
				if (!result) {
					throw new Error("게시글이 없습니다.");
				}
				
				success = true;
				returnData = result;
				break;
            case "view":
                if (!data.memNo) {
					throw new Error("회원전용 서비스 입니다.");
				}
				
				const idx = data.idx || 0;
				result = await board.view(idx);
				if (!result) {
					throw new Error('목록 조회 실패');
				}
				
				success = true;
				returnData = result;
				break;
            case "delete":  				
				const info = await board.view(data.idx);
				if (!info) {
					throw new Error('삭제할 게시글이 없습니다.');
				}
				
				result = await board.delete(data.idx);
				if (!result) {
					throw new Error('게시글삭제 실패하였습니다');
				}
				
				success = true;
				break;
            case "edit":
                result = await board.edit(data);
                if (!result) {
					throw new Error('게시글수정 실패하였습니다');
				}
                				
				success = true;
				returnData = result;
				break;
                
            default :
            if (req.method.toLowerCase() == 'GET' && data.origin != 'front') {
                return res.redirect('/');
            }
        } 
    } catch (err) {
        console.log(err);
        message = err.message;
    }
    const jsonData = {
        success, message, data : returnData
    };
    res.json(jsonData);
});
module.exports = router;