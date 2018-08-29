const pool = require('../db/dbpool')();

module.exports = {
    userInfo: function() {
        pool.getConnection(function (err, conn) {
            if (err) {
                res.status(400).json({ code: '-200', msg: '数据库连接失败' });
                return;
            }
            conn.query('select * from users;', '', function (err, rs) {
                if (err) {
                    res.status(400).json({ code: '-200', msg: '注册用户出错:' + err.message });
                    return;
                }
                res.status(200).json({ result: rs });
            });
            conn.release();
        });
    }
}