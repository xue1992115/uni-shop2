<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color='#c00000' v-if="showRadio" @click="radioClickHandler"></radio>
			<image :src="goods.goods_small_logo" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<view class="goods-price">
					{{ goods.goods_price }}
				</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChange"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue'
	export default {
		props: {
			goods: {
				type: Object,
				default: {},
			},
			showRadio: {
				type: Boolean,
				default: false,
			},
			showNum: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state,
				})
			},
			numberChange(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val,
				})
			}
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
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		flex: 1;
		.goods-name {
			font-size: 13px;
		}
		.goods-info-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price {
				display: block;
				font-size: 16px;
				color: #ff0000;
			}
		}
	}
}
</style>
