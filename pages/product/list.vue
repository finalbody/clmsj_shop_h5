<template>
    <view class="content">
		<view class="tabs">
			<view class="item" :class="{'on': selectShopType==0}" @tap="changeTabs(0)">挑货广场</view>
			<view class="item" :class="{'on': selectShopType==1}" @tap="changeTabs(1)">我的商品</view>
		</view>
        <view class="store-section">
            <!-- <view class="save-all-btn">
                <view>新产品一键保存 ></view>
            </view>-->
            <view
                v-for="(item, index) in goodsList"
                :key="index"
               @tap="detailBtn(item.goods_id, item.team_id)"
                class="store-item"
            >
                <view class="left">
                    <view class="logo">
                        <image :src="item.team_logo || '/static/missing-face.png'" mode="aspectFill" />
                    </view>
                </view>

                <view class="right">
                    <view class="name">
						{{item.team_name}}
						<text class="address" v-if="item.team_address">({{item.team_address}})</text>
					</view>
                    <view class="desc">
					{{item.goods_remark}}
					<text class="zhuda" v-if="item.goods_zd_status == 1">团队推荐</text>
					</view>
                    <view class="imgs">
                        <view v-for="(val, key) in item.goodsphoto" :key="key" class="img-wrap">
                            <view v-if="val.status==0">
                                <image :src="val.img_url" mode="aspectFill" @tap="previewImg(item.goodsphoto, key)" />
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
					<view class="attr-box" v-if="item.shop_price > 0">
						<view class="price">
							拿货价￥<text>{{item.shop_price}}</text>
							建议零售价￥<text>{{item.proposal_price}}</text>
							
							<text style="margin-left: 10px;" v-if="item.shop_total_price >0">销售价：￥{{item.shop_total_price}}</text>
						</view>
					</view>
                    <view class="date">
                        <view class="date-left">
							{{item.add_time}}发布
						</view>
                        <view class="date-right">
                            <text v-if="item.select_shop==0" class="pick-btn" @tap.stop="showSetSale(item, index)">立即铺货</text>
							<block v-else>
								<text class="cancel-btn" @tap.stop="cancelPickBtn(item, index)">
									取消铺货
								</text>
								<text v-if="item.shop_goods_zd_status == 0" class="pick-btn" @tap.stop="btnZhuda(item.goods_id, index)">
									设为主打
								</text>
								<text v-if="item.shop_goods_zd_status == 1" class="cancel-btn" style="" @tap.stop="btnZhuda(item.goods_id, index)">
									取消主打
								</text>
							</block>
							
							<!-- <text class="share-btn" @tap="moreBtn(item)">操作</text> -->
                            <!-- <button @click="open">打开弹窗</button> -->
                        </view>
                    </view>
					
					<view class="tips" v-if="showSaleBox">
						<view class="mask-bg" @tap="hideSetSale"></view>	
						<view class="mask-box">
							<view style="text-align: left;line-height: 30px;">请设置商品销售价格</view>
							<view class="goods-sale">
								<view class="info-box">
									<text :class="{'on' : priceInfo.add_price==10}" @tap="setAddPrice(10)">+10元</text>
									<text :class="{'on' : priceInfo.add_price==20}" @tap="setAddPrice(20)">+20元</text>
									<text :class="{'on' : priceInfo.add_price==30}" @tap="setAddPrice(30)">+30元</text>
									<text :class="{'on' : priceInfo.add_price==40}" @tap="setAddPrice(40)">+40元</text>
									<input @blur="setAddPrice_txt" :class="{'on' : priceInfo.add_price != 0 && priceInfo.add_price != 10 && priceInfo.add_price != 20 && priceInfo.add_price != 30 && priceInfo.add_price != 40}" type="number" maxlength="7" v-model="priceInfo.add_price" placeholder="自定义" />
									<text :class="{'on' : priceInfo.add_price== (priceInfo.proposal_price - priceInfo.cost_price)}" @tap="setAddPrice(priceInfo.proposal_price - priceInfo.cost_price)">按建议价{{priceInfo.proposal_price}}销售</text>
								</view>
								<view class="ps-msg">
									<view>拿货价:<text>{{priceInfo.cost_price}}元</text>，建议售价:<text>{{priceInfo.proposal_price}}元</text></view>
									<view>加价后售价为<text>{{priceInfo.sale_price}}元</text></view>
									<view>您的预计收益为<text>{{priceInfo.profits}}元</text></view>
								</view>
							</view>
							<view class="handle">
								<button class="btn" type="warn" @tap="pickBtn()"><text>确认铺货</text></button>
								
								<button class="btn" style="margin-top: 10px;" type="default" @tap="hideSetSale()"><text>暂不铺货</text></button>
							</view>
						</view>
					</view>
					
                </view>
            </view>
        </view>
        <uni-load-more :status="loadingType"></uni-load-more>
		
		<page-bottom type="tabBar"></page-bottom>
    </view>
</template>

<script>
const app = getApp();
import pageBottom from '@/components/page-bottom';
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
    components: {
        pageBottom,uniLoadMore
    },
    data() {
        return {
            cateMaskState: 0, //分类面板展开状态
            headerPosition: "fixed",
            headerTop: "0px",
			showSaleBox:0,  //是否开启设置铺货
            loadingType: "more", //加载更多状态
            filterIndex: 0,
			selectShopType:0, //0=未铺货商品 1=已铺货商品
            cateId: 0, //已选三级分类id
            priceOrder: 0, //1 价格从低到高 2价格从高到低
            cateList: [],
            storeList: [],
            goodsList: [],
            page: 1,
			priceInfo:{
				goods_id:0,
				cost_price:0,
				add_price:0,
				sale_price : 0,
				profits : 0,
			}
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
		        url: this.$Url + "/clmsj/goods/getall_goodslist",
		        header: {
		            auth: uni.getStorageSync("session_key")
		        },
		        data: {
		            selectShopType: this.selectShopType,
		            page: this.page
		        },
		        method: "POST",
		        success: res => {
					uni.hideLoading();
		            if (res.data.code == 1) {
		                uni.navigateTo({
		                	url: "/pages/user/user"
		                });
		                return;
		            }
		
		            if (res.data.code == 0) {
		                let goodsList = res.data.data;
		                this.page++;
		                if (type == "refresh") {
		                    this.goodsList = goodsList;
		                } else {
		                    this.goodsList = this.goodsList.concat(goodsList);
		                }
		
		                //判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
		                this.loadingType =
		                    goodsList.length < 10 ? "nomore" : "more";
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
		setAddPrice_txt(e){
			this.priceInfo.add_price = e.detail.value;
			this.setAddPrice(this.priceInfo.add_price);
		},
		setAddPrice(price){
			console.log(this.priceInfo);
			
			console.log(this.priceInfo.cost_price);
			console.log(price);
			console.log(Number(this.priceInfo.cost_price + price).toFixed(2));
			
			this.priceInfo.add_price = price;
			this.priceInfo.sale_price = (Number(this.priceInfo.cost_price) + Number(price)).toFixed(2);
			this.priceInfo.profits = (Number(price) * 0.99).toFixed(2);
			this.$forceUpdate();
		},
		hideSetSale(){
			this.showSaleBox = 0;
		},
		showSetSale(item,index){
			if(item.status==1){
				this.priceInfo = {
					index:index,
					status:item.status,
					goods_id: item.goods_id,
					cost_price:item.shop_price,
					proposal_price:item.proposal_price,
					add_price: 0,
					sale_price : 0,
					profits : 0,
				}
				this.pickBtn();
			}else{
				if(Number(item.shop_price) <= 0){
					this.$api.msg("该商品暂不支持铺货销售！");
					return;
				}
				this.priceInfo = {
					index:index,
					status:item.status,
					goods_id: item.goods_id,
					cost_price:item.shop_price,
					proposal_price:item.proposal_price,
					add_price: 0,
					sale_price : 0,
					profits : 0,
				}
				this.showSaleBox = 1;
			}
		},
		//铺货
		async pickBtn(){
			if(this.priceInfo.status == 0){
				if(this.priceInfo.add_price <= 0 ){
					this.$api.msg("请设置加价价格！");
					return;
				}
			}
			uni.showLoading({
				title: "铺货中..."
			});			
			const res = await app.request(this.$Url+'/clmsj/goods/getgoods', {
				goods_id: this.priceInfo.goods_id,
				raise_price : this.priceInfo.add_price
			});
			this.goodsList[this.priceInfo.index].select_shop = res.data.data.select_shop;
			uni.hideLoading();
			this.$api.msg('铺货成功！');
			this.hideSetSale();
			
		},
		// 取消铺货
		async cancelPickBtn(item, index){
			uni.showLoading({
				title: "取消铺货中..."
			});			
			const res = await app.request(this.$Url+'/clmsj/goods/getgoods', {
				goods_id: item.goods_id
			});
			this.goodsList[index].select_shop = res.data.data.select_shop;
			uni.hideLoading();
			this.$api.msg('取消铺货成功！');
			
		},
		async btnZhuda(goods_id, index){
			uni.showLoading({
			    title: "设置中..."
			});			
		    const res =await app.request(this.$Url+'/clmsj/goods/shopGoodsZdStatus', {goods_id});
			uni.hideLoading();
			if (res.data.code == 0) {
				this.goodsList[index].shop_goods_zd_status = res.data.goods_zd_status;
			}
			
		},
        detailBtn(goods_id, sid) {
			return;
             uni.navigateTo({
                url: "/pages/product/product?goods_id=" + goods_id + "&sid=" + sid
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
                                    this.goodsList.splice(index, 1);
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
        changeTabs(index){
			this.selectShopType = index;
			uni.pageScrollTo({
			    duration: 300,
			    scrollTop: 0
			});
			this.loadData("refresh", 1);
			uni.showLoading({
			    title: "正在加载"
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


<style lang="scss">
	@import "../../static/css/skin.css";
page,
.content {
    background: $page-color-base;
}
// .content{
// 	padding-top: 96upx;
// }
.tabs{
	position: fixed;
	left: 0;
	top: var(--window-top);
	display: flex;
	width: 100%;
	height: 40px;line-height: 40px;
	background: #fff;
	box-shadow: 0 2upx 10upx rgba(0, 0, 0, 0.06);
	z-index: 10;
	.item {
	    flex: 1;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    height: 100%;
	    font-size: 30upx;
	    color: $font-color-dark;
	    position: relative;
	    &.on {
	        color: $base-color;
	        &:after {
	            content: "";
	            position: absolute;
	            left: 50%;
	            bottom: 0;
	            transform: translateX(-50%);
	            width: 260upx;
	            height: 0;
	            border-bottom: 4upx solid $base-color;
	        }
	    }
	}
}
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

.tips{
	padding: 0px;
	.mask-bg{
		left: 0;right: 0;top: 0;bottom: 0; background: #303133;opacity: 0.1; z-index: 98;position: fixed;
	}
	.mask-box{
		position: fixed;
		bottom: calc(50% - 75px);
		left: 10%;
		right: 10%;
		z-index: 99;
		background: #ffffff;
		padding: 10px 20px;
		min-height: 150px;
		border-radius: 5px;
	}
}

.goods-sale{
	width: 100%;
	padding: 15px 0px;
	.info-box{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		input,text{
			padding: 4px 6px;
			border: 1px solid #EEEEEE;
			font-size: 14px;
			margin: 5px 5px;
		}
		input{
			width: 80px;
			height: 30px;line-height: 30px;
			text-align: center;
		}
		.on{
			border: 1px solid #FF0000;
		}
	}
	.ps-msg{
		padding: 10px 0px;
		line-height: 25px;
		font-size: 14px;
		color: #606266;
		text{
			color: #FA436A;
		}
	}
	.handle{ 
		margin-top: 15px;
		.btn{
			margin: 10px 0px;
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
	margin-top: 50px;
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
            font-size: 16px;
            color: #566687;
			line-height: 28px;
        }
        .desc {
            color: #111;
            margin-bottom: 10upx;
            font-size: 15px;
        }
		.address{
			font-size: 14px;
			margin: 0px 3px;
		}
		.zhuda{
			margin-left: 3px;
			align-items: center;
			padding: 4upx 10upx;
			background: #F76260;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
        .imgs {
            display: flex;
            flex-wrap: wrap;
            .img-wrap {
                margin: 10upx 5upx;
                image {
                    width: 190upx;
                    height: 190upx;
                    display: block;
                }
                video {
                    width: 190upx;
                    height: 190upx;
                    display: block;
                }
            }
        }
		.attr-box{
			.price{
				color: #FF0000;
				font-size: 14px;
			}
			text{margin-right: 10px;}
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
				padding: 10upx 20upx;
				border-radius: 10upx;
				margin: 0px 5px;
            }
			.cancel-btn {
			    background: #F8F6FC;
				color: #333333;
				padding: 10upx 20upx;
				border-radius: 10upx;
				margin: 0px 5px;
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
