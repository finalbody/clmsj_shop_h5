(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/detail"],{"0c39":function(e,t,a){"use strict";var r=a("5454"),n=a.n(r);n.a},"13a4":function(e,t,a){"use strict";(function(e){a("36ef");r(a("66fd"));var t=r(a("e8d8"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},5454:function(e,t,a){},9925:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{order:{},addressData:{}}},onShow:function(){},onLoad:function(e){this.initData(e)},methods:{initData:function(t){var a=this;e.request({url:this.$Url+"/clmsj/order/getOrderDetails",data:{id:t.id},header:{auth:e.getStorageSync("session_key")},success:function(e){console.log(e.data.data),a.order=e.data.data;var t=a.orderStateExp(a.order.state),r=t.stateTip,n=t.stateTipColor;console.log({stateTip:r,stateTipColor:n}),console.log(a.order),a.order=Object.assign(a.order,{stateTip:r,stateTipColor:n}),console.log(a.order)}})},viewExpress:function(t){console.log("viewExpress"),e.navigateToMiniProgram({appId:"wx6885acbedba59c14",path:"pages/result/result?nu="+t.express_number+"&com=&querysource=third_xcx",success:function(e){}})},orderStateExp:function(e){var t="",a="#ffffff";switch(+e){case 0:t="待付款";break;case 1:t="待付款";break;case 2:t="已付款，待发货";break;case 3:t="已发货，待收货";break;case 4:t="已收货";break;case 9:t="订单已关闭",a="#ffffff";break}return{stateTip:t,stateTipColor:a}}}};t.default=a}).call(this,a("543d")["default"])},"9e30":function(e,t,a){"use strict";var r,n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return r}))},bd68:function(e,t,a){"use strict";a.r(t);var r=a("9925"),n=a.n(r);for(var o in r)"default"!==o&&function(e){a.d(t,e,(function(){return r[e]}))}(o);t["default"]=n.a},e8d8:function(e,t,a){"use strict";a.r(t);var r=a("9e30"),n=a("bd68");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("0c39");var s,c=a("f0c5"),u=Object(c["a"])(n["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],s);t["default"]=u.exports}},[["13a4","common/runtime","common/vendor"]]]);