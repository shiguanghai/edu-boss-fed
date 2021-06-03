(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["course"],{"6fd8":function(e,t,a){"use strict";a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return n})),a.d(t,"d",(function(){return o})),a.d(t,"e",(function(){return u})),a.d(t,"b",(function(){return l}));var r=a("b32d"),s=function(e){return Object(r["a"])({method:"POST",url:"/boss/course/getQueryCourses",data:e})},n=function(e){return Object(r["a"])({method:"GET",url:"/boss/course/changeState",params:e})},o=function(e){return Object(r["a"])({method:"POST",url:"/boss/course/saveOrUpdateCourse",data:e})},u=function(e,t){return Object(r["a"])({method:"POST",url:"/boss/course/upload",data:e,onUploadProgress:t})},l=function(e){return Object(r["a"])({method:"GET",url:"/boss/course/getCourseById",params:{courseId:e}})}},"720c":function(e,t,a){},"87d1":function(e,t,a){"use strict";a("720c")},bff8:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"course"},[a("course-list")],1)},s=[],n=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"course-list"},[a("el-card",{staticClass:"box-card"},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[e._v("数据筛选")])]),a("el-form",{ref:"form",attrs:{"label-width":"80px","label-position":"left",model:e.filterParams}},[a("el-form-item",{attrs:{label:"课程名称",prop:"courseName"}},[a("el-input",{attrs:{placeholder:"课程名称"},model:{value:e.filterParams.courseName,callback:function(t){e.$set(e.filterParams,"courseName",t)},expression:"filterParams.courseName"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{model:{value:e.filterParams.status,callback:function(t){e.$set(e.filterParams,"status",t)},expression:"filterParams.status"}},[a("el-option",{attrs:{label:"全部",value:""}}),a("el-option",{attrs:{label:"上架",value:"1"}}),a("el-option",{attrs:{label:"下架",value:"0"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{disabled:e.loading},on:{click:e.handleReset}},[e._v("重置")]),a("el-button",{attrs:{type:"primary",disabled:e.loading},on:{click:e.handleFilter}},[e._v("查询")])],1)],1)],1),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"card-header",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("查询结果：")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.$router.push({name:"course-create"})}}},[e._v("添加课程")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:e.courses}},[a("el-table-column",{attrs:{prop:"id",label:"ID","min-width":"50"}}),a("el-table-column",{attrs:{prop:"courseName",label:"课程名称","min-width":"150"}}),a("el-table-column",{attrs:{prop:"price",label:"价格","min-width":"100"}}),a("el-table-column",{attrs:{prop:"sortNum",label:"排序","min-width":"150"}}),a("el-table-column",{attrs:{prop:"status",label:"上架状态","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","active-value":1,"inactive-value":0,disabled:t.row.isStatusLoading},on:{change:function(a){return e.onStateChange(t.row)}},model:{value:t.row.status,callback:function(a){e.$set(t.row,"status",a)},expression:"scope.row.status"}})]}}])}),a("el-table-column",{attrs:{prop:"price",label:"操作","min-width":"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{on:{click:function(a){return e.$router.push({name:"course-edit",params:{courseId:t.row.id}})}}},[e._v("编辑")]),a("el-button",{on:{click:function(a){return e.$router.push({name:"course-section",params:{courseId:t.row.id}})}}},[e._v("内容管理")])]}}])})],1),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.totalCount,disabled:e.loading,"current-page":e.filterParams.currentPage},on:{"update:currentPage":function(t){return e.$set(e.filterParams,"currentPage",t)},"update:current-page":function(t){return e.$set(e.filterParams,"currentPage",t)},"current-change":e.handleCurrentChange}})],1)],1)},u=[],l=a("1da1"),c=(a("96cf"),a("159b"),a("6fd8")),i=n["default"].extend({name:"CourseList",data:function(){return{filterParams:{currentPage:1,pageSize:10,courseName:"",status:""},courses:[],totalCount:0,loading:!0}},created:function(){this.loadCourses()},methods:{loadCourses:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,Object(c["c"])(e.filterParams);case 3:a=t.sent,r=a.data,r.data.records.forEach((function(e){e.isStatusLoading=!1})),e.courses=r.data.records,e.totalCount=r.data.total,e.loading=!1;case 9:case"end":return t.stop()}}),t)})))()},handleCurrentChange:function(e){this.filterParams.currentPage=e,this.loadCourses()},handleFilter:function(){this.filterParams.currentPage=1,this.loadCourses()},handleReset:function(){this.$refs.form.resetFields(),this.filterParams.currentPage=1,this.loadCourses()},onStateChange:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.isStatusLoading=!0,a.next=3,Object(c["a"])({courseId:e.id,status:e.status});case 3:t.$message.success("".concat(0===e.status?"下架":"上架","成功")),e.isStatusLoading=!1;case 5:case"end":return a.stop()}}),a)})))()}}}),d=i,f=(a("87d1"),a("2877")),m=Object(f["a"])(d,o,u,!1,null,"a4927a12",null),p=m.exports,b=n["default"].extend({name:"CourseIndex",components:{CourseList:p}}),h=b,g=Object(f["a"])(h,r,s,!1,null,"08853713",null);t["default"]=g.exports}}]);
//# sourceMappingURL=course.2d1a02a3.js.map