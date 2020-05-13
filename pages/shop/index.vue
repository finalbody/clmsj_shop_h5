<template>
    <view class="content">
		<!-- <official-account>关注公众号</official-account> -->
		<view class="store-info" v-if="shop.name">
			<view class="bg"><image :src="shop.cover || '/static/shop-bg-none.png'" mode="aspectFill"></image></view>
			<view class="info">
				<view class="mask"></view>
				<view class="shop">
					<view class="logo"><image :src="shop.logo || '/static/missing-face.png'"></image></view>
					<view class="desc-box">
						<view class="title">{{shop.name}}
							<text class="address" v-if="shop.address">(地址:{{shop.address}})</text>
						</view>
						<view class="desc">{{shop.intro}}</view>
						
					</view>
					<view class="share">
						<view class="btn-share">
							<button class="share-shop" open-type="share" @tap.stop="shareShop">
								<text class="yticon icon-share"></text>转发
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mp-search-box">
			<view class="search">
				<input class="ser-input" type="text" placeholder="请输入关键词搜索" v-model="searchVal" placeholder-class="placeholder" @blur="searchGoods" />
			</view>
			<view class="cate" @click="toggleCateMask('show')">
				<text class="cate-item yticon icon-fenlei1"></text>
				全部分类
			</view>
		</view>
		<view class="hot-goods" v-if="hotGoodsList.length > 0">
			<view class="tit-name">
				<text class="yticon icon-zhudashangpin"></text>主打商品
			</view>
			<view class="list">
				<scroll-view class="floor-list" scroll-x>
					<view class="scoll-wrapper">
						<block v-for="(item, index) in hotGoodsList" :key="index">
							<view v-if="index < 5 && item.goods_photo[0].img_url" class="floor-item" @tap="detailBtn(item.goods_id, shop.id)">
								<image :src="item.goods_photo[0].img_url" mode="aspectFill" />
							</view>
						</block>
					</view>
					<view class="scoll-wrapper">
						<block v-for="(item, index) in hotGoodsList" :key="index">
							<view v-if="index >= 4 && item.goods_photo[0].img_url" class="floor-item" @tap="detailBtn(item.goods_id, shop.id)">
								<image :src="item.goods_photo[0].img_url" mode="aspectFill" />
							</view>
						</block>
					</view>
				</scroll-view>
				
			</view>
		</view>
		<view class="history-view" v-if="shopViewList.length > 0">
			<view class="tit-name">
				<text class="yticon icon-zhudashangpin"></text>最近访客
			</view>
			<view class="list">
				<block v-for="(item, index) in shopViewList" :key="index">
					<view v-if="item.avatarUrl" class="item">
						<image :src="item.avatarUrl" mode="aspectFill" />
					</view>
				</block>
			</view>
		</view>
        <view class="store-section">
            <view class="tit-name">
				<text class="yticon icon-xinshangpin"></text>最新商品
			</view>
            <view
                v-for="(item, index) in storeList"
                :key="index"
                @tap="detailBtn(item.goods_id, shop.id)"
                class="store-item"
            >
				<!-- <view class="store-name">{{item.shop.name}}</view> -->
				<view class="goods-remark">{{item.goods_remark}}</view>
				<view class="goods-imgs">
					<!-- ,'img-wrap-max':item.goodsphoto.length == 2 || item.goodsphoto.length == 4 -->
					<view v-for="(val, key) in item.goodsphoto" :key="key" class="img-wrap" :class="{'img-wrap-max1':item.goodsphoto.length == 1}">
						<view v-if="item.video && key==0" style="position: relative;">
							<image style="position: absolute;z-index: 9;" src="http://pic.clmsj.com/clmsj/2020/3-17/1gmpjyn5k93lgnxv.png" mode="widthFix" />
							<image :src="val.img_url" mode="widthFix" />
							<!-- <video
								objectFit="cover"
								muted="true"
								poster="http://pic.clmsj.com/clmsj/2020/3-17/8beoroenk93kj3eb.jpg"
								:id="index"
							/> -->
						</view>
						<view v-else  @tap.stop="previewImg(item.goodsphoto, key)">
							<image :src="val.img_url" mode="widthFix" />
						</view>
						<!--@play="videoPlay" :src="val.img_url"  :data-src="val.img_url" 
								play-btn-position="center" -->
						
					</view>
				</view>
				<view class="goods-desc">
					<view v-if="item.shop_total_price > 0" class="wrap">
						<view class="left" style="color: #FF0000;">
							<text v-if="item.shop_total_price">价格：￥{{item.shop_total_price}}</text>
							<text v-if="item.price">赚：￥{{item.price}}</text>
						</view>
						<!-- <view class="right">
							<text>销量：12323</text>
							<text>收藏：3233</text>
						</view> -->
					</view>
					<view class="wrap">
						<view class="left">
							<text class="id" v-if="item.goods_id">
								<text class="yticon icon-bianhao"></text>
								编号：{{item.goods_id}}
							</text>
						</view>
						<view class="right">
							<view class="btn-share">
								<button class="share-shop" open-type="share" @tap.stop="shareShop">
									<text class="yticon icon-share"></text>转发
								</button>
							</view>
						</view>
					</view>
				</view>
            </view>
        </view>
        <!-- <button class="share-shop" open-type="share" @tap.stop="shareShop">分享</button> -->
        <uni-load-more :status="loadingType"></uni-load-more>
		
		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view>
						<!-- <view class="cate-item b-b two"></view> -->
						<view 
							v-for="tItem in cateList" :key="tItem.id" 
							class="cate-item b-b" 
							:class="{active: tItem.id==cateId}"
							@click="changeCate(tItem)">
							{{tItem.name}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view style="height: 100px;"></view>
		<!-- 底部操作菜单 -->
		<page-bottom type="tabBar" :shopId="shop.id"></page-bottom>
		<uni-login type="login" :showLogin="showLogin" :onlyLogin='0'></uni-login>
		<!-- <view class="page-bottom">
			<navigator :url="'/pages/shop/index?sid='+ shop.id" class="p-b-btn">
				<text class="yticon icon-shouye"></text>
				<text>店铺首页</text>
			</navigator>
			<navigator url="/pages/user/user" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gerenzhongxin"></text>
				<text>个人中心</text>
			</navigator>
		</view> -->
		<view class="contact-box">
			<button class="btn-contact" open-type="contact" :send-message-title="shop.name" :send-message-img="shop.cover || '/static/shop-bg-none.png'" :send-message-path="'/pages/shop/index?sid='+ shop.id" :session-from="'sid='+ shop.id" show-message-card="true">客服</button>
		</view>
		
    </view>
</template>

<script>
const app = getApp();
import pageBottom from '@/components/page-bottom';
import uniLogin from '@/components/uni-login';
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
    components: {
        uniLogin,pageBottom,uniLoadMore
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
			hotGoodsList:[],
			shopViewList:[],
            page: 1,
            shop: {},
			sid:0,
			searchVal:'',
			showLogin:0,
			userInfo:{
				id:0
			}
        };
    },

    onShareAppMessage(res) {
      return {
        title: this.shop.name || '快来看看这里的商品吧',
        path: '/pages/show/index?sid=' + this.shop.id 
      }
    },

    async onLoad(options) {
		this.cateId = options.tid;
		const res = await app.req('clmsj/user/getUser')
		this.userInfo = res.data.user
		// this.userInfo = uni.getStorageSync('userInfo');
		this.sid = options.sid || uni.getStorageSync('sid');
		this.sid = this.sid || 0;
		uni.setStorageSync('sid',this.sid);
		if (this.sid > 0) {
		    await app.request(this.$Url + "/clmsj/Shopview/bindShop", {
		        shopId: this.sid
		    });
		}
		console.log('sid==' + this.sid);
		this.loadCateList(options.fid, options.sid);
    },
    onShow() {
		const session_key = uni.getStorageSync('session_key')
		if(!session_key){
			this.showLogin = 1
		}else{
			this.showLogin = 0
		}
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
	onShareAppMessage(res) {
	    // console.log("/pages/shop/index?sid=" + this.shop.id );
	    return {
	        title: this.shop.name,
	        path: "/pages/shop/index?sid=" + this.shop.id
	    };
	},
    methods: {
		//加载分类
		async loadCateList(fid, sid) {
		    const res = await app.request(
		        this.$Url + "/clmsj/goods/goodsTypeList"
		    );
		    this.cateList = res.data.data || [];
		    this.cateList.unshift({id: 0, name:'全部'})
		    this.cateId = this.cateList[0].id;
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
		        url: this.$Url + "/clmsj/goods/myshop",
		        header: {
		            auth: uni.getStorageSync("session_key")
		        },
		        data: {
		            page: this.page,
					shop_id: this.sid
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
		                let storeList = res.data.data.shopgoodslist;
		                this.shop = res.data.data.shop;
						uni.setNavigationBarTitle({
							title: this.shop.name
						})
						this.hotGoodsList = res.data.data.shop_main;
						this.shopViewList = res.data.data.shop_view;
		                this.page++;
						uni.setStorageSync('sid',this.shop.id);
						
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
		
		searchGoods(){
			let _this = this;
			this.page = 1;
			this.storeList = [];
			
			uni.request({
				url: this.$Url + "/clmsj/goods/myshop",
				header: {
				    auth: uni.getStorageSync("session_key")
				},
				data: {
				    page: this.page,
					shop_id: this.sid,
					keyword: this.searchVal,
					catid : this.cateId
				},
				method:'POST',
				success: (res) => {
					uni.hideLoading();
					if (res.data.code == 0) {
						this.storeList = res.data.data.shopgoodslist;
					}
				},
			})
		},
        shareShop() {},
        detailBtn(goods_id,sid) {
            uni.navigateTo({
                url: "/pages/product/product?goods_id=" + goods_id + "&sid=" + this.shop.id
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
			let videoContextPrev = uni.createVideoContext(e.currentTarget.id)
			videoContextPrev.pause();
			return false;
            // this.play_media = 1;
            // const videoContext = uni.createVideoContext(e.currentTarget.id);
            // videoContext.requestFullScreen();
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
            // this.loadData("refresh", 1);
			this.searchGoods();
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
page,
.content {
    background: $page-color-base;
}
.mp-search-box{
	width: 100%;
	padding: 10px 10px;
	display: flex;
	justify-content: space-between;
	.search{
		width: calc(100% - 100px);
		.ser-input{
			flex:1;
			height: 66upx;
			line-height: 66upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 5px;
			background: #f2f2f2;
		}
		.placeholder{
			color: #888888;
			background-image: url(/static/icon-search.png);
			background-repeat: no-repeat;
			text-indent: 30px;
			background-size: 30rpx;
			background-position: 30% center;
			background-origin: content;
		}
	}
	.cate{
		font-size: 15px;
		height: 66upx;
		line-height: 66upx;
		width: 90px;
		text-align: right;
	}
}



.store-info{
	position: relative;
	.bg{
		width: 100%;
		image{
			width: 100%;min-height: 100px;
			max-height: 250px;
		}
	}
	
	.info{
		position: absolute;
		z-index: 1;
		width: 100%;
		margin-top: -60px;
		.mask{
			opacity: 0.66;background: #000000; height: 60px;
		}
		.shop{
			position: absolute;
			z-index: 10;
			width: 100%;
			margin-top: -50px;
			display: flex;
			justify-content: space-between;
			.logo{
				width: 80px;
				text-align: center;
				image{
					width: 40px;
					height: 40px;
					border-radius: 5px;
				}
			}
			.desc-box{
				width: calc(100% - 160px);
				color: #ffffff;
				.title{
					font-size: 16px;
				}
				.address{
					font-size: 14px;
				}
				.desc{
					font-size: 14px;
					line-height: 25px;
					height: 25px;
					overflow: hidden;
				}
			}
			.share{
				width: 80px;
				.btn-share{
					margin-top: 6px;
					background: #f5f5f5;
					color: #FF4375;
					border-radius: 6px;
					width: 70px;
					height: 30px;
					line-height: 30px;
					font-size: 14px;
					text-align: center;
					button{
						border: 0px;
						background: none;
						padding: 0px;
						color: #FF4375;
						font-size: 14px;
						height: 30px;
						line-height: 30px;
					}
				}
			}
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
        width: 60%;
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

.tit-name{
	background: #FFFFFF;
	font-size: 15px;
	color: #333333;
	line-height: 50px;
	padding-left: 15px;
	border-bottom: 1px solid #EEEEEE;
	.yticon{
		vertical-align: middle;
		background: #FA436A;
		padding: 3px;
		border-radius: 50%;
		color: #ffffff;
		font-size: 12px;
		margin: 0px 3px;
		margin-top: -2px;
	}
}

.hot-goods{
	background: #FFFFFF;
	.list{
		padding: 10px 0px;
		margin: 0px 20px;
		height: 240px;
		
		.floor-list{
			white-space: nowrap;
			height: 240px;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
			align-items: flex-start;
			align-content: flex-start;
			height: 120px;
		}
		.floor-item{
			width: 110px;
			margin-right: 6px;
			image{
				width: 110px;
				height: 110px;
				border-radius: 3px;
			}
		}
	}
}
.history-view{
	.list{
		max-height: 90px;
		padding: 5px 10px;
		background: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		overflow: hidden;
		.item{
			width: calc(10% - 6px);
			margin:5px 3px;
			text-align: center;
			image{
				max-width: 100%;
				width: 30px;
				height: 30px;
				border: 1px solid #eeeeee;
				border-radius: 50%;
			}
		}
	}
}

/* 商家列表 */
.store-section {
	
	.store-item {
		width: 100%;
		background: #FFFFFF;
		margin: 0px 0px;
		margin-top: 1px;
		margin-bottom: 10px;
		padding: 10px 15px;
		.store-name {
			font-size: 16px;
			color: #111111;
			line-height: 30px;
			color: #566687;
		}
		.goods-remark {
			color: #333;
			line-height: 26px;
			font-size: 15px;
		}
		.goods-imgs {
			display: flex;
			flex-wrap: wrap;
			.img-wrap {
				width: calc(33.3% - 6px);
				margin: 5px 3px;
				position: relative;
				overflow: hidden;
				padding-bottom: calc(33.3% - 10px);
				image {
					width: 100%; height: 100%;
					position: absolute;
					border: 0px solid #dddddd;
				}
				video {
					width: 100%; height: 100%;
					position: absolute;
					display: block;
				}
			}
			.img-wrap-max{
				width: calc(50% - 6px);
				margin: 5px 3px;
				position: relative;
				overflow: hidden;
				padding-bottom: calc(45% - 10px);
			}
			.img-wrap-max1{
				width: calc(65% - 6px);
				margin: 5px 3px;
				position: relative;
				overflow: hidden;
				padding-bottom: calc(65% - 10px);
			}
		}
		.goods-desc {
			color: #333;
			line-height: 26px;
			font-size: 14px;
			margin-top: 6px;
			.wrap{
				display: flex;
				justify-content: space-between;
				.left{
					text-align: left;
				}
				.right{
					text-align: right;
				}
				.id{
					color: #AFAFAF;
				}
			}
			.btn-share{
				margin-top: 6px;
				background: #f5f5f5;
				border-radius: 6px;
				color: #FF4375;
				width: 60px;
				height: 25px;
				line-height: 25px;
				font-size: 14px;
				text-align: center;
				button{
					border: 0px;
					background: none;
					padding: 0px;
					color: #FF4375;
					font-size: 14px;
					height: 25px; line-height: 25px;
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

.contact-box{
	position: fixed;
	z-index: 999;
	right: 5px;
	bottom: 100px;
	width: 50px;
	button:after,.btn-contact{
		background: #F76260;
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 50%;
		color: #FFFFFF;
		font-size: 15px;
		width: 50px;
		height: 50px;
		line-height: 50px;
		padding: 0px;
		margin: 0px;
		border: none;
	}
	button:after{
		background: none;
		border: none;
		box-shadow:none
	}
}
/* 底部操作菜单 */
.page-bottom{
	position:fixed;
	left: 0px;
	right: 0px;
	bottom:0px;
	z-index: 95;
	display: flex;
	justify-content: space-between;
	// align-items: spac;
	width: 100%;
	height: 100upx;
	background: rgba(255,255,255,1);
	box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
	border-radius: 0px;
	
	.p-b-btn{
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-sm;
		color: $font-color-base;
		width: 50%;
		height: 80upx;
		margin-top: 5px;
		.yticon{
			font-size: 50upx;
			line-height: 50upx;
			color: $font-color-light;
		}
		&.active, &.active .yticon{
			color: $uni-color-primary;
		}
		.icon-fenxiang2{
			font-size: 42upx;
			transform: translateY(-2upx);
		}
		.icon-shoucang{
			font-size: 46upx;
		}
	}
	.action-btn-group{
		display: flex;
		height: 76upx;
		border-radius: 100px;
		overflow: hidden;
		box-shadow: 0 20upx 40upx -16upx #fa436a;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
		margin-left: 20upx;
		position:relative;
		&:after{
			content: '';
			position:absolute;
			top: 50%;
			right: 50%;
			transform: translateY(-50%);
			height: 28upx;
			width: 0;
			border-right: 1px solid rgba(255,255,255,.5);
		}
		.action-btn{
			display:flex;
			align-items: center;
			justify-content: center;
			width: 180upx;
			height: 100%;
			font-size: $font-base ;
			padding: 0;
			border-radius: 0;
			background: transparent;
		}
	}
}

</style>
