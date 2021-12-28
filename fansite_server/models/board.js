const { sequelize, Sequelize : { QueryTypes } } = require("./index");
const member = require("./member");

const board = {
    /** 필수데이터 확인 */
    required : {
		subject : "제목을 입력하세요.",
		content : "게시글 내용을 입력하세요.",
	},

    /** 게시글 추가 */
    async add(data) {
        try {
            this.checkData(data); 
            const sql = `INSERT INTO board ( poster, subject, content) VALUES ( :poster, :subject, :content)`;
            const replacements = {
                poster : data.poster,
                subject : data.subject,
                content : data.content,
            };
            const result = await sequelize.query(sql, {
                replacements,
                type: QueryTypes.INSERT
            });
            return result[0];
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    /** 게시글 리스트 */
    async get() {
        try {
            const sql = `SELECT * FROM board ORDER BY regDt ASC`;						
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

    /** 게시글 보기 */
    async view(idx) {
        try {
            const sql = `SELECT * FROM board WHERE idx = ?`;
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
        } catch(err) {
            console.error(err);
            return false;
        }
    },

    /** 게시글 수정 */
    async edit(data) {
        this.required.idx = "게시글 등록번호가 누락되었습니다."
        this.checkData(data);

        const info = await this.get(data.idx);
        if (!info) {
            throw new Error("수정할 게시글이 없습니다.");
        }
        
        if (info.memNo != data.memNo) {
            throw new Error("본인이 작성한 게시글내역만 수정 가능합니다.")
        }

        try {
            const sql = `UPDATE board
                            SET
                                subject = :subject,
                                content = :content
                            WHERE
                                idx = :idx`;
            const replacements = {
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

    /** 게시글 삭제 */
    async delete(idx) {
        try {
            const sql = "DELETE FROM board WHERE idx = ?";
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

	/** 데이터 유효성 검사 */
    checkData(data) {
        const required = this.required;
        for (let key in required) {
            if (!data[key]) {
                throw new Error(required[key]);
            }
        }
    }
};

module.exports = board;