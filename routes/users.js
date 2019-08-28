var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');

/* POST users listing. */
//登录
router.post('/login', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    handler(req, res, "user", {name: req.body.username},function(data){
        if(data.length===0){
            res.end('{"err":"抱歉，系统中并无该用户，如有需要，请向管理员申请"}');
        }else if(data[0].password !== password){
            res.end('{"err":"密码不正确"}');
        }else if(data.length!==0&&data[0].password===password){
            
            req.session.username = req.body.username; //存session
            req.session.password = password;
            
            res.end('{"success":"true"}');
        }
        
    });
    
});

router.post('/add', function(req, res, next) {
    //console.log(req.body);
    var md5 = crypto.createHash('md5');
    req.body.password = md5.update(req.body.password).digest('base64');
    handler(req, res, "user", {name: req.body.username},function(data){
        if(data.length!==0){
            res.end('{"err":"抱歉，系统中已有该用户，请重新注册"}');
        }else 
        {
            handler(req, res, "user", req.body,function(data){
        
                //console.log(data);
                if(data.length==0){
                    res.end('{"err":"抱歉，添加失败"}');
                }else{
                    res.end('{"success":"添加成功"}');
                }
            });
        }
    });
});

/*router.post('/post',function(req,res){
    var obj=req.body;
    var stu02=new student();
    stu02.addStu({
        stuname:1,
        age:1,
        sex:1,
        address:1
    },function(rs){
        res.json({success:true});
    });
});*/

module.exports = router;