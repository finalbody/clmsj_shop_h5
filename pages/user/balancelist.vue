<style lang="scss">
.wrap {
    padding: 30rpx 20rpx;
    color: #666;
}
.list {
    .item {
        display: flex;
        justify-content: space-between;
        padding: 30rpx;
        border-bottom: 1rpx solid #eee;
        .hd {
            display: flex;
            align-items: center;
            .img {
                width: 100rpx;
                height: 100rpx;
                margin-right: 15rpx;
                border-radius: 8rpx;
            }
            .title {
                margin-right: 10rpx;
            }
            .state {
                color: #999;
            }
            .col{
                width: 300rpx;
            }
        }

        .ft {
            display: flex;
            font-size: 26rpx;
            align-items: center;
            text-align: right;
            .btn {
                margin: 5rpx;
                padding: 5rpx 20rpx;
                border: 1rpx solid #ddd;
                border-radius: 4rpx;
            }
            .green {
                background-color: #04be02;
                border: 1rpx solid #04be02;
                color: white;
            }
            .col {
                text-align: right;
                .date {
                    font-size: 24rpx;
                    color: #999;
                }
            }
        }
    }

    // .item:last-child{
    //     border-bottom: 0;
    // }
}

.nomore {
    padding: 20rpx;
    text-align: center;
}
</style>

<template>
    <view class="wrap">
        <view class="list">
            <view class="item" v-for="(item, index) in list" :key="index">
                <view class="hd">
                   {{item.describe}}
                </view>
                <view class="ft">
                    <view class="col">
                        <view>{{item.change == 0 ? '-' : '+'}}{{item.change_money}}</view>
                        <view class="date">{{item.time}}</view>
                    </view>
                   
                </view>
            </view>
        </view>
        <view class="nomore" v-if="nomore">没有更多了</view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            list: [],
            nomore: 0,
            page: 1
        };
    },
    // 0申请 1审核中 2通过 3拒绝
    onLoad() {
        this.loadData("refresh");
    },
    onShareAppMessage() {},
    async onReachBottom() {
        await this.loadData();
    },
    async onPullDownRefresh() {
        await this.loadData("refresh");
        uni.stopPullDownRefresh();
    },
    methods: {
        previewImg(url){
            uni.previewImage({
                current: url,
                urls: [url]
            });
        },
        delItem(item, index) {
            uni.showModal({
                title: "提示",
                content: "确定删除吗?",
                success: async res => {
                    if (res.confirm) {
                        const res = await app.request(
                            this.$Url + `/clmsj/live/deleteLiveGoods`,
                            {
                                id: item.id
                            }
                        );

                        if (res.data.code == 0) {
                            this.$api.msg("删除成功");
                            this.list.splice(index, 1);
                        }
                    }
                }
            });
        },
        refuseReason(item) {
            uni.showModal({
                title: "拒绝理由",
                content: item.refuse,
                showCancel: false
            });
        },
        async loadData(type) {
            if (type == "refresh") {
                this.list = [];
                this.page = 1;
                this.nomore = 0;
            }

            if (this.nomore == 1) {
                return;
            }
            const res = await app.request(
                this.$Url + "/clmsj/Earnings/accountLogList",
                {
                    page: this.page
                }
            );

            if (res.data.data.length == 0) {
                this.nomore = 1;
                return;
            }

            if (res.data.code == 0) {
                this.page++;
                this.list = this.list.concat(res.data.data);
            }
        }
    }
};
</script>