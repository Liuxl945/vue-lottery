<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link class="link" :to="item.path" v-for="item in router" :key="item.name">{{item.name}}</router-link>
        </div> -->
        <router-view />
    </div>
</template>

<script>
export default {
	data() {
		return {
			router: []
		}
	},
	mounted() {
		this.router = this.$router.options.routes
	}
}
</script>

<style lang="scss">
#app{
	height: 100%;
	width: 100%;
}
@import url("./assets/reset.scss");
@import url("./assets/base.scss");


</style>
