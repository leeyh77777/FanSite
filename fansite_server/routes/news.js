const router = require('express').Router();
const news = require("../models/news");

router.use(async (req, res) => {
	const data = req.body;
	const mode = data.mode;
	let success = false;
	let returnData = {};
	let message = "";
	let result = {};
	console.log(data);
	try {
		switch (mode) {
			/** 뉴스 추가 */
			case "add": 
				const idx = await news.addNews(data);
				if (!idx) {
					throw new Error('뉴스등록 실패하였습니다.');
				}
				
				success = true;
				returnData = { idx };
				break;
			/** 뉴스 수정 */
			case "edit" : 
				result = await news.editNews(data);
				if (!result) {
					throw new Error('뉴스수정 실패하였습니다');
				}
				
				success = true;
				returnData = result;
				break;
			/** 뉴스 삭제 */
			case "delete" :
				if (!data.idx) {
					throw new Error('뉴스등록번호 누락');
				}
				
				const info = await news.get(data.idx);
				if (!info) {
					throw new Error('삭제할 작업내역이 없습니다.');
				}
				
				if (info.memNo != data.memNo) {
					throw new Error('본인이 작성한 작업내역만 삭제 가능합니다.');
				}
				
				result = await news.deleteNews(data.idx);
				if (!result) {
					throw new Error('작업삭제 실패하였습니다');
				}
				
				success = true;
				break;
			/** 뉴스 목록 */
			case "getList":
				if (!data.memNo) {
					throw new Error("회원전용 서비스 입니다.");
				}
				
				const memNo = data.memNo || 0;
				const status = data.status || "etc";
				result = await news.getList(memNo, status);
				if (!result) {
					throw new Error('뉴스 목록 조회 실패');
				}
				
				success = true;
				returnData = result;
				break;
			/** 뉴스 내용 */
			case "get" : 
				if (!data.idx) {
					throw new Error("뉴스등록번호 누락");
				}
				
				result = await news.get(data.idx);
				if (!result) {
					throw new Error("뉴스가 없습니다.");
				}
				
				success = true;
				returnData = result;
				break;
			default :
				if (req.method.toLowerCase() == 'GET' && data.origin != 'front') {
					return res.redirect('/');
				}
		}
	} catch(err) {
		success = false;
		message = err.message;
	}
	
	const _result = {
		success, 
		data : returnData,
		message,
	};
	return res.json(_result);
});

module.exports = router;