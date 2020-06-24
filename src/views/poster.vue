<template>
    <div class="poster">
        <div class="poster-bg" >
            <div id="bgImgBox" style="width:100%;height:100%;">
                <img ref="bgImg" @load="loading" class="bg-img" src="../assets/image/poster.jpg" alt="">

                <div class="wx-content" id="wxContent">
                    <div class="top">
                        <div class="avatar">
                            <img @load="loading1" :src="userInfo ? userInfo.headimgurl :defaultAvatar" alt="">
                        </div>
                        <p v-if="userInfo">{{userInfo.nickname}}</p>
                    </div>
                    <div class="center">
                        <div class="left">
                            <p>成功战胜</p>
                            <p>了全国</p>
                        </div>
                        <div class="right">{{defeat_num || 0}} 个人</div>
                    </div>
                    <div class="bottom">
                        <p>成为了里水线上欢乐家庭赛龙舟文化传承的“知识龙王”</p>
                    </div>
                </div>

                <img class="qr-code" @load="loading2" src="../assets/image/qrcode.png" alt="" srcset="">
            </div>

            <div class="bottom-img">
                <img src="../assets/image/poster.jpg" alt="" srcset="">
            </div>
            
            <div class="share-tips">
                <p>长按保存海报并分享到朋友圈</p>
            </div>
        </div>
        <div class="bottom-btn">
            <div class="share" @click.prevent="share">
                <img src="../assets/image/share-btn.png" alt="" srcset="">
            </div>
            <div class="back" @click.prevent="back">
                <img src="../assets/image/back-btn.png" alt="">
            </div>
        </div>

        <div id="saveImage">
            <img id="saveImg" >
        </div>

        <v-share :show="shareModal" :cancle="cancleModal"></v-share>
    </div>
</template>

<script>

import Share from "../components/share"
import { mapState } from "vuex"
import html2canvas from "html2canvas"


export default {
    components: {
        "v-share": Share
    },
    data() {
        return {
            shareModal: false,
            defaultAvatar: require("../assets/image/btn.png"),
            isloading:false,
            isloading1:false,
            isloading2:false,
            render: true
        }
    },
    methods: {
        imgRender() {
            this.render = false

            let width = window.innerWidth
            let height = window.innerHeight
            let dpi = window.devicePixelRatio
            
            setTimeout(async () => {
                let canvas = await html2canvas(document.querySelector("#bgImgBox"),{
                    // width: width/dpi/2,
                    // height: height/dpi/2
                })
                
                var dataUrl = canvas.toDataURL("jpeg")
                document.querySelector("#saveImg").src=dataUrl
            },1000)
        },
        loading() {
            console.log(1)
            this.isloading = true
        },
        loading1() {
            console.log(2)
            this.isloading1 = true
        },
        loading2() {
            console.log(3)
            this.isloading2 = true
        },

        back() {
            this.$store.commit("SET_INDEX", 1)
            this.$store.commit("SET_SCORE", 0)
            this.$store.commit("SET_IMG1_LOAD",true)
            this.$store.commit("SET_IMG2_LOAD",true)
        },
        share() {
            this.shareModal = true
        },
        cancleModal() {
            this.shareModal = false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            defeat_num: state => state.defeat_num,
        })
    },
    watch: {
        isloading() {
            if(this.isloading1 && this.isloading2 && this.render){
                this.imgRender()
            }
        },
        isloading1() {
            if(this.isloading && this.isloading2 && this.render){
                this.imgRender()
            }
        },
        isloading2() {
            if(this.isloading1 && this.isloading && this.render){
                this.imgRender()
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@function rem($n){
  @return $n/(100)+rem;
}

#saveImage{
    z-index: 12;
    overflow: hidden;
    position: absolute;
    // background: darkblue;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    #saveImg{
        width: 100%;
        height: 100%;
    }
    #saveAvatar{
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-80%);
    }
}

.poster,
.poster-bg{
    height: 100%;
    width: 100%;
    overflow: hidden;
    .poster-bg{
        position: relative;
        overflow: hidden;
    }
    .bg-img{
        width: 100%;
        min-height: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
}
.wx-content{
    font-size: rem(16);
    position: absolute;
    z-index: 10;
    width: 100%;
    padding: rem(10);
    color: #118666;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    transform: translateY(-80%);
    .top{
        padding-bottom: rem(10);
        display: flex;
        align-items: center;
        .avatar{
            margin-right: rem(10);
            height: rem(51);
            width: rem(51);
            border: rem(2) solid #fff;
            border-radius: rem(92/2);
            overflow: hidden;
            img{
                height: rem(94/2);
                width:  rem(94/2);
            }
        }
    }
    .center{
        display: flex;
        height: rem(75 * 1.175/2);
        border: rem(1) dashed #118666;
        font-size: rem(14);
        align-items: center;
        font-weight: 600;
        text-align: center;
        .left{
            padding: 0 rem(5);
            font-size: rem(15);
        }
        .right{
            padding: 0 rem(5);
            height: 100%;
            line-height:rem(75 * 1.175/2);
            font-size: rem(18);
            border-left: rem(1) dashed #118666;
            text-align: center;
            flex:1;
        }
    }
    .bottom{
        padding-top: rem(15/2);
        width: 100%;
        font-size: rem(14);
        text-align: center;
    }
}
.bottom-img{
    height: 50%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    img{
        width: 100%;
        position: absolute;
        transform: translateY(-50%);
    }
}
.qr-code{
    position: absolute;
    bottom: rem(20);
    left: 80%;
    transform: translateX(-50%);
    width: rem(206/2);
}
.share-tips{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, .4);
    color:rgb(250, 79, 52);
    z-index: 120;
    font-size: rem(18);
    bottom: 4%;
    white-space: nowrap;
    padding: rem(5) rem(10) ;
    border-radius: rem(50);
}
.bottom-btn{
    z-index: 110;
    position: absolute;
    bottom: rem(50);
    width: 100%;
    height: rem(44);
    display: flex;
    padding: 0 rem(50);
    .share{
        flex:1;
        img{
            width: 90%;
        }
    }
    .back{
        flex: 1;
        img{
            width: 90%;
        }
    }
}
</style>