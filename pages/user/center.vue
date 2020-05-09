<template>
    <view class="wrap">
        <view class="background"></view>
        <view class="head">
            <view class="hd">
                <view class="head-img">
                    <image :src="user.avatarUrl" mode="aspectFill" />
                </view>
                <view class="info">
                    <view class="name">{{user.nickName}}</view>
                    <view class="balance">余额: ¥{{user.balance}}</view>
                </view>
            </view>
            <view class="ft">
                <view class="btn green" @tap="showPopup">微信提现</view>
            </view>
        </view>
        <view class="body">
            <!-- <view class="item">
                <view class="hd">总销售商品数</view>
                <view class="ft">33</view>
            </view>
            <view class="item">
                <view class="hd">总利润</view>
                <view class="ft">¥333</view>
            </view>-->
            <!-- <view class="item">
                <view class="hd">提现列表</view>
                <view class="ft">
                    <text class="iconfont iconyoujiantou"></text>
                </view>
            </view> -->
            <view class="item" @tap="navTo('/pages/user/withdrawlist')">
                <view class="hd">提现列表</view>
                <view class="ft">
                    <text class="iconfont iconyoujiantou"></text>
                </view>
            </view>
            <view class="item" @tap="navTo('/pages/user/balancelist')">
                <view class="hd">资金明细</view>
                <view class="ft">
                    <text class="iconfont iconyoujiantou"></text>
                </view>
            </view>
            <view class="item" @tap="navTo('/pages/user/rebatelist')">
                <view class="hd">返利列表</view>
                <view class="ft">
                    <text class="iconfont iconyoujiantou"></text>
                </view>
            </view>
            <view class="item" @tap="navTo('/pages/user/sublist')">
                <view class="hd">我的下级</view>
                <view class="ft">
                    <text class="iconfont iconyoujiantou"></text>
                </view>
            </view>
        </view>
        <view class="withdraw-popup" v-if="show_popup">
            <view class="mask" @tap="hidePopup"></view>
            <view class="popup">
                <view class="title">提现金额</view>
                <input type="number" v-model="withdraw_amount" placeholder="请输入提现金额"/>
                <view @tap="withdrawConfirm" class="confirm">确定</view>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp()
export default {
    data() {
        return {
            show_popup: 0,
            withdraw_amount: '',
            user: {}
        };
    },
    async onLoad(){
        const res = await app.request(this.$Url + '/clmsj/user/getUser')
        this.user = res.data.data.user
    },
    methods: {
        hidePopup() {
            this.show_popup = 0;
        },
        showPopup() {
            this.show_popup = 1;
        },
        navTo(url){
            uni.navigateTo({
                 url
            });
        },
        withdrawConfirm() {
            if(!this.withdraw_amount){
                this.$api.msg('请输入正确的金额')
                return
            }

            this.show_popup = 0
            
            if(this.withdrawing){
                return
            }
            this.withdrawing = 1


        }
    }
};
</script>

<style lang="scss">
.wrap {
    font-size: 30rpx;
    padding: 30rpx;
    color: #666;
    .background {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        height: 200rpx;
        background-color: $purple;
        z-index: -1;
    }
    .head {
        display: flex;
        align-items: center;
        border: 1rpx solid #ddd;
        border-radius: 10rpx;
        padding: 30rpx 30rpx;
        justify-content: space-between;
        margin-bottom: 20rpx;
        background-color: white;
        .hd {
            display: flex;
            align-items: center;
            .head-img image {
                width: 140rpx;
                height: 140rpx;
                border-radius: 50%;
                margin-right: 25rpx;
            }
            .info {
                .name {
                    font-size: 32rpx;
                    color: #333;
                    margin-bottom: 10rpx;
                }
            }
        }
    }

    .body {
        border: 1rpx solid #ddd;
        border-radius: 10rpx;
        padding: 10rpx 30rpx;
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            padding: 20rpx 0;
            font-size: 28rpx;
            .ft {
                color: #999;
                font-size: 40rpx;
            }
        }
        .item:last-child {
            border-bottom: 0;
        }
    }
}
.btn {
    padding: 5rpx 15rpx;
    border-radius: 4rpx;
    border: 1rpx solid #ddd;
}
.btn.green {
    background-color: $purple;
    border: 0;
    color: white;
}
.withdraw-popup {
    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .popup {
        position: fixed;
        left: 0;
        right: 0;
        top: 35%;
        width: 80%;
        background-color: white;
        margin: 0 auto;
        padding: 25rpx;
        text-align: center;
        border-radius: 10rpx;
        input {
            border: 1rpx solid #ddd;
            border-radius: 8rpx;
            line-height: 60rpx;
            height: 60rpx;
            margin: 20rpx 0;
        }
        .confirm {
            border-radius: 8rpx;
            padding: 15rpx;
            background-color: $purple;
            color: white;
        }
    }
}
</style>
