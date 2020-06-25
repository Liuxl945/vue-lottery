<template>
    <div id="app">
        <v-index v-if="index === 1" @change="change"></v-index>
		<v-lottery v-if="index === 2"></v-lottery>
		<v-poster v-if="index === 3"></v-poster>
        <audio src="./assets/music3.mp3" id="audio" ref="audio"></audio>

        <div class="music-icon" :class="musicState ? 'rotate' : ''" @click="playMusic">
            <img src="@/assets/image/music.png" alt="">
        </div>
    </div>
</template>


<script>
import Index from "./views/Home"
import Lottery from "./views/lottery"
import Poster from "./views/poster"
import { mapState } from 'vuex'
import API from "./api/index"


import wx from "weixin-js-sdk"
import axios from "axios"
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo']

async function wxRegister() {
    let userInfo = await API.getAjax({
        type: "getUserInfo"
    })

    axios({
        url: "http://h5.nxsound.com/ih5/20_06lslz/ajax_share.php",
    }).then(res => {
        let { appId, timestamp, nonceStr, signature } = res.data
        console.log(
            {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId, // 必填，公众号的唯一标识
                timestamp, // 必填，生成签名的时间戳
                nonceStr, // 必填，生成签名的随机串
                signature, // 必填，签名
                jsApiList // 必填，需要使用的JS接口列表
            }
        )
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名
            jsApiList // 必填，需要使用的JS接口列表
        })

        wx.error(function (res) {
            console.log(res)
　　　　})

        let dataForWeixin = {
            title: `${userInfo.data.data ? userInfo.data.data.nickname : ''}邀请您一起参与里水线上欢乐家庭龙舟赛，答题赢丰厚大奖！`,
            desc: "上善里水 龙舟妙会 里水龙舟【家】年华等你来挑战",
            imgUrl: "http://h5.nxsound.com/ih5/20_06lslz/img/1592937c0136cc6.png",
            link:  "http://h5.nxsound.com/ih5/20_06lslz/",
        }

        wx.ready(() => {
            var autoplayVideo=document.getElementById("audio")
            autoplayVideo.play()

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

            wx.onMenuShareTimeline({
                title: dataForWeixin.title,
                link: dataForWeixin.linkurl,
                imgUrl: dataForWeixin.imgUrl,
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
            })
        })

        
    })
}

wxRegister()


export default {
    components: {
        "v-index": Index,
        "v-lottery": Lottery,
        "v-poster": Poster,
    },
    data() {
        return {
			musicState: true
        }
    },
    mounted() {

        document.addEventListener("DOMContentLoaded",() => {
            // this.$refs.audio.play()

            document.addEventListener("WeixinJSBridgeReady", () => {
                this.$refs.audio.play()
            }, false)
        })
    },
    methods: {
        change(index) {
            this.index = index
        },
        playMusic() {
            this.musicState = !this.musicState
            if(!this.musicState){
                this.$refs.audio.pause()
            }else{
                this.$refs.audio.play()
            }
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

@function rem($n){
  @return $n/(100)+rem;
}


@keyframes rotate{
    0%{
        transform: rotate(0);
      }
    50%{
    	transform:rotate(180deg);
    }
    100%{
         transform: rotate(360deg);
    	}
	}
 
.rotate{
    // transition: 0.5s;
    
    animation: rotate 5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
}

#app{
    height: 100%;
    overflow: hidden;
    width: 100%;
    .music-icon{
        width: rem(70/2);
        height: rem(70/2);
        position: absolute;
        right: 0;
        top: 0;
        z-index: 40;
        margin: rem(20/2);
        img{
            width: 100%;
        }
    }
}
@import url("./assets/reset.scss");
@import url("./assets/base.scss");


</style>
