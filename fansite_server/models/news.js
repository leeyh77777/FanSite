const { sequelize, Sequelize : { QueryTypes } } = require('./index');

/**
* 뉴스 model
*
*/
const news = {
	/** 필수 입력 항목 */
	required : {
		memNo : "회원만 사용가능한 서비스 입니다.",
		status : "뉴스 구분을 선택하세요.",
		subject : "뉴스명을 입력하세요.",
		content : "뉴스내용을 입력하세요.",
	},
	async addNews(data) {
		this.checkData(data); // 데이터 유효성 검사
		
		const replacements = {
				memNo : data.memNo || 0,
				status : data.status,
				subject : data.subject,
				content : data.content,
		};
		const sql = `INSERT INTO newslist (memNo, status, subject, content) 
								VALUES (:memNo, :status, :subject, :content)`;
		try {
			const result = await sequelize.query(sql, {
				replacements,
				type : QueryTypes.INSERT,
			});
			return result[0];
		} catch (err) {
			console.error(err);
			return false;
		}		
	},
	async editNews(data) {
		this.required.idx = "뉴스등록번호가 누락되었습니다.";
		this.checkData(data);
		
		const info = await this.get(data.idx);
		if (!info) {
			throw new Error("수정할 뉴스내역이 없습니다.");
		}
		
		if (info.memNo != data.memNo) {
			throw new Error('본인이 작성한 뉴스 내역만 수정 가능합니다.');
		}
		
		try {
			const sql = `UPDATE newslist 
									SET 
										status = :status,
										subject = :subject,
										content = :content 
								WHERE 
									idx = :idx`;
			const replacements = {
					status : data.status,
					subject : data.subject,
					content : data.content,
					idx : data.idx,
			};
			await sequelize.query(sql, {
					replacements,
					type : QueryTypes.UPDATE,
			});
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
		
	},
	/** 작업 삭제 */
	async deleteNews(idx) {		
		try {
			const sql = "DELETE FROM newslist WHERE idx = ?";
			await sequelize.query(sql, {
				replacements : [idx],
				type : QueryTypes.DELETE,
			});
			return true;
		} catch(err) {
			console.error(err);
			return false;
		}
	},
	/**
	* 뉴스목록
	*
	* @param status - actor, singer, etc 
	*/
	async getList(memNo, status) {
		try {
			const sql = `SELECT * FROM newslist WHERE status = :status ORDER BY regDt DESC`;
			const replacements = { status };						
			const rows = await sequelize.query(sql, {
					replacements,
					type : QueryTypes.SELECT,
			});
			
			return rows;
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	/**
	* 작업내용 조회 
	*
	* @param idx 뉴스등록번호 
	*/
	async get(idx) {
		try {
			const sql = "SELECT * FROM newslist WHERE idx = ?";
			const rows = await sequelize.query(sql, {
				replacements : [idx],
				type : QueryTypes.SELECT,
			});
			
			if (rows.length == 0) {
				return false;
			}
			
			const data = rows[0];
			if (data) {
				const date = new Date(data.regDt);
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				month = (month < 10)?"0"+month:month;
				let day = date.getDate();
				day = (day < 10)?"0"+day:day;
				data.regDt = `${year}.${month}.${day}`;
				
				data.contentHtml = data.content.replace(/\r\n/g, "<br>");
				
			}
			return data;
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	/** 데이터 유효성 검사 */
	checkData(data) {
		if (data.mode == 'edit') { // 뉴스내용 수정 
			this.required.idx = "뉴스등록번호가 누락되었습니다.";
		}
		const required = this.required;
		for (let key in required) {
			if (!data[key]) {
				throw new Error(required[key]);
			}
		}
	}
};

module.exports = news;