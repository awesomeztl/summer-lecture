const mongoose = require("mongoose");
const db = "mongodb://114.115.247.10:27017/smile-db";
const glob = require("glob");//要安装glob才能引用，下文才能使用*等符号
const {resolve} = require("path");
 
exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,"./schema",'**/*.js')).forEach(require)//表示遍历文件夹schema下的所有js文件
}
 
let maxConnectTimes = 0;
exports.connect = ()=>{
    mongoose.connect(db);//连接数据库
    return new Promise((resolve,reject)=>{
        //增加数据库监听事件
        mongoose.connection.on("disconnected",()=>{//监听数据库重连
            if(maxConnectTimes <= 3){
                console.log("数据库断开连接，正在重新连接...");
                maxConnectTimes++;
                mongoose.connect(db);//连接数据库
            }else{
                reject();
                console.log("数据库出现问题");
            }
        });
        mongoose.connection.on("error",(err)=>{//监听数据库错误
            if(maxConnectTimes <= 3){
                console.log("数据库错误，正在重新连接...");
                mongoose.connect(db);//连接数据库
            }else{
                reject(err);
                console.log("数据库出现问题");
            }
        });
        mongoose.connection.once("open",()=>{//监听数据库打开的时候
            maxConnectTimes = 0
            console.log("数据库连接成功！");
            resolve()
        })
        //增加数据库监听事件
    })
}
