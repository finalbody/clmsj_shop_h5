
<style lang="scss">
page,
.content {
    background: $page-color-base;
}
// .content{
// 	padding-top: 96upx;
// }

.navbar {
    position: fixed;
    left: 0;
    top: var(--window-top);
    display: flex;
    width: 100%;
    height: 80upx;
    background: #fff;
    box-shadow: 0 2upx 10upx rgba(0, 0, 0, 0.06);
    z-index: 10;
    .nav-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 30upx;
        color: $font-color-dark;
        position: relative;
        &.current {
            color: $base-color;
            &:after {
                content: "";
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                width: 120upx;
                height: 0;
                border-bottom: 4upx solid $base-color;
            }
        }
    }
    .p-box {
        display: flex;
        flex-direction: column;
        .yticon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30upx;
            height: 14upx;
            line-height: 1;
            margin-left: 4upx;
            font-size: 26upx;
            color: #888;
            &.active {
                color: $base-color;
            }
        }
        .xia {
            transform: scaleY(-1);
        }
    }
    .cate-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 80upx;
        position: relative;
        font-size: 44upx;
        &:after {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            border-left: 1px solid #ddd;
            width: 0;
            height: 36upx;
        }
    }
}

/* 分类 */
.cate-mask {
    position: fixed;
    left: 0;
    top: var(--window-top);
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 95;
    transition: 0.3s;

    .cate-content {
        width: 630upx;
        height: 100%;
        background: #fff;
        float: right;
        transform: translateX(100%);
        transition: 0.3s;
    }
    &.none {
        display: none;
    }
    &.show {
        background: rgba(0, 0, 0, 0.4);

        .cate-content {
            transform: translateX(0);
        }
    }
}
.cate-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    .cate-item {
        display: flex;
        align-items: center;
        height: 90upx;
        padding-left: 30upx;
        font-size: 28upx;
        color: #555;
        position: relative;
    }
    .two {
        height: 64upx;
        color: #303133;
        font-size: 30upx;
        background: #f8f8f8;
    }
    .active {
        color: $base-color;
    }
}

/* 商家列表 */
.store-section {
    display: flex;
    flex-wrap: wrap;

    .store-item {
        width: 100%;
        margin: 0px auto;
        margin-bottom: 8px;
        background: #fff;
        padding: 25upx;
        // border-bottom: 10px solid #EEEEEE;
        .shop-section {
            display: flex;
            justify-content: space-between;
            .logo {
                width: 60px;
                image {
                    width: 60px;
                    height: 60px;
                    border-radius: 5px;
                }
            }
            .store-desc {
                width: calc(100% - 70px);
                font-size: 14px;
                line-height: 22px;
                .title {
                    font-size: 16px;
                    font-weight: bold;
                }
                .item {
                    display: flex;
                    justify-content: space-between;
                    text {
                        color: #dd524d;
                    }
                }
                .desc {
                    font-size: 12px;
                    color: #606266;
                }
            }
        }
        .guess-section {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            padding: 15upx 30upx;
            background: #fff;
            .guess-item {
                display: flex;
                flex-direction: column;

                width: 30%;
                padding-bottom: 0upx;
            }
            .image-wrapper {
                width: 100%;
                height: 230upx;
                border-radius: 3px;
                overflow: hidden;
                image {
                    width: 100%;
                    height: 100%;
                    opacity: 1;
                }
            }
        }
    }
}

/* 商品列表 */
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 30upx;
    background: #fff;
    .goods-item {
        display: flex;
        flex-direction: column;
        width: 48%;
        padding-bottom: 40upx;
        &:nth-child(2n + 1) {
            margin-right: 4%;
        }
    }
    .image-wrapper {
        width: 100%;
        height: 330upx;
        border-radius: 3px;
        overflow: hidden;
        image {
            width: 100%;
            height: 100%;
            opacity: 1;
        }
    }
    .title {
        font-size: $font-lg;
        color: $font-color-dark;
        line-height: 80upx;
    }
    .price-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 10upx;
        font-size: 24upx;
        color: $font-color-light;
    }
    .price {
        font-size: $font-lg;
        color: $uni-color-primary;
        line-height: 1;
        &:before {
            content: "￥";
            font-size: 26upx;
        }
    }
}

.store-item {
    display: flex;
    .left {
        .logo image {
            width: 78upx;
            height: 78upx;
        }
    }
    .right {
        margin-left: 20upx;
        width: 100%;
        .name {
            color: $purple;
            font-size: 36upx;
            color: #566687;
        }
        .desc {
            color: #111;
            margin-bottom: 10upx;
            font-size: 30upx;
        }
        .imgs {
            display: flex;
            flex-wrap: wrap;
            .img-wrap {
                margin: 10upx 5upx;
                image {
                    width: 194upx;
                    height: 194upx;
                    display: block;
                }
                video {
                    width: 194upx;
                    height: 194upx;
                    display: block;
                }
            }
        }
        .date {
            display: flex;
            margin: 10upx 0;
            align-items: center;
            justify-content: space-between;
            color: #afafaf;
            font-size: 24upx;
            .del-btn {
                color: #586790;
                padding: 0 10upx;
            }
            .share-btn {
                color: $purple;
                padding: 0 10upx;
			}
			.pick-btn {
				color: white;
                background-color: $purple;
				padding: 5upx 20upx;
				border-radius: 30upx;
            }
        }
        .team {
            color: #666;
        }
        .follow {
            font-size: 24upx;
            margin-top: 10upx;
            background-color: #f7f7f7;
            padding: 10upx 15upx;
            word-break: break-all;
            color: #999;
            text {
                color: #586790;
            }
        }
    }
}
.save-all-btn {
    width: 100%;
    background-color: white;
    padding: 20upx;
    display: flex;
    justify-content: center;
    view {
        background-color: #333;
        color: white;
        padding: 20upx 30upx;
        border-radius: 12upx;
        font-size: 30upx;
    }
}
</style>
<template>
    <view class="content">
        <view class="store-section">
            <!-- <view class="save-all-btn">
                <view>新产品一键保存 ></view>
            </view>-->
            <view
                v-for="(item, index) in storeList"
                :key="index"
                @tap="detailBtn(item.goods_id)"
                class="store-item"
            >
                <view class="left">
                    <view class="logo">
                        <image :src="item.user.avatarUrl" mode="aspectFill" />
                    </view>
                </view>

                <view class="right">
                    <view class="name">{{item.user.nickName}}</view>
                    <view class="desc">{{item.goods_remark}}</view>
                    <view class="imgs">
                        <view v-for="(val, key) in item.goodsphoto" :key="key" class="img-wrap">
                            <view v-if="val.status==0" @tap.stop="previewImg(item.goodsphoto, key)">
                                <image :src="val.img_url" mode="aspectFill" />
                            </view>
                            <view v-else>
                                <video
                                    objectFit="cover"
                                    play-btn-position="center"
                                    :src="val.img_url"
                                    :data-src="val.img_url"
                                    @play.stop="videoPlay"
                                    :id="index"
                                />
                            </view>
                        </view>
                    </view>
                    <view class="date">
                        <view class="date-left"></view>
                        <view class="date-right">
                            <text class="pick-btn" @tap.stop="pickBtn(item.goods_id)">挑选</text>
                            <!-- <text class="share-btn" @tap="moreBtn(item)">操作</text> -->
                            <!-- <button @click="open">打开弹窗</button> -->
                        </view>
                    </view>
                </view>

                <!-- <view class="shop-section">
					<view class="logo">
						<image :src="item.store_logo" mode="aspectFill"></image>
					</view>
					<view class="store-desc">
						<view class="title">{{item.store_name}}</view>
						<view class="desc">{{item.store_desc}}</view>
					</view>
                </view>-->
                <!-- <view class="guess-section">
					<view 
						v-for="(val, key) in item.case_list" :key="key"
						class="guess-item"
						@click="navToDetailPage(val)"
					>
						<view class="image-wrapper">
							<image :src="val.image" mode="aspectFill"></image>
						</view>
					</view>
                </view>-->
            </view>
        </view>
        <uni-load-more :status="loadingType"></uni-load-more>
    </view>
</template>

<script>
const app = getApp();
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
    components: {
        uniLoadMore
    },
    data() {
        return {
            cateMaskState: 0, //分类面板展开状态
            headerPosition: "fixed",
            headerTop: "0px",
            loadingType: "more", //加载更多状态
            filterIndex: 0,
            cateId: 0, //已选三级分类id
            priceOrder: 0, //1 价格从低到高 2价格从高到低
            cateList: [],
            storeList: [],
            goodsList: [],
            page: 1
        };
    },

    onLoad(options) {
        // #ifdef H5
        this.headerTop =
            document.getElementsByTagName("uni-page-head")[0].offsetHeight +
            "px";
        // #endif
        this.cateId = options.tid;
        this.loadCateList(options.fid, options.sid);
    },
    onShow() {
        if (this.play_media == 1) {
            this.play_media = 0;
        } else {
            this.loadData("refresh");
        }
    },
    onPageScroll(e) {
        //兼容iOS端下拉时顶部漂移
        if (e.scrollTop >= 0) {
            this.headerPosition = "fixed";
        } else {
            this.headerPosition = "absolute";
        }
    },
    //下拉刷新
    onPullDownRefresh() {
        this.loadData("refresh");
    },
    //加载更多
    onReachBottom() {
        this.loadData();
    },
    methods: {
		pickBtn(goods_id){
			console.log(goods_id)
		},

        detailBtn(goods_id) {
            uni.navigateTo({
                url: "/pages/product/product?goods_id=" + goods_id
            });
        },

        async saveBtn(item) {
            const that = this;
            const media_list = item.goodsphoto || [];
            uni.showLoading({
                title: "保存中..."
            });

            let count = 0;
            for (const v of media_list) {
                await this.saveFileToAlbum(v.img_url);
                count++;
                if (count == media_list.length) {
                    uni.hideLoading();
                    const res = await app.request(
                        this.$Url + "/clmsj/goods/savegoodsteam",
                        { goods_id: item.goods_id }
                    );
                    if (res.data.code == 0) {
                        that.$api.msg("保存成功！");
                    }
                }
            }
        },

        saveFileToAlbum(url) {
            return new Promise((resolve, reject) => {
                uni.downloadFile({
                    url: url.replace(/http/, "https"), //仅为示例，并非真实的资源
                    success: res => {
                        if (res.statusCode === 200) {
                            const content_type = res.header[
                                "Content-Type"
                            ].split("/")[0];
                            if (content_type == "image") {
                                uni.saveImageToPhotosAlbum({
                                    filePath: res.tempFilePath,
                                    success: function() {
                                        resolve();
                                    },
                                    fail() {
                                        reject();
                                    }
                                });
                            } else {
                                uni.saveVideoToPhotosAlbum({
                                    filePath: res.tempFilePath,
                                    success: function() {
                                        resolve();
                                    },
                                    fail() {
                                        reject();
                                    }
                                });
                            }
                        }
                    }
                });
            });
        },
        editBtn(id) {
            this.$common.edit_id = id;
            uni.navigateTo({
                url: "/pages/product/add"
            });
        },
        delBtn(id, index) {
            uni.showModal({
                title: "提示",
                content: "确定删除改商品吗？",
                success: res => {
                    if (res.confirm) {
                        uni.request({
                            url: this.$Url + "/clmsj/goods/del_goods",
                            header: {
                                auth: uni.getStorageSync("session_key")
                            },
                            data: {
                                goods_id: id
                            },
                            method: "POST",
                            success: res => {
                                if (res.data.code == 0) {
                                    this.$api.msg("删除成功！");
                                    this.storeList.splice(index, 1);
                                }
                            }
                        });
                    }
                }
            });
        },
        shareBtn(index) {
            console.log(index);
        },
        videoPlay(e) {
            this.play_media = 1;
            const videoContext = uni.createVideoContext(e.currentTarget.id);
            videoContext.requestFullScreen();
        },
        previewImg(list, index) {
            this.play_media = 1;
            let _list = [];
            list.forEach(v => {
                if (v.status == 0) {
                    _list.push(v.img_url);
                }
            });

            console.log(_list);
            uni.previewImage({
                current: list[index].img_url,
                urls: _list
            });
        },
        //加载分类
        async loadCateList(fid, sid) {
            let list = await this.$api.json("cateList");
            let cateList = list.filter(item => item.pid == fid);

            cateList.forEach(item => {
                let tempList = list.filter(val => val.pid == item.id);
                item.child = tempList;
            });
            this.cateList = cateList;
        },
        //加载商品 ，带下拉刷新和上滑加载
        async loadData(type = "add", loading) {
            //没有更多直接返回
            if (type === "add") {
                if (this.loadingType === "nomore") {
                    return;
                }
                this.loadingType = "loading";
            } else {
                this.loadingType = "more";
            }

            if (type === "refresh") {
                this.page = 1;
            }

            uni.request({
                url: this.$Url + "/clmsj/goods/goodsList",
                header: {
                    auth: uni.getStorageSync("session_key")
                },
                data: {
                    team_id: 10000,
                    page: this.page
                },
                method: "POST",
                success: res => {
                    if (res.data.code == 1) {
                        uni.navigateTo({
                            url: "/pages/user/user"
                        });
                        return;
                    }

                    if (res.data.code == 0) {
                        let storeList = res.data.data;
                        this.page++;
                        //筛选，测试数据直接前端筛选了
                        // if (this.filterIndex === 1) {
                        //     storeList.sort((a, b) => b.sales - a.sales);
                        // }
                        // if (this.filterIndex === 2) {
                        //     storeList.sort((a, b) => {
                        //         if (this.priceOrder == 1) {
                        //             return a.price - b.price;
                        //         }
                        //         return b.price - a.price;
                        //     });
                        // }
                        if (type == "refresh") {
                            this.storeList = storeList;
                        } else {
                            this.storeList = this.storeList.concat(storeList);
                        }

                        //判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
                        this.loadingType =
                            storeList.length < 10 ? "nomore" : "more";
                        if (type === "refresh") {
                            if (loading == 1) {
                                uni.hideLoading();
                            } else {
                                uni.stopPullDownRefresh();
                            }
                        }
                    }
                }
            });
        },
        //筛选点击
        tabClick(index) {
            if (this.filterIndex === index && index !== 2) {
                return;
            }
            this.filterIndex = index;
            if (index === 2) {
                this.priceOrder = this.priceOrder === 1 ? 2 : 1;
            } else {
                this.priceOrder = 0;
            }
            uni.pageScrollTo({
                duration: 300,
                scrollTop: 0
            });
            this.loadData("refresh", 1);
            uni.showLoading({
                title: "正在加载"
            });
        },
        //显示分类面板
        toggleCateMask(type) {
            let timer = type === "show" ? 10 : 300;
            let state = type === "show" ? 1 : 0;
            this.cateMaskState = 2;
            setTimeout(() => {
                this.cateMaskState = state;
            }, timer);
        },
        //分类点击
        changeCate(item) {
            this.cateId = item.id;
            this.toggleCateMask();
            uni.pageScrollTo({
                duration: 300,
                scrollTop: 0
            });
            this.loadData("refresh", 1);
            uni.showLoading({
                title: "正在加载"
            });
        },
        //详情
        navToDetailPage(item) {
            //测试数据没有写id，用title代替
            let id = item.store_name;
            uni.navigateTo({
                url: `/pages/product/product?id=${id}`
            });
        },
        stopPrevent() {}
    }
};
</script>

