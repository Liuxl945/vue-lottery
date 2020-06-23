<template>
    <div id="app">
        <v-index v-if="index === 1" @change="change"></v-index>
		<v-lottery v-if="index === 2"></v-lottery>
		<v-poster v-if="index === 3"></v-poster>
    </div>
</template>


<script>

import Index from "./views/home"
import Lottery from "./views/lottery"
import Poster from "./views/poster"
import { mapState } from 'vuex'

export default {
    components: {
        "v-index": Index,
        "v-lottery": Lottery,
        "v-poster": Poster,
    },
    data() {
        return {
			
        }
    },
    methods: {
        change(index) {
            this.index = index
        }
	},
	computed: {
        ...mapState({
            index: state => state.indexState,
        })
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
