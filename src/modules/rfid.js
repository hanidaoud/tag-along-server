const tagLength = 4;

module.exports = {
	tag: (uid) => {
		if(uid == null || uid.length < (tagLength * 5 - 1)) {
			return null;
		}
		
		var bytes = uid.split(' ').filter(el => el.length != 0);
		
		return bytes.length == tagLength ? bytes.join(' ') : null;
	}
};