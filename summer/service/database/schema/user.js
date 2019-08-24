const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
 
//创建userSchema
const userSchema =new Schema({
    userId:{type:ObjectId},
    userName:{unique:true,type:String},//unique表示不重复
    password:{type:String},
    createAt:{type:Date,default:Date.now()},//default表示默认值
    lastLoginAT:{type:Date,default:Date.now()}
});
 
//发布模型
mongoose.model("user",userSchema);//这里的user对应数据库中的集合
