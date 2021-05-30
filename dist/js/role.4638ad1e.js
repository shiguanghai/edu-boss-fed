(window.webpackJsonp = window.webpackJsonp || []).push([['role'], { '02c1': function (e, t, n) { 'use strict'; n('597c') }, 4970: function (e, t, n) { 'use strict'; n.d(t, 'f', function () { return o }), n.d(t, 'c', function () { return a }), n.d(t, 'b', function () { return i }), n.d(t, 'e', function () { return l }), n.d(t, 'd', function () { return s }), n.d(t, 'a', function () { return c }), n.d(t, 'g', function () { return u }); var r = n('b32d'); var o = function (e) { return Object(r.a)({ method: 'POST', url: '/boss/role/getRolePages', data: e }) }; var a = function (e) { return Object(r.a)({ method: 'DELETE', url: '/boss/role/'.concat(e) }) }; var i = function (e) { return Object(r.a)({ method: 'POST', url: '/boss/role/saveOrUpdate', data: e }) }; var l = function (e) { return Object(r.a)({ method: 'GET', url: '/boss/role/'.concat(e) }) }; var s = function () { return Object(r.a)({ method: 'GET', url: '/boss/role/all' }) }; var c = function (e) { return Object(r.a)({ method: 'POST', url: '/boss/role/allocateUserRoles', data: e }) }; var u = function (e) { return Object(r.a)({ method: 'GET', url: '/boss/role/user/'.concat(e) }) } }, 5899: function (e, t) { e.exports = '\t\n\v\f\r                　\u2028\u2029\ufeff' }, '58a8': function (e, t, n) { var r = n('1d80'); var o = n('5899'); var a = '[' + o + ']'; var i = RegExp('^' + a + a + '*'); var l = RegExp(a + a + '*$'); var s = function (e) { return function (t) { var n = String(r(t)); return 1 & e && (n = n.replace(i, '')), 2 & e && (n = n.replace(l, '')), n } }; e.exports = { start: s(1), end: s(2), trim: s(3) } }, '597c': function (e, t, n) {}, '6c35': function (e, t, n) { 'use strict'; n.r(t); var r = function () { var e = this; var t = e.$createElement; var n = e._self._c || t; return n('div', { staticClass: 'role' }, [n('role-list')], 1) }; var o = []; var a = n('2b0e'); var i = function () { var e = this; var t = e.$createElement; var n = e._self._c || t; return n('div', { staticClass: 'role-list' }, [n('el-card', { staticClass: 'box-card' }, [n('div', { attrs: { slot: 'header' }, slot: 'header' }, [n('span', [e._v('数据筛选')])]), n('el-form', { ref: 'form', attrs: { model: e.form, 'label-width': '80px', 'label-position': 'left' } }, [n('el-form-item', { attrs: { label: '角色名称', prop: 'name' } }, [n('el-input', { attrs: { placeholder: '角色名称' }, model: { value: e.form.name, callback: function (t) { e.$set(e.form, 'name', t) }, expression: 'form.name' } })], 1), n('el-form-item', [n('el-button', { attrs: { type: 'primary', disabled: e.loading }, on: { click: e.onSubmit } }, [e._v('查询搜索')]), n('el-button', { attrs: { disabled: e.loading }, on: { click: e.onReset } }, [e._v('重置')])], 1)], 1)], 1), n('el-card', { staticClass: 'box-card' }, [n('div', { staticClass: 'card-header', attrs: { slot: 'header' }, slot: 'header' }, [n('span', [e._v('查询结果')]), n('el-button', { attrs: { type: 'primary' }, on: { click: e.handleAdd } }, [e._v('添加角色')])], 1), n('el-table', { directives: [{ name: 'loading', rawName: 'v-loading', value: e.loading, expression: 'loading' }], staticStyle: { width: '100%' }, attrs: { data: e.roles } }, [n('el-table-column', { attrs: { prop: 'id', label: '编号', 'min-width': '50' } }), n('el-table-column', { attrs: { prop: 'name', label: '角色名称', 'min-width': '100' } }), n('el-table-column', { attrs: { prop: 'description', label: '描述', 'min-width': '150' } }), n('el-table-column', { attrs: { prop: 'createdTime', label: '添加时间', 'min-width': '180' } }), n('el-table-column', { attrs: { label: '操作', align: 'center', 'min-width': '150' }, scopedSlots: e._u([{ key: 'default', fn: function (t) { return [n('div', [n('el-button', { attrs: { type: 'text' }, on: { click: function (n) { return e.$router.push({ name: 'alloc-menu', params: { roleId: t.row.id } }) } } }, [e._v('分配菜单')]), n('el-button', { attrs: { type: 'text' }, on: { click: function (n) { return e.$router.push({ name: 'alloc-resource', params: { roleId: t.row.id } }) } } }, [e._v('分配资源')])], 1), n('div', [n('el-button', { attrs: { type: 'text' }, on: { click: function (n) { return e.handleEdit(t.row) } } }, [e._v('编辑')]), n('el-button', { attrs: { size: 'mini', type: 'text' }, on: { click: function (n) { return e.handleDelete(t.row) } } }, [e._v('删除')])], 1)] } }]) })], 1)], 1), n('el-dialog', { attrs: { title: e.isEdit ? '编辑角色' : '添加角色', visible: e.dialogVisible, width: '50%' }, on: { 'update:visible': function (t) { e.dialogVisible = t } } }, [e.dialogVisible ? n('create-or-edit', { attrs: { 'role-id': e.roleId, isEdit: e.isEdit }, on: { success: e.onSuccess, cancel: function (t) { e.dialogVisible = !1 } } }) : e._e()], 1)], 1) }; var l = []; var s = n('1da1'); var c = (n('b0c0'), n('96cf'), n('4970')); var u = function () { var e = this; var t = e.$createElement; var n = e._self._c || t; return n('div', [n('el-form', [n('el-form-item', { attrs: { label: '角色名称' } }, [n('el-input', { model: { value: e.role.name, callback: function (t) { e.$set(e.role, 'name', t) }, expression: 'role.name' } })], 1), n('el-form-item', { attrs: { label: '角色编码' } }, [n('el-input', { model: { value: e.role.code, callback: function (t) { e.$set(e.role, 'code', t) }, expression: 'role.code' } })], 1), n('el-form-item', { attrs: { label: '角色描述' } }, [n('el-input', { attrs: { type: 'textarea' }, model: { value: e.role.description, callback: function (t) { e.$set(e.role, 'description', t) }, expression: 'role.description' } })], 1), n('el-form-item', [n('el-button', { on: { click: function (t) { return e.$emit('cancel') } } }, [e._v('取消')]), n('el-button', { attrs: { type: 'primary' }, on: { click: e.onSubmit } }, [e._v('确认')])], 1)], 1)], 1) }; var d = []; var f = (n('a9e3'), a.default.extend({ name: 'CreateOrEditRole', props: { roleId: { type: [String, Number] }, isEdit: { type: Boolean, default: !1 } }, data: function () { return { role: { code: '', name: '', description: '' } } }, created: function () { this.isEdit && this.loadRole() }, methods: { loadRole: function () { var e = this; return Object(s.a)(regeneratorRuntime.mark(function t () { var n, r; return regeneratorRuntime.wrap(function (t) { while (1) switch (t.prev = t.next) { case 0:return t.next = 2, Object(c.e)(e.roleId); case 2:n = t.sent, r = n.data, e.role = r.data; case 5:case 'end':return t.stop() } }, t) }))() }, onSubmit: function () { var e = this; return Object(s.a)(regeneratorRuntime.mark(function t () { return regeneratorRuntime.wrap(function (t) { while (1) switch (t.prev = t.next) { case 0:return t.next = 2, Object(c.b)(e.role); case 2:e.$message.success('操作成功'), e.$emit('success'); case 4:case 'end':return t.stop() } }, t) }))() } } })); var m = f; var p = n('2877'); var b = Object(p.a)(m, u, d, !1, null, '7d1a542f', null); var h = b.exports; var v = a.default.extend({ name: 'RoleList', components: { CreateOrEdit: h }, data: function () { return { roles: [], form: { current: 1, size: 50, name: '' }, loading: !1, dialogVisible: !1, roleId: null, isEdit: !1 } }, created: function () { this.loadRoles() }, methods: { loadRoles: function () { var e = this; return Object(s.a)(regeneratorRuntime.mark(function t () { var n, r; return regeneratorRuntime.wrap(function (t) { while (1) switch (t.prev = t.next) { case 0:return e.loading = !0, t.next = 3, Object(c.f)(e.form); case 3:n = t.sent, r = n.data, e.roles = r.data.records, e.loading = !1; case 7:case 'end':return t.stop() } }, t) }))() }, onSubmit: function () { this.loadRoles() }, handleEdit: function (e) { this.dialogVisible = !0, this.roleId = e.id, this.isEdit = !0 }, handleDelete: function (e) { var t = this; return Object(s.a)(regeneratorRuntime.mark(function n () { return regeneratorRuntime.wrap(function (n) { while (1) switch (n.prev = n.next) { case 0:return n.prev = 0, n.next = 3, t.$confirm('确认删除角色：'.concat(e.name, '？'), '删除提示'); case 3:return n.next = 5, Object(c.c)(e.id); case 5:t.$message.success('删除成功'), t.loadRoles(), n.next = 12; break; case 9:n.prev = 9, n.t0 = n.catch(0), n.t0 && n.t0.response ? t.$message.error('删除失败，请重试') : t.$message.info('取消删除'); case 12:case 'end':return n.stop() } }, n, null, [[0, 9]]) }))() }, onReset: function () { this.$refs.form.resetFields(), this.loadRoles() }, onSuccess: function () { this.dialogVisible = !1, this.loadRoles() }, handleAdd: function () { this.isEdit = !1, this.dialogVisible = !0 } } }); var g = v; var x = (n('02c1'), Object(p.a)(g, i, l, !1, null, 'bd2a2e7a', null)); var E = x.exports; var w = a.default.extend({ name: 'LoginIndex', components: { RoleList: E } }); var I = w; var O = Object(p.a)(I, r, o, !1, null, '6f33f789', null); t.default = O.exports }, 7156: function (e, t, n) { var r = n('861d'); var o = n('d2bb'); e.exports = function (e, t, n) { var a, i; return o && typeof (a = t.constructor) === 'function' && a !== n && r(i = a.prototype) && i !== n.prototype && o(e, i), e } }, a9e3: function (e, t, n) { 'use strict'; var r = n('83ab'); var o = n('da84'); var a = n('94ca'); var i = n('6eeb'); var l = n('5135'); var s = n('c6b6'); var c = n('7156'); var u = n('c04e'); var d = n('d039'); var f = n('7c73'); var m = n('241c').f; var p = n('06cf').f; var b = n('9bf2').f; var h = n('58a8').trim; var v = 'Number'; var g = o[v]; var x = g.prototype; var E = s(f(x)) == v; var w = function (e) { var t; var n; var r; var o; var a; var i; var l; var s; var c = u(e, !1); if (typeof c === 'string' && c.length > 2) if (c = h(c), t = c.charCodeAt(0), t === 43 || t === 45) { if (n = c.charCodeAt(2), n === 88 || n === 120) return NaN } else if (t === 48) { switch (c.charCodeAt(1)) { case 66:case 98:r = 2, o = 49; break; case 79:case 111:r = 8, o = 55; break; default:return +c } for (a = c.slice(2), i = a.length, l = 0; l < i; l++) if (s = a.charCodeAt(l), s < 48 || s > o) return NaN; return parseInt(a, r) } return +c }; if (a(v, !g(' 0o1') || !g('0b1') || g('+0x1'))) { for (var I, O = function (e) { var t = arguments.length < 1 ? 0 : e; var n = this; return n instanceof O && (E ? d(function () { x.valueOf.call(n) }) : s(n) != v) ? c(new g(w(t)), n, O) : w(t) }, R = r ? m(g) : 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range'.split(','), _ = 0; R.length > _; _++)l(g, I = R[_]) && !l(O, I) && b(O, I, p(g, I)); O.prototype = x, x.constructor = O, i(o, v, O) } }, b0c0: function (e, t, n) { var r = n('83ab'); var o = n('9bf2').f; var a = Function.prototype; var i = a.toString; var l = /^\s*function ([^ (]*)/; var s = 'name'; r && !(s in a) && o(a, s, { configurable: !0, get: function () { try { return i.call(this).match(l)[1] } catch (e) { return '' } } }) } }])
// # sourceMappingURL=role.4638ad1e.js.map