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
import API from "./api/index"


import wx from "weixin-js-sdk"
import axios from "axios"
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo']

axios({
    url: "http://h5.nxsound.com/ih5/20_06lslz/ajax_share.php",
    headers: {
        referer: 'http://h5.nxsound.com/ih5',
        origin: 'http://h5.nxsound.com/'
    }
}).then(res => {
    console.log(res.data)
    let { appId, timestamp, nonceStr, signature } = res.data
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature, // 必填，签名
      jsApiList // 必填，需要使用的JS接口列表
    })

    let dataForWeixin = {
        title: "xxx（昵称）邀请您一起参与2020年里水镇欢乐家庭龙舟赛，答题赢丰厚大奖！",
        desc: "上善里水 龙舟妙会 里水龙舟【家】年华等你来挑战",
        imgUrl: require("./assets/image/1592937717(1).jpg"),
        link:  "http://h5.nxsound.com/",
    }

    wx.ready(() => {
        wx.onMenuShareAppMessage({
            title: dataForWeixin.title,
            desc: dataForWeixin.desc,
            link: dataForWeixin.link,
            imgUrl: dataForWeixin.imgUrl,
            trigger: function trigger(res) { },
            success: function success(res) {
                console.log('已分享');
            },
            cancel: function cancel(res) {
                console.log('已取消');
            },
            fail: function fail(res) {
                alert(JSON.stringify(res));
            }
        })
    })

    wx.onMenuShareTimeline({
        title: dataForWeixin.title,
        link: dataForWeixin.linkurl,
        imgUrl: dataForWeixin.img,
        trigger: function trigger(res) {
          // alert('用户点击分享到朋友圈');
        },
        success: function success(res) {
          //alert('已分享');
        },
        cancel: function cancel(res) {
          //alert('已取消');
        },
        fail: function fail(res) {
          alert(JSON.stringify(res));
        }
      });
})


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
