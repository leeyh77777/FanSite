const express = require('express');
const file = require('../models/file');
const router = express.Router();

router.use(async (req, res) => {
    let success = false;
	let returnData = {};
	let message = "";
    const mode = req.body.mode || req.query.mode;
    const data = req.body.mode?req.body:req.query;
    try {
        switch (mode) {
            /** 파일 업로드 처리  */
            case "upload" : 
				const result = await file.upload(data);
				if (!result) {
					throw new Error("파일 업로드 실패");
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
	const result = { 
		success,
		data : returnData,
		message
	};
	return res.json(result);
});


module.exports = router;