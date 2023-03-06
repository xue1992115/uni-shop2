<template>
	<view>
		<view class="goods-list">
			<block v-for="goods, index in goodsList" :key="index">
				<view @click="gotoGoodsDetail(goods)">
					<my-goods :goods="goods"></my-goods>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import myGoods from '../../components/my-goods/my-goods.vue';
	export default {
		components: {
			myGoods
		},
		data() {
			return {
				goodsList: [],
				total: 0,
				isloading: false,
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 20
				}
			}
		},
		methods: {
			async getGoodsList(cb) {
				this.isloading = true;
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
				this.isloading = false;
				cb && cb();
				if(res.meta.status !== 200) {
					return uni.$showMessage({ title: '请求数据失败' })
				}
				this.goodsList = res.message.goods;
				this.total = res.message.total;
			},
			gotoGoodsDetail(item) {
				uni.navigateTo({
					url: '/subpkg/good_details/good_details?goods_id=' + item.goods_id
				})
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || '';
			this.queryObj.cid = options.cid || '';
			this.getGoodsList();
		},
		onReachBottom() {
			if(this.queryObj.pagenum + this.queryObj.pagesize > this.total) return uni.$showMessage({ title: '数据加载完毕' });
			if(this.isloading) return;
			this.queryObj.pagenum++;
			this.getGoodsList();
		},
		onPullDownRefresh() {
			this.queryObj.query = '';
			this.queryObj.pagenum = 1;
			this.total = 0;
			this.goodsList = [];
			this.getGoodsList(() => uni.stopPullDownRefresh());
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left {
		margin-right: 10px;
		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
		}
		.goods-info-box {
			display: inline-block;
			.goods-price {
				display: block;
				font-size: 16px;
				color: #ff0000;
			}
		}
	}
}
</style>
