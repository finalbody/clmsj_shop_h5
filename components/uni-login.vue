<template>
    <view class="content">
        <!-- 底部操作菜单 -->
        <view class="login_tips" v-if="!userInfo.id && (showLogin==1 && showLoginBox==1)">
            <view v-if="fullLogin==1" class="mask-bg-full"></view>
            <view v-else class="mask-bg"></view>
            <view class="mask-box" :class="{'full' : fullLogin==1}">
                <view style="text-align: left;line-height: 30px;">登录商城可以获得更多体验权限，现在登陆吗？</view>
                <view class="login-btn">
                    <button type="warn" lang="zh_CN" @tap="login_phone">
                        <text>手机登陆</text>
                    </button>
                    <button type="primary" lang="zh_CN" @tap="login_wx">
                        <text>微信登陆</text>
                    </button>
                    <button v-if="onlyLogin==0" type="default" @tap="hideLoginBox()">
                        <text>暂不登陆</text>
                    </button>
                </view>
            </view>
        </view>
    </view>
</template>
 
<script>
const app = getApp();
export default {
    data() {
        return {
            showLoginBox: 1,
            userInfo: {},
            fullLogin: 0,
            parentObj: "",
            env: ""
        };
    },
    props: {
        type: {
            type: String,
            default: "login"
        },
        showLogin: {
            type: Number,
            default: "1"
        },
        onlyLogin: {
            type: Number,
            default: 0
        },
        loadData: function(type) {
            this.$emit("pLoadData");
        }
    },
    async created() {
        this.userInfo = uni.getStorageSync("userInfo");
        if (this.getIsWxClient()) {
            this.env = "weixin";
        } else {
            this.env = "h5";
        }

        const session_key = uni.getStorageSync("session_key") || "";
        if(session_key){
            this.showLoginBox = 0;
        }
        if (!session_key) {
            const code = this.getQueryString("code") || "";
            if (code) {
                const res = await app.req("special/login/getCode", {
                    code
                });

                if (res.data.code == 0) {
                    uni.setStorageSync("session_key", res.data.auth);
                    this.showLoginBox = 0;
                    if (this.parentObj == "loadData") {
                        this.$emit("pLoadData");
                    }
                } else {
                    this.$api.msg(res.data.msg);
                }
            }
        }
    },
    methods: {
        async login_wx() {
            const res = await app.req("special/login/loginWx");
            if (res.data.code == 0) {
                const url = res.data.data.url;
                window.location.href = url;
            } else {
                this.$api.msg(res.data.msg);
            }
        },
        async login_phone() {
            console.log('phone')
        },
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        getIsWxClient() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            }
            return false;
        },
        toggleMask(obj) {
            this.showLoginBox = 1;
            this.fullLogin = 1;
            this.parentObj = obj;
        },
        getUserInfo(res) {
            var _this = this;
            if (!res.detail.iv) {
                uni.showToast({
                    title: "您取消了授权,登录失败",
                    icon: "none"
                });
                return false;
            }
            uni.login({
                provider: "weixin",
                success: function(loginRes) {
                    uni.getUserInfo({
                        provider: "weixin",
                        withCredentials: true,
                        success: function(infoRes) {
                            uni.request({
                                url: "https://td.clmsj.com/clmsj/login/index", // http://bull.hnw.net/index/bull/client_wash_info
                                data: {
                                    encrypt_data: encodeURIComponent(
                                        infoRes.encryptedData
                                    ),
                                    iv: encodeURIComponent(infoRes.iv),
                                    code: loginRes.code,
                                    type: 2 //type   1专业版  2零售版
                                },
                                method: "POST",
                                success: res => {
                                    if (res.data.code == 0) {
                                        uni.setStorageSync(
                                            "session_key",
                                            res.data.auth
                                        );
                                        uni.setStorageSync(
                                            "userInfo",
                                            res.data.data.user
                                        );
                                        _this.showLoginBox = 0;
                                        if (_this.parentObj == "loadData") {
                                            _this.$emit("pLoadData");
                                        }
                                    } else {
                                        uni.showToast({
                                            icon: "none",
                                            title: "请重新获取信息..."
                                        });
                                    }
                                }
                            });
                        },
                        fail: function(infoRes) {
                            console.log("infoRes=" + JSON.stringify(infoRes));
                        }
                    });
                }
            });
        },
        hideLoginBox() {
            this.showLoginBox = 0;
        },
        eventClick() {
            this.$emit("eventClick");
        }
    }
};
</script>

<style lang='scss'>
/* 底部操作菜单 */
.login_tips {
    padding: 0px;
    .mask-bg {
        left: 0;
        right: 0;
        bottom: 50px;
        background: #303133;
        opacity: 0.5;
        z-index: 9998;
        position: fixed;
        padding-top: 30px;
        height: 240px;
    }
    .mask-bg-full {
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: #303133;
        opacity: 0.5;
        z-index: 9998;
        position: fixed;
    }
    .mask-box {
        position: fixed;
        bottom: 70px;
        left: 5%;
        right: 5%;
        z-index: 9999;
        background: #ffffff;
        padding: 20px;
        min-height: 150px;
        border-radius: 5px;
    }
    .full {
        bottom: calc(50% - 75px);
    }
    .login-btn {
        padding-top: 20px;
        button {
            margin-bottom: 10px;
        }
    }
}
</style>
