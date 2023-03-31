<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
    @import '@/uni_modules/sky-nutui/components/sky-nutui/app.scss';
    @import "static/iconfont.css";
    .uni-forms-item__content {
      display: flex;
      align-items: center;
    }
</style>
