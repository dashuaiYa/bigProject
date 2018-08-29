
// const productControl = require('../controller/productControl');

// const pool = require('../db/dbpool')();

const userControl = require('../controller/userControl');
// const 

module.exports = function (app) {

    // app.use(function(req, res, next) {
    //     const token = req.body.token || req.query.token || req.headers['x-access-token'];
    //     if(token) {
    //         jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
    //             if (err) {
    //                 return res.json({ success: false, message: '无效的token.' });    
    //             } else {
    //                 // 如果验证通过，在req中写入解密结果
    //                 req.decoded = decoded;  
    //                 //console.log(decoded)  ;
    //                 next(); //继续下一步路由
    //             }
    //       });
    //     } else {
    //         // 没有拿到token 返回错误 
    //         return res.status(403).json({ 
    //             success: false, 
    //             message: '没有找到token.' 
    //         });
    //     };
    // })
    app.post('/login.json', userControl.login);
    app.post('/signup.json', userControl.signup);
    app.get('/isLogin.json', userControl.isLogin);

    app.get("/wechat", function(req, res) {
        res.send(req.query.echostr);
    })

    app.use(function(req, res, next) {
        console.log(req.session.isLogin);
        if(!req.session.isLogin) {
            res.json({
                code: '400',
                msg: '您还没有登录！'
            })
            return;
        }

        next();
    });

    app.get('/', function (req, res) {
        // pool.getConnection(function (err, conn) {
        //     if (err) {
        //         res.status(400).json({ code: '-200', msg: '数据库连接失败' });
        //         return;
        //     }
        //     conn.query('select * from users;', '', function (err, rs) {
        //         if (err) {
        //             res.status(400).json({ code: '-200', msg: '注册用户出错:' + err.message });
        //             return;
        //         }
        //         res.status(200).json({ result: rs });
        //     });
        //     conn.release();
        // });
    })



    app.get('/user/userInfo.json', userControl.getUserInfo);

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}