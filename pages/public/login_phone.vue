<template>
    <view class="container">
        <view class="left-bottom-sign"></view>
        <!-- <view class="back-btn iconfont iconarrowLeft" @click="navBack"></view> -->
        <view class="right-top-sign"></view>
        <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
        <view class="wrapper">
            <view class="left-top-sign">LOGIN</view>
            <view class="welcome">手机登陆</view>
            <view class="input-content">
                <view class="input-item">
                    <text class="tit">手机号码</text>
                    <view class="row">
                        <input
                            type="number"
                            :value="mobile"
                            placeholder="请输入手机号码"
                            maxlength="11"
                            data-key="mobile"
                            @input="inputChange"
                        />
                        <view @tap="getVcode" class="vcode">发送验证码</view>
                    </view>
                </view>
                <view class="input-item">
                    <text class="tit">验证码</text>
                    <input
                        type="mobile"
                        placeholder="请输入短信验证码"
                        maxlength="10"
                        data-key="vcode"
                        @input="inputChange"
                        @confirm="toLogin"
                    />
                </view>
            </view>
            <button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
            <!-- <view class="forget-section">
				忘记密码?
            </view>-->
        </view>
        <!-- <view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
        </view>-->
    </view>
</template>

<script>
const app = getApp();
import { mapMutations } from "vuex";

export default {
    data() {
        return {
            mobile: "",
            vcode: "",
            logining: false
        };
    },
    onLoad() {
    },
    methods: {
        ...mapMutations(["login"]),
        inputChange(e) {
            const key = e.currentTarget.dataset.key;
            this[key] = e.detail.value;
        },
        async getVcode() {
            if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
                this.$api.msg("请输入正确的手机号码");
                return;
            }
            const res = await app.req("special/login/sendMobileCode", {
                mobile: this.mobile
            });

            if (res.data.code == 0) {
                this.$api.msg("发送成功");
            } else {
                this.$api.msg(res.data.msg);
            }
        },
        navBack() {
            uni.navigateBack();
        },
        toRegist() {
            this.$api.msg("去注册");
        },
        async toLogin() {
            this.logining = true;
            const { mobile, vcode } = this;
            /* 数据验证模块
				if(!this.$api.match({
					mobile,
					password
				})){
					this.logining = false;
					return;
				}
				*/
            const sendData = {
                mobile,
                code: vcode,
                pid: app.globalData.pid
            };

            const res = await app.req("special/login/login", sendData);
            if (res.data.code == 0) {
                uni.setStorageSync("session_key", res.data.auth);
                const re = await app.req('clmsj/user/getUser')
                uni.setStorageSync("userInfo", res.data.user);
                this.$api.msg('登陆成功');
                uni.$emit('login_hide')
				setTimeout(() => {
                    uni.navigateBack();
                    this.logining = false;
                }, 1000);
            } else {
                this.$api.msg(res.data.msg);
                this.logining = false;
            }
            // if (result.status === 1) {
            //     this.login(result.data);
            //     uni.navigateBack();
            // } else {
            //     this.$api.msg(result.msg);
            //     this.logining = false;
            // }
        }
    }
};
</script>

<style lang='scss'>
page {
    background: #fff;
}
.row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.vcode {
    font-size: 26rpx;
    color: #999;
    width: 250rpx;
    border-radius: 30rpx;
    background-color: #fa436a;
    color: white;
    padding: 5rpx 20rpx;
    text-align: center;
}
.container {
    padding-top: 115px;
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #fff;
}
.wrapper {
    position: relative;
    z-index: 90;
    background: #fff;
    padding-bottom: 40upx;
}
.back-btn {
    position: absolute;
    left: 40upx;
    z-index: 9999;
    padding-top: var(--status-bar-height);
    top: 40upx;
    font-size: 40upx;
    color: $font-color-dark;
}
.left-top-sign {
    font-size: 120upx;
    color: $page-color-base;
    position: relative;
    left: -16upx;
}
.right-top-sign {
    position: absolute;
    top: 80upx;
    right: -30upx;
    z-index: 95;
    &:before,
    &:after {
        display: block;
        content: "";
        width: 400upx;
        height: 80upx;
        background: #b4f3e2;
    }
    &:before {
        transform: rotate(50deg);
        border-radius: 0 50px 0 0;
    }
    &:after {
        position: absolute;
        right: -198upx;
        top: 0;
        transform: rotate(-50deg);
        border-radius: 50px 0 0 0;
        /* background: pink; */
    }
}
.left-bottom-sign {
    position: absolute;
    left: -270upx;
    bottom: -320upx;
    border: 100upx solid #d0d1fd;
    border-radius: 50%;
    padding: 180upx;
}
.welcome {
    position: relative;
    left: 50upx;
    top: -90upx;
    font-size: 46upx;
    color: #555;
    text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.input-content {
    padding: 0 60upx;
}
.input-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 30upx;
    background: $page-color-light;
    height: 120upx;
    border-radius: 4px;
    margin-bottom: 50upx;
    &:last-child {
        margin-bottom: 0;
    }
    .tit {
        height: 50upx;
        line-height: 56upx;
        font-size: $font-sm + 2upx;
        color: $font-color-base;
    }
    input {
        height: 60upx;
        font-size: $font-base + 2upx;
        color: $font-color-dark;
        width: 100%;
    }
}

.confirm-btn {
    width: 630upx;
    height: 76upx;
    line-height: 76upx;
    border-radius: 50px;
    margin-top: 70upx;
    background: $uni-color-primary;
    color: #fff;
    font-size: $font-lg;
    &:after {
        border-radius: 100px;
    }
}
.forget-section {
    font-size: $font-sm + 2upx;
    color: $font-color-spec;
    text-align: center;
    margin-top: 40upx;
}
.register-section {
    position: absolute;
    left: 0;
    bottom: 50upx;
    width: 100%;
    font-size: $font-sm + 2upx;
    color: $font-color-base;
    text-align: center;
    text {
        color: $font-color-spec;
        margin-left: 10upx;
    }
}
</style>
