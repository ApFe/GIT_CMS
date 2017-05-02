<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	  bootstrap() {},
	name: 'app',
	components: {
	}
}

</script>

<style lang="scss">
html{
    font-size:62.5%; /* 10÷16=62.5% */
}
body{
    font-size:12px;
    font-size:1.2rem ; /* 12÷10=1.2 */
}
p{
    font-size:14px;
    font-size:1.4rem;
}
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 1rem;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 1rem;
}

.toolbar {
	background: #f2f2f2;
	padding: 1rem;
	//border:1px solid #dfe6ec;
	margin: 1rem 0rem;
	.el-form-item {
		margin-bottom: 1rem;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>