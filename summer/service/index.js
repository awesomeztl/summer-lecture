const Koa = require('koa');
const App = new Koa();
const {connect,initSchemas} = require("./database/init");
const mongoose = require("mongoose");
 
(async ()=>{
    await connect();//异步连接数据库操作
    initSchemas();
    const user = mongoose.model("user");//与发布模型中的user对应
    let oneuser = new user({userName:"Ag_wenbi",password:"123456"});//添加对应的字段名称，与user.js中的对应
    oneuser.save().then(()=>{
        console.log("数据插入成功！");
    });
    let userInfo = await user.findOne().exec();//查找第一条数据
    console.log("----------------");
    console.log(userInfo);
    console.log("----------------");
})()
 
App
    .use(async(ctx)=>{
        ctx.body = "<h1>hello koa2</h1>";
    })
    .listen(3000,()=>{
        console.log("3000端口启动成功!");
    })
