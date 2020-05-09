<template>
    <view class="content">
      
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
        };
    },

    onLoad(options) {
    },
    onShow() {
		let sid = uni.getStorageSync('sid');
		uni.redirectTo({
			url : '/pages/shop/index?sid=' + sid
		});
		return;
    },
    methods: {
    
    }
};
</script>


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
	
	.store-item {
		width: 100%;
		background: #FFFFFF;
		margin: 0px 0px;
		margin-bottom: 10px;
		padding: 10px 15px;
		.store{
			line-height: 25px;
			display: flex;
			justify-content: flex-start;
			.logo{
				width: 35px;
				text-align: center;
				image{
					width: 25px;height: 25px;	
				}
			}
			.store-name {
				font-size: 16px;
				color: #111111;
				color: #566687;
			}
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
.cate-box {
    width: 100%;
    overflow: scroll;
    background-color: white;
    .cate-bar {
        display: flex;
        .cate-item {
            flex-shrink: 0;
            padding: 30upx 30upx;
            color: #999;
        }
        .active {
            color: #333;
        }
    }
}
</style>