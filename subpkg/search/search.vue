<template>
	<view class="search-box">
		<uni-search-bar placeholder="请输入搜索内容" bgColor="#EEEEEE" @input="input" :radius="100" cancelButton="none" :focus="true">
			<template v-slot:searchIcon>
				<uni-icons  color="#999999" size="18" type="search" />
			</template>
		</uni-search-bar>
	</view>
</template>

<script>
import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniSearchBar,
			uniIcons
		},
		data() {
			return {
				
			}
		},
		methods: {
			input(e) {
				console.log('djjdj', e)
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
</style>
