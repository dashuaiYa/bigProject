
// const userModel = require('../models/userModel');
const pool = require('../db/dbpool')();

module.exports = {
    login: function(req, res) {
        const userPhone = req.body.userPhone;
        const userPwd = req.body.userPwd;
        // const userPhone = '12345678901';
        // const userPwd = 'shuai';
        const query = 'SELECT * FROM users WHERE phone="' + userPhone + '" and password=PASSWORD("' + userPwd + '")';
        pool.getConnection(function(err, conn) {
            if(err) {
                res.status(400).json({ code: '-200', msg: '数据库连接失败' });
            };
            conn.query(query, '', function (err, rs) {
                if (err) {
                    res.status(400).json({ code: '-200', msg: '查询用户出错:' + err.message });
                    return;
                }
                if(rs.length === 0){
                    res.status(401).json({ code: '-200', msg: '登录失败，用户名或密码输入错误！'});
                    return;
                }
                // res.status(200).json({token: jwt.sign({ userid: rs[0].uid }, 'secret') });
                // console.log(rs);
                req.session.isLogin = true;
                req.session.uid = rs[0].uid;
                res.status(200).json({ code: 200, msg: '用户登录成功！' });
            });
            conn.release();
        })
    },
    isLogin: function(req, res) {
        if(!req.session.isLogin) {
            res.json({
                code: '400',
                msg: '您还没有登录！'
            })
        }else{
            res.json({
                code: '200',
                msg: '您已经登录！'
            })
        }
    },
    signup: function(req, res) {
        const name = req.body.userName;
        const pwd = req.body.userPwd;
        const phone = req.body.phone;
        const query = 'INSERT INTO users (name,password,phone) VALUE ("' + name + '", PASSWORD("' + pwd + '"), "' + phone + '")';
        pool.getConnection(function (err, conn) {
            if (err) {
                res.status(400).json({ code: '-200', msg: '数据库连接失败' });
                return;
            };
            conn.query(query, '', function (err, rs) {
                if (err) {
                    res.status(400).json({ code: '-200', msg: '注册用户出错:' + err.message });
                    return;
                }
                res.status(200).json({code: '200', msg: '注册成功', result: {rs}});
            });
            conn.release();
        });
    },
    getUserInfo: function(req, res) {
        const uid = req.session.uid;
        const query = 'SELECT uid,name,phone,createTime FROM users WHERE uid="' + uid + '"';
        pool.getConnection(function (err, conn) {
            if (err) {
                res.status(400).json({ code: '-200', msg: '数据库连接失败' });
                return;
            };
            conn.query(query, '', function (err, rs) {
                if (err) {
                    res.status(400).json({ code: '-200', msg: '注册用户出错:' + err.message });
                    return;
                }
                res.status(200).json(rs);
            });
            conn.release();
        });
    }
}