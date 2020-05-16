<template>
    <view class="container">
        <view class="carousel">
            <swiper indicator-dots circular="true" duration="400">
                <swiper-item class="swiper-item" v-for="(item,index) in videoList" :key="index">
                    <view class="image-wrapper">
                        <video
                            objectFit="cover"
                            play-btn-position="center"
                            :src="item"
                            :data-src="item"
                            @play="videoPlay(index)"
                            :id="index"
                        />
                    </view>
                </swiper-item>
                <swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
                    <view class="image-wrapper">
                        <image :src="item" class="loaded" mode="aspectFill" />
                    </view>
                </swiper-item>
            </swiper>
        </view>

        <view class="introduce-section">
            <view class="price-box">
                <view class="left">
                    <text class="price-tip" v-if="goods.shop_total_price > 0">¥</text>
                    <text class="price" v-if="goods.shop_total_price > 0">{{goods.shop_total_price}}</text>
                    <!-- <text class="m-price">¥488</text> -->
                    <!-- <text class=x"coupon-tip">7折</text> -->
                    <text class="stock-num">库存: {{goods.stock_num}}</text>
                </view>
                <view class="right">
                    <button class="share-btn" open-type="share">转发</button>
                </view>
            </view>
            <view class="title" v-if="goods.goods_remark">{{goods.goods_remark}}</view>
            <view class="bot-row" v-if="1==2">
                <text>销量: 108</text>
                <text>库存: 4690</text>
                <text>浏览量: 768</text>
            </view>
        </view>

        <view class="hot-goods" v-if="hotGoodsList.length > 0">
            <view class="d-header">
                <text>本店热卖</text>
            </view>
            <view class="list">
                <scroll-view class="floor-list" scroll-x>
                    <view class="scoll-wrapper">
                        <block v-for="(item, index) in hotGoodsList" :key="index">
                            <view
                                v-if="index < 5 && item.goods_photo[0].img_url"
                                class="floor-item"
                                @tap="detailBtn(item.goods_id)"
                            >
                                <image :src="item.goods_photo[0].img_url" mode="aspectFill" />
                            </view>
                        </block>
                    </view>
                    <view class="scoll-wrapper">
                        <block v-for="(item, index) in hotGoodsList" :key="index">
                            <view
                                v-if="index >= 4 && item.goods_photo[0].img_url"
                                class="floor-item"
                                @tap="detailBtn(item.goods_id)"
                            >
                                <image :src="item.goods_photo[0].img_url" mode="aspectFill" />
                            </view>
                        </block>
                    </view>
                </scroll-view>
            </view>
        </view>

        <view class="store-section" v-if="shop.id">
            <view class="logo">
                <image :src="shop.logo || '/static/missing-face.png'" />
            </view>
            <view class="desc-box">
                <view class="title">
                    {{shop.name}}
                    <text class="address" v-if="shop.address">(地址:{{shop.address}})</text>
                </view>
                <view class="desc">{{shop.intro}}</view>
            </view>
            <view class="handle">
                <!-- <view class="btn-link">
					<button class="share-shop" @tap="navTo('/pages/shop/index?sid'+ shop.id)">
						全部宝贝
					</button>
                </view>-->
                <view class="btn-link">
                    <button class="share-shop" @tap="navTo('/pages/shop/index?sid'+ shop.id)">进店逛逛</button>
                </view>
            </view>
        </view>

        <view class="detail-desc">
            <view class="d-header">
                <text>商品详情</text>
            </view>
            <view>
                <view v-for="(item, index) in imgList" :key="index">
                    <image
                        mode="widthFix"
                        style="width: 100%;"
                        :src="item"
                        :data-src="item"
                        @tap="previewImage(imgList,item)"
                    />
                </view>
            </view>
        </view>

        <view class="contact-box">
            <button class="btn-share" open-type="share">
                <view class="yticon icon-share1"></view>分享
            </button>
        </view>

        <!-- 规格-模态层弹窗 -->
        <view
            class="popup spec"
            :class="specClass"
            @touchmove.stop.prevent="stopPrevent"
            @click="toggleSpec"
        >
            <!-- 遮罩层 -->
            <view class="mask"></view>
            <view class="layer attr-content" @click.stop="stopPrevent">
                <view class="a-t">
                    <image
                        src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"
                    />
                    <view class="right">
                        <text class="price">¥{{goods.shop_total_price}}</text>
                        <text class="stock">
                            库存：
                            <text v-if="specSelected.num">{{specSelected.num}}</text>
                            <text v-else>{{goods.stock_num}}</text>件
                        </text>
                        <view class="selected">
                            已选：
                            <text
                                class="selected-text"
                                v-if="specSelected.size"
                            >{{specSelected.size}}</text>
                            <text
                                class="selected-text"
                                v-if="specSelected.color"
                            >{{specSelected.color}}</text>
                        </view>
                    </view>
                </view>
                <view v-for="(item,index) in specList" :key="index" class="attr-list">
                    <text>{{item.name}}</text>
                    <view class="item-list">
                        <text
                            v-for="(childItem, childIndex) in item.list"
                            :key="childIndex"
                            class="tit"
                            :class="{selected: item.selected==childItem}"
                            @click="selectSpec(childItem, index)"
                        >{{childItem}}</text>
                    </view>
                </view>
                <button class="btn" @click="buy">立即购买</button>
            </view>
        </view>
        <!-- 底部操作菜单 -->
        <view class="page-bottom">
            <view class="action-handle">
                <view class="item">
                    <navigator url="/pages/index/index" open-type="reLaunch" class="p-b-btn">
                        <text class="yticon icon-dianpu"></text>
                        <text>首页</text>
                    </navigator>
                </view>
                <!-- <navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
					<text class="yticon icon-gouwuche"></text>
					<text>购物车</text>
                </navigator>-->
                <view class="item p-b-btn" :class="{active: favorite}" @click="toFavorite">
                    <text class="yticon icon-shoucang"></text>
                    <text>收藏</text>
                </view>
                <view class="item p-b-btn" v-if="goods.status==0">
                    <button
                        type="primary"
                        class="btn-none"
                        open-type="contact"
                        :send-message-title="shop.name"
                        :send-message-img="shop.cover || '/static/shop-bg-none.png'"
                        :send-message-path="'/pages/shop/index?sid='+ shop.id"
                        :session-from="'sid='+ shop.id"
                        show-message-card="true"
                    >
                        <text class="yticon icon-kefu"></text>
                        <text>客服</text>
                    </button>
                </view>
            </view>
            <view class="action-btn-group">
                <block v-if="goods.status==0">
                    <button
                        type="primary"
                        class="action-btn no-border buy-now-btn"
                        @click="toggleSpec"
                    >
                        <text class="yticon icon-weixinzhifu"></text>立即购买
                    </button>
                </block>
                <block v-else>
                    <button
                        type="primary"
                        class="action-btn no-border buy-now-btn"
                        open-type="contact"
                        :send-message-title="shop.name"
                        :send-message-img="shop.cover || '/static/shop-bg-none.png'"
                        :send-message-path="'/pages/shop/index?sid='+ shop.id"
                        :session-from="'sid='+ shop.id"
                        show-message-card="true"
                    >
                        <text class="yticon icon-kefu"></text>联系客服
                    </button>
                </block>
                <!-- <button type="primary" class=" action-btn no-border add-cart-btn">加入购物车</button> -->
            </view>
        </view>
        <uni-login ref="uniLogin" type="login" :showLogin="1" :onlyLogin="0"></uni-login>
    </view>
</template>

<script>
const app = getApp();
import uniLogin from "@/components/uni-login";
import share from "@/components/share";
export default {
    components: {
        uniLogin,
        share
    },
    data() {
        return {
            goods: {},
            favorite: true,
            shareList: [],
            videoList: [],
            hotGoodsList: [],
            imgList: [],
            shop: [],
            share_uid: 0,
            isLive: 0,
            desc: "",
            specClass: "none",
            specSelected: {
                size: "",
                color: ""
            },
            specList: {
                size: {
                    key: "size",
                    name: "尺码",
                    selected: "",
                    list: []
                },
                color: {
                    key: "color",
                    name: "颜色",
                    selected: "",
                    list: []
                }
            }
        };
    },
    async onLoad(options) {
        const share_openid = options.share_openid;
        let share_uid = 0;
        console.log("share_openid == " + share_openid);
        if (share_openid) {
            const res = await app.request(
                this.$Url + "/clmsj/login/getLsbUid",
                {
                    openid: share_openid
                }
            );

            share_uid = res.data.data;
        }
        console.log("share_uid == " + share_uid);
        const shop_id = options.shop_id || 0;
        if (shop_id > 0) {
            await app.request(this.$Url + "/clmsj/Shopview/bindShop", {
                shopId: shop_id
            });
        }

        this.isLive = options.room_id || 0; //房间号
        const sid = options.sid || 0;
        this.sid = sid;
        this.share_uid = share_uid || options.share_uid || 0; //上级uid
        //接收传值,id里面放的是标题，因为测试数据并没写id
        let goods_id = options.goods_id || 87;

        console.log("onload share_uid" + this.share_uid);
        const res = await app.request(
            this.$Url + "/clmsj/goods/goodsdetail_shop",
            {
                goods_id: goods_id,
                shop_id: this.sid
            }
        );
        const goods = res.data.data;
        this.goods = goods;

        this.specList.size.list = this.goods.specList.size;
        this.specList.color.list = this.goods.specList.color;

        this.imgList = goods.goodsphoto_image;
        this.videoList = goods.goodsphoto_video;
        uni.setNavigationBarTitle({
            title: this.goods.goods_remark || "商品详情"
        });

        let resList = await app.request(this.$Url + "/clmsj/goods/myshop", {
            shop_id: this.sid
        });
        if (resList.data.code == 0) {
            this.shop = resList.data.data.shop;
            this.hotGoodsList = resList.data.data.shop_main;
        }

        const user = uni.getStorageSync("userInfo");
        const path =
            "/pages/product/product?goods_id=" +
            this.goods.goods_id +
            "&shop_id=" +
            this.sid +
            "&pid=" +
            user.id;
        app.weixinShare(
            this.goods.goods_remark || "快来看看这里的商品吧",
            this.goods.goods_remark,
            path
        );
        // //规格 默认选中第一条
        // this.specList.forEach(item=>{
        // 	for(let cItem of this.specChildList){
        // 		if(cItem.pid === item.id){
        // 			this.$set(cItem, 'selected', true);
        // 			this.specSelected.push(cItem);
        // 			break; //forEach不能使用break
        // 		}
        // 	}
        // })
        // this.shareList = await this.$api.json('shareList');
    },
    onShareAppMessage(res) {
        const user = uni.getStorageSync("userInfo");
        const path =
            "/pages/product/product?goods_id=" +
            this.goods.goods_id +
            "&shop_id=" +
            this.sid +
            "&pid=" +
            user.id;
        return {
            title: this.goods.goods_remark || "快来看看这里的商品吧",
            path
        };
    },
    methods: {
        detailBtn(goods_id) {
            uni.navigateTo({
                url:
                    "/pages/product/product?goods_id=" +
                    goods_id +
                    "&sid=" +
                    this.sid
            });
        },
        videoPlay(id) {
            this.play_media = 1;
            const videoContext = uni.createVideoContext(id);
            videoContext.requestFullScreen();
        },
        //规格弹窗开关
        toggleSpec() {
            console.log(this.specList.size.list.length);
            console.log(this.specList.size.list.length);
            if (
                this.specList.size.list.length == 0 &&
                this.specList.color.list.length == 0
            ) {
                this.buy();
                return;
            }
            if (this.specClass === "show") {
                this.specClass = "hide";
                setTimeout(() => {
                    this.specClass = "none";
                }, 250);
            } else if (this.specClass === "none") {
                this.specClass = "show";
            }
        },
        //选择规格
        selectSpec(subitem, index) {
            this.specList[index].selected = subitem;
            this.specSelected[index] = subitem;

            this.goods.storageList.forEach(item => {
                if (
                    item.color == this.specSelected.color &&
                    item.size == this.specSelected.size
                ) {
                    this.specSelected.num = item.num;
                }
            });
            console.log(this.specSelected);
        },
        shareBtn(goods_id, shop_id) {},
        //分享
        share() {
            this.$refs.share.toggleMask();
        },
        //收藏
        toFavorite() {
            this.favorite = !this.favorite;
        },
        buy() {
            let userInfo = uni.getStorageSync("userInfo");
            let auth = uni.getStorageSync("session_key");
            if (!auth && !userInfo.id) {
                this.$refs.uniLogin.toggleMask();
                return;
            }

            // console.log("this.specList.length==" + this.specList.length)
            if (
                this.specList.size.list.length > 0 ||
                this.specList.color.list.length > 0
            ) {
                if (!this.specSelected.size || !this.specSelected.color) {
                    uni.showToast({
                        icon: "none",
                        title: "请选择尺码及颜色再进行购买"
                    });
                    return;
                } else {
                    if (this.specSelected.num <= 0) {
                        uni.showToast({
                            icon: "none",
                            title: "库存不足"
                        });
                        return;
                    }
                }
            }
            let param = this.specSelected;
            param.sid = this.sid;
            param.goods_id = this.goods.goods_id;
            param.live = this.isLive;
            param.share_uid = this.share_uid || 0;

            console.log("buy share_uid" + this.share_uid);

            uni.navigateTo({
                url: `/pages/order/createOrder?detail=` + JSON.stringify(param)
            });
        },
        navTo(url, type) {
            if (type == "switchTab") {
                uni.switchTab({
                    url
                });
            } else {
                uni.navigateTo({
                    url
                });
            }
        },
        stopPrevent() {}
    }
};
</script>

<style lang='scss'>
page {
    background: $page-color-base;
    padding-bottom: 160upx;
}

.icon-you {
    font-size: $font-base + 2upx;
    color: #888;
}
.carousel {
    height: 600upx;
    position: relative;
    swiper {
        height: 100%;
    }
    .image-wrapper {
        width: 100%;
        height: 100%;
    }
    .swiper-item {
        display: flex;
        justify-content: center;
        align-content: center;
        height: 750upx;
        overflow: hidden;
        image {
            width: 100%;
            height: 100%;
        }
        video {
            width: 100%;
            height: 100%;
        }
    }
}

/* 标题简介 */
.introduce-section {
    background: #fff;
    padding: 20upx 30upx;

    .title {
        font-size: 30upx;
        color: $font-color-dark;
        line-height: 50upx;
    }
    .price-box {
        display: flex;
        justify-content: space-between;
        height: 64upx;
        padding: 10upx 0;
        font-size: 26upx;
        ccolor: #fa436a;

        .share-btn {
            color: white;
            background-color: #ff4375;
            padding: 5upx 20upx;
            border-radius: 10upx;
            font-size: 14px;
            line-height: 1.4;
            height: auto;
        }
    }
    .price-tip {
        color: #fa436a;
    }
    .price {
        font-size: 24px;
        font-weight: bold;
        color: #fa436a;
    }
    .m-price {
        margin: 0 12upx;
        color: $font-color-light;
        text-decoration: line-through;
    }
    .stock-num {
        color: #999999;
        font-size: 14px;
        margin-left: 15px;
    }
    .coupon-tip {
        align-items: center;
        padding: 4upx 10upx;
        background: $uni-color-primary;
        font-size: $font-sm;
        color: #fff;
        border-radius: 6upx;
        line-height: 1;
        transform: translateY(-4upx);
    }
    .bot-row {
        display: flex;
        align-items: center;
        height: 50upx;
        font-size: $font-sm;
        color: $font-color-light;
        text {
            flex: 1;
        }
    }
}

.store-section {
    background: #ffffff;
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    .logo {
        width: 80px;
        text-align: center;
        image {
            width: 60px;
            height: 60px;
            border-radius: 5px;
        }
    }
    .desc-box {
        margin-top: 6px;
        width: calc(100% - 160px);
        color: #333333;
        .title {
            font-size: 16px;
        }
        .address {
            font-size: 14px;
        }
        .desc {
            font-size: 12px;
            line-height: 25px;
            height: 25px;
            overflow: hidden;
        }
    }
    .handle {
        width: 70px;
        display: flex;
        margin-right: 5px;
        justify-content: space-between;
        .btn-link {
            margin-top: 6px;
            background: #ffffff;
            color: #ff4375;
            border-radius: 6px;
            width: 60px;
            height: 30px;
            line-height: 28px;
            font-size: 12px;
            text-align: center;
            border: 1px solid #ff4375;
            button {
                border: 0px;
                background: none;
                padding: 0px;
                color: #ff4375;
                font-size: 12px;
                height: 30px;
                line-height: 28px;
            }
        }
    }
}
.hot-goods {
    background: #ffffff;
    margin-top: 10px;
    .list {
        padding: 10px 0px;
        margin: 0px 10px;
        height: 250px;

        .floor-list {
            /* white-space: nowrap; */
            height: 240px;
        }
        .scoll-wrapper {
            display: flex;
            flex: 1;
            align-items: flex-start;
            align-content: flex-start;
            height: 120px;
        }
        .floor-item {
            width: 110px;
            margin-right: 6px;
            image {
                width: 110px;
                height: 110px;
                border-radius: 3px;
            }
        }
    }
}

/* 分享 */
.share-section {
    display: flex;
    align-items: center;
    color: $font-color-base;
    background: linear-gradient(left, #fdf5f6, #fbebf6);
    padding: 12upx 30upx;
    .share-icon {
        display: flex;
        align-items: center;
        width: 70upx;
        height: 30upx;
        line-height: 1;
        border: 1px solid $uni-color-primary;
        border-radius: 4upx;
        position: relative;
        overflow: hidden;
        font-size: 22upx;
        color: $uni-color-primary;
        &:after {
            content: "";
            width: 50upx;
            height: 50upx;
            border-radius: 50%;
            left: -20upx;
            top: -12upx;
            position: absolute;
            background: $uni-color-primary;
        }
    }
    .icon-xingxing {
        position: relative;
        z-index: 1;
        font-size: 24upx;
        margin-left: 2upx;
        margin-right: 10upx;
        color: #fff;
        line-height: 1;
    }
    .tit {
        font-size: $font-base;
        margin-left: 10upx;
    }
    .icon-bangzhu1 {
        padding: 10upx;
        font-size: 30upx;
        line-height: 1;
    }
    // .share-btn {
    //     flex: 1;
    //     text-align: right;
    //     font-size: $font-sm;
    //     color: $uni-color-primary;
    // }
    .icon-you {
        font-size: $font-sm;
        margin-left: 4upx;
        color: $uni-color-primary;
    }
}

.c-list {
    font-size: $font-sm + 2upx;
    color: $font-color-base;
    background: #fff;
    .c-row {
        display: flex;
        align-items: center;
        padding: 20upx 30upx;
        position: relative;
    }
    .tit {
        width: 140upx;
    }
    .con {
        flex: 1;
        color: $font-color-dark;
        .selected-text {
            margin-right: 10upx;
        }
    }
    .bz-list {
        height: 40upx;
        font-size: $font-sm + 2upx;
        color: $font-color-dark;
        text {
            display: inline-block;
            margin-right: 30upx;
        }
    }
    .con-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        color: $font-color-dark;
        line-height: 40upx;
    }
    .red {
        color: $uni-color-primary;
    }
}

/* 评价 */
.eva-section {
    display: flex;
    flex-direction: column;
    padding: 20upx 30upx;
    background: #fff;
    margin-top: 16upx;
    .e-header {
        display: flex;
        align-items: center;
        height: 70upx;
        font-size: $font-sm + 2upx;
        color: $font-color-light;
        .tit {
            font-size: $font-base + 2upx;
            color: $font-color-dark;
            margin-right: 4upx;
        }
        .tip {
            flex: 1;
            text-align: right;
        }
        .icon-you {
            margin-left: 10upx;
        }
    }
}
.eva-box {
    display: flex;
    padding: 20upx 0;
    .portrait {
        flex-shrink: 0;
        width: 80upx;
        height: 80upx;
        border-radius: 100px;
    }
    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        font-size: $font-base;
        color: $font-color-base;
        padding-left: 26upx;
        .con {
            font-size: $font-base;
            color: $font-color-dark;
            padding: 20upx 0;
        }
        .bot {
            display: flex;
            justify-content: space-between;
            font-size: $font-sm;
            color: $font-color-light;
        }
    }
}
/*  详情 */
.detail-desc {
    background: #fff;
    margin-top: 10px;
}
.d-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80upx;
    font-size: $font-base + 2upx;
    color: $font-color-dark;
    position: relative;

    text {
        padding: 0 20upx;
        background: #fff;
        position: relative;
        z-index: 1;
    }
    &:after {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%);
        width: 300upx;
        height: 0;
        content: "";
        border-bottom: 1px solid #ccc;
    }
}
/* 规格选择弹窗 */
.attr-content {
    padding: 10upx 30upx;
    .a-t {
        display: flex;
        image {
            width: 170upx;
            height: 170upx;
            flex-shrink: 0;
            margin-top: -40upx;
            border-radius: 8upx;
        }
        .right {
            display: flex;
            flex-direction: column;
            padding-left: 24upx;
            font-size: $font-sm + 2upx;
            color: $font-color-base;
            line-height: 42upx;
            .price {
                font-size: $font-lg;
                color: $uni-color-primary;
                margin-bottom: 10upx;
            }
            .selected-text {
                margin-right: 10upx;
            }
        }
    }
    .attr-list {
        display: flex;
        flex-direction: column;
        font-size: $font-base + 2upx;
        color: $font-color-base;
        padding-top: 30upx;
        padding-left: 10upx;
    }
    .item-list {
        padding: 20upx 0 0;
        display: flex;
        flex-wrap: wrap;
        text {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eee;
            margin-right: 20upx;
            margin-bottom: 20upx;
            border-radius: 5px;
            min-width: 60upx;
            height: 60upx;
            padding: 0 20upx;
            font-size: $font-base;
            color: $font-color-dark;
        }
        .selected {
            background: #fa436a;
            color: #ffffff;
        }
    }
}

/*  弹出层 */
.popup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;

    &.show {
        display: block;
        .mask {
            animation: showPopup 0.2s linear both;
        }
        .layer {
            animation: showLayer 0.2s linear both;
        }
    }
    &.hide {
        .mask {
            animation: hidePopup 0.2s linear both;
        }
        .layer {
            animation: hideLayer 0.2s linear both;
        }
    }
    &.none {
        display: none;
    }
    .mask {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .layer {
        position: fixed;
        z-index: 99;
        bottom: 0;
        width: 100%;
        min-height: 40vh;
        border-radius: 10upx 10upx 0 0;
        background-color: #fff;
        .btn {
            height: 66upx;
            line-height: 66upx;
            border-radius: 100upx;
            background: $uni-color-primary;
            font-size: $font-base + 2upx;
            color: #fff;
            margin: 30upx auto 20upx;
        }
    }
    @keyframes showPopup {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes hidePopup {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes showLayer {
        0% {
            transform: translateY(120%);
        }
        100% {
            transform: translateY(0%);
        }
    }
    @keyframes hideLayer {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(120%);
        }
    }
}

.contact-box {
    position: fixed;
    z-index: 999;
    right: 5px;
    bottom: 100px;
    width: 50px;
    button:after,
    .btn-share {
        background: rgba(0, 0, 0, 0.6);
        box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        color: #ffffff;
        font-size: 15px;
        width: 50px;
        height: 50px;
        line-height: 18px;
        padding: 0px;
        margin: 0px;
        border: none;
        padding-top: 5px;
    }
    button:after {
        background: none;
        border: none;
        box-shadow: none;
    }
}
/* 底部操作菜单 */
.page-bottom {
    position: fixed;
    left: 0upx;
    bottom: 0upx;
    z-index: 95;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100upx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
    border-radius: 0upx;

    .action-handle {
        width: 50%;
        display: flex;
        justify-content: space-between;
        .item {
            width: 50%;
        }
        .p-b-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: $font-sm;
            color: $font-color-base;
            height: 80upx;
            .yticon {
                font-size: 40upx;
                line-height: 48upx;
                color: #555555;
            }
            &.active,
            &.active .yticon {
                color: $uni-color-primary;
            }
            .icon-fenxiang2 {
                font-size: 42upx;
                transform: translateY(-2upx);
            }
            .icon-shoucang {
                font-size: 46upx;
            }
            .btn-none,
            button:after {
                border: none;
                padding: 0px;
                margin: 0px;
                background: none;
                color: #333333;
                display: flex;
                flex-direction: column;
                line-height: 20px;
                justify-content: center;
                font-size: $font-sm;
                color: $font-color-base;
            }
        }
    }
    .action-btn-group {
        width: 50%;
        display: flex;
        height: 100%;
        border-radius: 0px;
        overflow: hidden;
        box-shadow: 0 20upx 40upx -16upx #fa436a;
        box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
        background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
        margin-left: 0upx;
        position: relative;

        &:after {
            content: "";
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translateY(-50%);
            height: 28upx;
            width: 0;
            /* border-right: 1px solid rgba(255, 255, 255, 0.5); */
        }
        .btn-none,
        button:after {
            border: none;
            padding: 0px;
            margin: 0px;
            background: none;
            color: #333333;
            display: flex;
            flex-direction: column;
            line-height: 20px;
            justify-content: center;
            font-size: $font-sm;
            color: $font-color-base;
            border: 0px;
        }
        .action-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 180upx;
            height: 100%;
            font-size: $font-base;
            padding: 0;
            border-radius: 0;
            background: transparent;
            .yticon {
                margin-right: 5px;
                margin-top: -5px;
                font-size: 25px;
            }
        }
    }
}
</style>
