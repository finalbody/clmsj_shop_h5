<script>
/**
 * vuex管理登陆状态，具体可以参考官方登陆模板示例
 */
import { mapMutations } from "vuex";
export default {
    methods: {
        req(url, data = {}) {
            return this.request(this.$Url + '/' + url, data);
        },
        request(url, data = {}) {
            return new Promise((resolve, reject) => {
                uni.request({
                    url,
                    header: {
                        auth: uni.getStorageSync("session_key")
                    },
                    data,
                    method: "POST",
                    success: res => {
                        resolve(res);
                    },
                    fail() {
                        reject();
                    }
                });
            });
        },
        ...mapMutations(["login"])
    },
    onLaunch: function() {
        // uni.setStorageSync('session_key', 'ad0c191c968b08fc720cd6a5eab1dec1')
        uni.setStorageSync('session_key', null)

        // let userInfo = uni.getStorageSync("userInfo") || "";
        // if (userInfo.id) {
        //     //更新登陆状态
        //     uni.getStorage({
        //         key: "userInfo",
        //         success: res => {
        //             this.login(res.data);
        //         }
        //     });
        // }
    },
    onShow: function(options) {
        console.log("App Show");
    },
    onHide: function() {
        console.log("App Hide");
    }
};
</script>

<style lang='scss'>
@import "./static/css/iconfont.css";
/*
		全局公共样式和字体图标
	*/
@font-face {
    font-family: yticon;
    font-weight: normal;
    font-style: normal;
    src: url("https://at.alicdn.com/t/font_1749157_x73lgogykpd.ttf")
        format("truetype");
}

.yticon {
    font-family: "yticon" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.icon-zhibo:before {
    content: "\e701";
}
.icon-xinshangpin:before {
    content: "\e619";
}
.icon-zhudashangpin:before {
    content: "\e608";
}
.icon-bianhao:before {
    content: "\e6e3";
}
.icon-dianpu:before {
    content: "\e61c";
}
.icon-dianpu1:before {
    content: "\e6d9";
}

.icon-qianbao:before {
    content: "\e63d";
}

.icon-yiguoqi1:before {
    content: "\e700";
}
.icon-jiarugonghuoshang:before {
    content: "\e78f";
}
.icon-shanchu:before {
    content: "\e744";
}
.icon-iconfontshanchu1:before {
    content: "\e619";
}

.icon-iconfontweixin:before {
    content: "\e611";
}

.icon-alipay:before {
    content: "\e636";
}

.icon-shang:before {
    content: "\e624";
}
.icon-gerenzhongxin:before {
    content: "\e7aa";
}

.icon-shouye:before {
    content: "\e627";
}

.icon-shanchu4:before {
    content: "\e622";
}
.icon-xiaoxi:before {
    content: "\e618";
}
.icon-xiaoxi:before {
    content: "\e618";
}

.icon-jiantour-copy:before {
    content: "\e600";
}

.icon-fenxiang2:before {
    content: "\e61e";
}

.icon-pingjia:before {
    content: "\e67b";
}

.icon-quanbudingdan:before {
    content: "\e75f";
}

.icon-daifukuan:before {
    content: "\e774";
}

.icon-pinglun-copy:before {
    content: "\e612";
}

.icon-dianhua-copy:before {
    content: "\e621";
}

.icon-shoucang:before {
    content: "\e62e";
}

.icon-xuanzhong2:before {
    content: "\e62f";
}

.icon-gouwuche_:before {
    content: "\e630";
}

.icon-icon-test:before {
    content: "\e60c";
}

.icon-icon-test1:before {
    content: "\e632";
}

.icon-bianji:before {
    content: "\e74d";
}
.icon-bianji2:before {
    content: "\e7a3";
}

.icon-jiazailoading-A:before {
    content: "\e8fc";
}

.icon-zuoshang:before {
    content: "\e613";
}

.icon-jia2:before {
    content: "\e60a";
}

.icon-huifu:before {
    content: "\e68b";
}

.icon-sousuo:before {
    content: "\e7ce";
}

.icon-arrow-fine-up:before {
    content: "\e601";
}

.icon-hot:before {
    content: "\e60e";
}

.icon-lishijilu:before {
    content: "\e6b9";
}

.icon-zhengxinchaxun-zhifubaoceping-:before {
    content: "\e616";
}

.icon-naozhong:before {
    content: "\e64a";
}

.icon-xiatubiao--copy:before {
    content: "\e608";
}

.icon-shoucang_xuanzhongzhuangtai:before {
    content: "\e6a9";
}

.icon-jia1:before {
    content: "\e61c";
}

.icon-bangzhu1:before {
    content: "\e63d";
}

.icon-arrow-left-bottom:before {
    content: "\e602";
}

.icon-arrow-right-bottom:before {
    content: "\e603";
}

.icon-arrow-left-top:before {
    content: "\e604";
}

.icon-icon--:before {
    content: "\e744";
}

.icon-zuojiantou-up:before {
    content: "\e605";
}

.icon-xia:before {
    content: "\e62d";
}

.icon--jianhao:before {
    content: "\e60b";
}

.icon-weixinzhifu:before {
    content: "\e61a";
}

.icon-comment:before {
    content: "\e64f";
}

.icon-weixin:before {
    content: "\e61f";
}

.icon-fenlei1:before {
    content: "\e7f9";
}

.icon-erjiye-yucunkuan:before {
    content: "\e623";
}

.icon-Group-:before {
    content: "\e688";
}

.icon-you:before {
    content: "\e743";
}

.icon-forward:before {
    content: "\e607";
}

.icon-tuijian:before {
    content: "\e610";
}

.icon-bangzhu:before {
    content: "\e679";
}
.icon-kaidian:before {
    content: "\e617";
}
.icon-share:before {
    content: "\e75e";
}
.icon-share1:before {
    content: "\e7a5";
}

.icon-yiguoqi:before {
    content: "\e997";
}

.icon-shezhi1:before {
    content: "\e76c";
}

.icon-fork:before {
    content: "\e61b";
}

.icon-kafei:before {
    content: "\e66a";
}

.icon-iLinkapp-:before {
    content: "\e754";
}
.icon-kefu:before {
    content: "\e61b";
}
.icon-saomiao:before {
    content: "\e60d";
}

.icon-shezhi:before {
    content: "\e78e";
}

.icon-shouhoutuikuan:before {
    content: "\e76a";
}
.icon-dianpudingdan:before {
    content: "\e77f";
}
.icon-gouwuche:before {
    content: "\e609";
}

.icon-dizhi:before {
    content: "\e644";
}
.icon-dizhi2:before {
    content: "\e618";
}

.icon-fenlei:before {
    content: "\e706";
}

.icon-xingxing:before {
    content: "\e70b";
}

.icon-tuandui:before {
    content: "\e633";
}

.icon-zuanshi:before {
    content: "\e615";
}

.icon-zuo:before {
    content: "\e63c";
}

.icon-shoucang2:before {
    content: "\e6e7";
}

.icon-shouhuodizhi:before {
    content: "\e644";
}

.icon-yishouhuo:before {
    content: "\e773";
}

.icon-dianzan-ash:before {
    content: "\e617";
}

view,
scroll-view,
swiper,
swiper-item,
cover-view,
cover-image,
icon,
text,
rich-text,
progress,
button,
checkbox,
form,
input,
label,
radio,
slider,
switch,
textarea,
navigator,
audio,
camera,
image,
video {
    box-sizing: border-box;
}
/* 骨架屏替代方案 */
.Skeleton {
    background: #f3f3f3;
    padding: 20upx 0;
    border-radius: 8upx;
}

/* 图片载入替代方案 */
.image-wrapper {
    font-size: 0;
    background: #f3f3f3;
    border-radius: 4px;

    image {
        width: 100%;
        height: 100%;
        transition: 0.6s;
        opacity: 0;

        &.loaded {
            opacity: 1;
        }
    }
}

.clamp {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
}

.common-hover {
    background: #f5f5f5;
}

/*边框*/
.b-b:after,
.b-t:after {
    position: absolute;
    z-index: 3;
    left: 0;
    right: 0;
    height: 0;
    content: "";
    transform: scaleY(0.5);
    border-bottom: 1px solid $border-color-base;
}

.b-b:after {
    bottom: 0;
}

.b-t:after {
    top: 0;
}

/* button样式改写 */
uni-button,
button {
    height: 80upx;
    line-height: 80upx;
    font-size: $font-lg + 2upx;
    font-weight: normal;

    &.no-border:before,
    &.no-border:after {
        border: 0;
    }
}

uni-button[type="default"],
button[type="default"] {
    color: $font-color-dark;
}

/* input 样式 */
.input-placeholder {
    color: #999999;
}

.placeholder {
    color: #999999;
}
</style>
