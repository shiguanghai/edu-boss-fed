(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"0bc8":function(e,r,t){},"2f68":function(e,r,t){"use strict";t("0bc8")},"9ed6":function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login"},[t("el-form",{ref:"form",staticClass:"login-form",attrs:{"label-position":"top",model:e.form,rules:e.rules,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[t("el-input",{model:{value:e.form.phone,callback:function(r){e.$set(e.form,"phone",r)},expression:"form.phone"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),t("el-form-item",[t("el-button",{staticClass:"login-btn",attrs:{type:"primary",loading:e.isLoginLoading},on:{click:e.onSubmit}},[e._v(" 登录 ")])],1),t("el-form-item",[t("p",[e._v("供测试权限控制：15321919571 | 111111")]),t("p",[e._v("没有课程、广告管理权限")])])],1)],1)},o=[],n=t("1da1"),a=(t("96cf"),t("2b0e")),i=t("06a0"),l=a["default"].extend({name:"LoginIndex",data:function(){return{form:{phone:"18201288771",password:"111111"},rules:{phone:[{required:!0,message:"请输入手机号",trigger:"blur"},{pattern:/^1\d{10}$/,message:"请输入正确的手机号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:18,message:"长度在 6 到 18 个字符",trigger:"blur"}]},isLoginLoading:!1}},methods:{onSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var t,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$refs.form.validate();case 3:return e.isLoginLoading=!0,r.next=6,Object(i["e"])(e.form);case 6:t=r.sent,s=t.data,1!==s.state?e.$message.error(s.message):(e.$store.commit("setUser",s.content),e.$router.push(e.$route.query.redirect||"/"),e.$message.success("登录成功")),r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](0),console.log("登录失败",r.t0);case 14:e.isLoginLoading=!1;case 15:case"end":return r.stop()}}),r,null,[[0,11]])})))()}}}),c=l,u=(t("2f68"),t("2877")),m=Object(u["a"])(c,s,o,!1,null,"3c5f7378",null);r["default"]=m.exports}}]);
//# sourceMappingURL=login.6e1751ab.js.map