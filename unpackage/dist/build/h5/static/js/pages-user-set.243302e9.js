(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-set"],{"0078":function(t,e,i){"use strict";var a=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l=a(i("f3f3")),n=i("2f62"),c={data:function(){return{}},methods:(0,l.default)({},(0,n.mapMutations)(["logout"]),{navTo:function(t){this.$api.msg("跳转到".concat(t))},toLogout:function(){var t=this;uni.showModal({content:"确定要退出登录么",success:function(e){e.confirm&&(t.logout(),setTimeout((function(){uni.navigateBack()}),200))}})},switchChange:function(t){var e=t.detail.value?"打开":"关闭";this.$api.msg("".concat(e,"消息推送"))}})};e.default=c},"0b02":function(t,e,i){"use strict";i.r(e);var a=i("0078"),l=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=l.a},"5ed1":function(t,e,i){"use strict";var a=i("d3dc"),l=i.n(a);l.a},"71f8":function(t,e,i){"use strict";var a,l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"list-cell b-b m-t",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("个人资料")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("个人资料")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("收货地址")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("收货地址")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("实名认证")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("实名认证")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell m-t"},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("消息推送")]),i("v-uni-switch",{attrs:{checked:!0,color:"#fa436a"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.switchChange.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"list-cell m-t b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("清除缓存")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("清除缓存")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("关于我们")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("关于我们")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell"},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("检查更新")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v("当前版本 1.0.3")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell log-out-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toLogout.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("退出登录")])],1)],1)},n=[];i.d(e,"b",(function(){return l})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}))},8160:function(t,e,i){"use strict";i.r(e);var a=i("71f8"),l=i("0b02");for(var n in l)"default"!==n&&function(t){i.d(e,t,(function(){return l[t]}))}(n);i("5ed1");var c,s=i("f0c5"),o=Object(s["a"])(l["default"],a["b"],a["c"],!1,null,"6b83fa06",null,!1,a["a"],c);e["default"]=o.exports},d3dc:function(t,e,i){var a=i("d446");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var l=i("4f06").default;l("26bf36ca",a,!0,{sourceMap:!1,shadowMode:!1})},d446:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-6b83fa06]{background:#f8f8f8}.list-cell[data-v-6b83fa06]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;padding:%?20?% %?30?%;line-height:%?60?%;position:relative;background:#fff;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.list-cell.log-out-btn[data-v-6b83fa06]{margin-top:%?40?%}.list-cell.log-out-btn .cell-tit[data-v-6b83fa06]{color:#fa436a;text-align:center;margin-right:0}.list-cell.cell-hover[data-v-6b83fa06]{background:#fafafa}.list-cell.b-b[data-v-6b83fa06]:after{left:%?30?%}.list-cell.m-t[data-v-6b83fa06]{margin-top:%?16?%}.list-cell .cell-more[data-v-6b83fa06]{-webkit-align-self:baseline;align-self:baseline;font-size:%?28?%;color:#909399;margin-left:%?10?%}.list-cell .cell-tit[data-v-6b83fa06]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;color:#303133;margin-right:%?10?%}.list-cell .cell-tip[data-v-6b83fa06]{font-size:%?28?%;color:#909399}.list-cell uni-switch[data-v-6b83fa06]{-webkit-transform:translateX(%?16?%) scale(.84);transform:translateX(%?16?%) scale(.84)}body.?%PAGE?%[data-v-6b83fa06]{background:#f8f8f8}',""]),t.exports=e}}]);