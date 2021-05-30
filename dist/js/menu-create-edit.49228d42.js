(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["menu-create-edit"],{2257:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"e",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return s})),n.d(t,"f",(function(){return i})),n.d(t,"a",(function(){return l})),n.d(t,"g",(function(){return c}));var r=n("b32d"),a=function(e){return Object(r["a"])({method:"POST",url:"/boss/menu/saveOrUpdate",data:e})},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;return Object(r["a"])({method:"GET",url:"/boss/menu/getEditMenuInfo",params:{id:e}})},u=function(){return Object(r["a"])({method:"GET",url:"/boss/menu/getAll"})},s=function(e){return Object(r["a"])({method:"DELETE",url:"/boss/menu/".concat(e)})},i=function(){return Object(r["a"])({method:"GET",url:"/boss/menu/getMenuNodeList"})},l=function(e){return Object(r["a"])({method:"POST",url:"/boss/menu/allocateRoleMenus",data:e})},c=function(e){return Object(r["a"])({method:"GET",url:"/boss/menu/getRoleMenus",params:{roleId:e}})}},ad8d:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu-create"},[n("create-or-edit")],1)},a=[],o=n("2b0e"),u=n("f75e"),s=o["default"].extend({name:"MenuCreate",components:{CreateOrEdit:u["a"]},data:function(){return{}}}),i=s,l=n("2877"),c=Object(l["a"])(i,r,a,!1,null,"ffa3ed54",null);t["default"]=c.exports},f75e:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu-create"},[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v(e._s(e.isEdit?"编辑菜单":"添加菜单"))])]),n("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"菜单名称"}},[n("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"菜单路径"}},[n("el-input",{model:{value:e.form.href,callback:function(t){e.$set(e.form,"href",t)},expression:"form.href"}})],1),n("el-form-item",{attrs:{label:"上级菜单"}},[n("el-select",{attrs:{placeholder:"请选择上级菜单"},model:{value:e.form.parentId,callback:function(t){e.$set(e.form,"parentId",t)},expression:"form.parentId"}},[n("el-option",{attrs:{value:-1,label:"无上级菜单"}}),e._l(e.parentMenuList,(function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],2)],1),n("el-form-item",{attrs:{label:"描述"}},[n("el-input",{model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),n("el-form-item",{attrs:{label:"前端图标"}},[n("el-input",{model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}})],1),n("el-form-item",{attrs:{label:"是否显示"}},[n("el-radio-group",{model:{value:e.form.shown,callback:function(t){e.$set(e.form,"shown",t)},expression:"form.shown"}},[n("el-radio",{attrs:{label:!0}},[e._v("是")]),n("el-radio",{attrs:{label:!1}},[e._v("否")])],1)],1),n("el-form-item",{attrs:{label:"排序"}},[n("el-input-number",{attrs:{min:1,label:"描述文字"},model:{value:e.form.orderNum,callback:function(t){e.$set(e.form,"orderNum",t)},expression:"form.orderNum"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")]),e.isEdit?e._e():n("el-button",[e._v("重置")])],1)],1)],1)],1)},a=[],o=n("1da1"),u=(n("96cf"),n("2b0e")),s=n("2257"),i=u["default"].extend({name:"MenuCreate",props:{isEdit:{type:Boolean,default:!1}},data:function(){return{form:{parentId:-1,name:"123",href:"123",icon:"123",orderNum:0,description:"123",shown:!1},parentMenuList:[]}},created:function(){this.loadMenuInfo()},methods:{loadMenuInfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["e"])(e.$route.params.id||-1);case 2:n=t.sent,r=n.data,r.data.menuInfo&&(e.form=r.data.menuInfo),"000000"===r.code&&(e.parentMenuList=r.data.parentMenuList);case 6:case"end":return t.stop()}}),t)})))()},onSubmit:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["b"])(e.form);case 2:n=t.sent,r=n.data,"000000"===r.code&&(e.$message.success("提交成功"),e.$router.back());case 5:case"end":return t.stop()}}),t)})))()}}}),l=i,c=n("2877"),m=Object(c["a"])(l,r,a,!1,null,"faa9c064",null);t["a"]=m.exports},f8a9:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu-edit"},[n("create-or-edit",{attrs:{"is-edit":!0}})],1)},a=[],o=n("2b0e"),u=n("f75e"),s=o["default"].extend({name:"MenuEdit",components:{CreateOrEdit:u["a"]},data:function(){return{}}}),i=s,l=n("2877"),c=Object(l["a"])(i,r,a,!1,null,"4e595c80",null);t["default"]=c.exports}}]);
//# sourceMappingURL=menu-create-edit.49228d42.js.map