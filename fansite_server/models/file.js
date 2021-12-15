const { sequelize, Sequelize : { QueryTypes }} = require("./index");
const path = require('path');
const fs = require('fs').promises;
/**
* 파일 업로드 관련 
*
*/
const file = {
	/** 파일 업로드 처리 */
	async upload(data) {
		/** 유효성 검사 */
		if (!data.fileName || !data.fileType || !data.data) {
			throw new Error('잘못된 접근입니다.');
		}
		
		if (data.fileType.indexOf("image") == -1) {
			throw new Error("이미지 형식의 파일만 업로드 가능합니다.");
		}
		
		try {
			const sql = `INSERT INTO fileinfo (fileName, fileType) VALUES (:fileName, :fileType)`;
			const replacements = {
				fileName : data.fileName,
				fileType : data.fileType,
			};
			const result = await sequelize.query(sql, {
				replacements,
				type : QueryTypes.INSERT,
			});
			
			const ext = path.extname(data.fileName);
			console.log(ext);
			const idx = result[0];
			const pth = path.join(__dirname, '../public/upload/' + idx + ext);
			const buffers = new Buffer(data.data, "base64");
			await fs.writeFile(pth, buffers);
			
			/**  파일 업로드 후 저장된 파일 정보 전송 */
			const fileInfo = await file.get(idx);
			console.log(fileInfo);
			return fileInfo;
		} catch (err) {
			console.error(err);
			return false;
		}
	},
	/**
	* 파일 정보 조회 
	*
	*/
	async get(idx) {
		try {
			const sql = "SELECT * FROM fileinfo WHERE idx = ?";
			const rows = await sequelize.query(sql, {
				replacements : [idx],
				type : QueryTypes.SELECT,
			});
			
			if (rows.length == 0)
				return false;
		
			const info = rows[0];
			const ext = path.extname(info.fileName);
			info.imageUrl = "/upload/" + idx + ext;
			info.imagePath = path.join(__dirname, '../upload/' + idx + ext);
			
			return info;
		} catch (err) {
			console.error(err);
			return false;
		}
	}
};
module.exports = file;