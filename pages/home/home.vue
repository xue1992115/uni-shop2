<template>
	<view>
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
				this.swiperList = res.message;
				if(res.meta.status !== 200) {
					return uni.$showMessage({ title: '请求数据失败' })
				}
			},
			async getNavList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
				console.log(res, 'data')
				this.navList = res.message;
				if(res.meta.status !== 200) {
					return uni.$showMessage({ title: '请求数据失败' })
				}
			},
			async getFloorList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
				res.message.forEach((floor) => {
					floor.product_list.forEach((prod) => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]; 
					})
				})
				this.floorList = res.message;
				if(res.meta.status !== 200) {
					return uni.$showMessage({ title: '请求数据失败' })
				}
			},
			navHandlerClick(item) {
				if(item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			flootHandlerClick(item) {
				
			}
		}
	}
</script>

<style lang="scss">
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
