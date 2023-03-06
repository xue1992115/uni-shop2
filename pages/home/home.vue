<template>
	<view>
		<view class="search" @click="gotoSearchPage">
			<text>搜索</text>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/good_details/good_details?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image> 
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item"  v-for="(item, index ) in navList" :key="index" @click="navHandlerClick(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item"  v-for="(item, index ) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item"  v-for="(item2, index2 ) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url" >
							<image :src="item2.image_src" class="right-img-src"  :style="{ width: item2.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata');
				if(res.meta.status !== 200) {
					return uni.$showMessage({ title: '请求数据失败' })
				}
				this.swiperList = res.message;
			},
			async getNavList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
				if(res.meta.status !== 200) {
					return uni.$showMessage({ title: '请求数据失败' })
				}
				this.navList = res.message;
			},
			async getFloorList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
				if(res.meta.status !== 200) {
					return uni.$showMessage({ title: '请求数据失败' })
				}
				res.message.forEach((floor) => {
					floor.product_list.forEach((prod) => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]; 
					})
				})
				this.floorList = res.message;
			},
			navHandlerClick(item) {
				if(item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			gotoSearchPage() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.search {
	margin: 5px auto;
	width: 90%;
	background-color: rgba(234, 234, 234, 1.0);
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100px;
	color: rgba(164, 164, 164, 1.0);
	font-size: 14px;
}
swiper {
	height: 330rpx;
	.swiper-item, image {
		width: 100%;
		height: 100%;
	}
	
}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0px;
	.nav-img {
		width: 120rpx;
		height: 140rpx;
	}
}
.floor-title {
	width: 100%;
	height: 60rpx;
}
.floor-img-box {
	display: flex;
	padding-left: 10rpx;
}
.right-img-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
</style>
