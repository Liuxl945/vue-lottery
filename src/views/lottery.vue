<template>
    <div class="index">
        <div class="index-bg">
            <div class="back" @click.prevent="back">
                <img src="../assets/image/back.png" alt="返回">
            </div>
            <img class="bg-img" src="../assets/image/lottery-bg.jpg" alt="">

            <div class="content">
                <div class="go" @click="go">
                    <img src="../assets/image/go.png" alt="">
                </div>
                <div :style="initStyle" class="bg-content">    
                    <img :style="rotateStyle" src="../assets/image/turntable.png" alt="">
                </div>
            </div>
        </div>

        <lottery-result :show="lotteryShow" :cancle="lotteryShowHide" :priceIndex="lottery[index].id"></lottery-result>
    </div>
</template>

<script>

import lotteryResult from "../components/lottery-result"
import API from "../api/index"
import { mapState } from 'vuex'

const PRIZE_LIST = 8
const CIRCLE_ANGLE = 360


export default {
    components: {
        lotteryResult
    },
    data() {
        return {
            index: 0,
            lotteryShow: false,
            lottery: [
                {
                    id: 0,
                    name: "1等奖"
                },
                {
                    id: 1,
                    name: "2等奖"
                },
                {
                    id: 2,
                    name: "再接再厉"
                },
                {
                    id: 3,
                    name: "3等奖"
                },
                {
                    id: 4,
                    name: "参与奖"
                },
                {
                    id: 5,
                    name: "5等奖"
                },
                {
                    id: 6,
                    name: "4等奖"
                },
                {
                    id: 7,
                    name: "再接再厉"
                }
            ],
            config: {
                duration: 4000, // 总旋转时间
                circle: 8, // 旋转圈数
                mode: "ease-in-out",
            },
            rotateAngle: 0, // 旋转角度
        }
    },
    created() {
        this.isRotating = false // 是否正在旋转
    },
    methods: {
        back() {
            this.$store.commit("SET_INDEX", 1)
            this.$store.commit("SET_SCORE", 0)
            this.$store.commit("SET_IMG1_LOAD",true)
            this.$store.commit("SET_IMG2_LOAD",true)
        },
        async go() {
            if(this.isRotating){
                return
            }
            let res = await API.getAjax({
                type: "rotate",
                code: this.priceCode  //【记录分数接口返回】
            }).catch(err => {
                this.index = 7
                this.rotating() // 开始旋转
                return
            })
            
            if(res.data.status === 1){
                this.index = res.data.prize_id
                this.$store.commit("SET_PRIZE_ID",res.data.prize_id)
                this.rotating() // 开始旋转
            }else{
                this.index = 7
                this.rotating() // 开始旋转
                return
            }
        },
        random (max, min = 0) {
            return parseInt(Math.random() * (max - min + 1) + min)
        },
        rotating() {
            this.isRotating = true
            // 计算角度
            const angle = this.rotateAngle + this.config.circle * CIRCLE_ANGLE + (- this.rotateAngle % CIRCLE_ANGLE)
            this.rotateAngle = angle + this.index * CIRCLE_ANGLE / PRIZE_LIST

            setTimeout(() => {
                this.rotateOver()
            },this.config.duration + 1000)
        },
        rotateOver() {
            this.isRotating = false
            this.lotteryShow = true
            // alert(this.lottery[this.index].name)
        },
        lotteryShowHide() {
            this.lotteryShow = false
        }
    },
    computed: {
        rotateStyle () {
            return `
                -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
                transition: transform ${this.config.duration}ms ${this.config.mode};
                -webkit-transform: rotate(${this.rotateAngle}deg);
                    transform: rotate(${this.rotateAngle}deg);`
        },
        initStyle() {
            let angle = -(CIRCLE_ANGLE / PRIZE_LIST / 2)
            return `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`
        },
        ...mapState({
            priceCode: state => state.code,
        })
    }
}
</script>

<style lang="scss" scoped>

@function rem($n){
  @return $n/(100)+rem;
}

.index,
.index-bg{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    .back{
        position: absolute;
        z-index: 10;
        left: rem(15);
        top: rem(45);
        width: rem(44);
        height: rem(44);
        img{
            width: 100%;
        }
    }
    .go{
        width: rem(150/2);
        img{
            width: 100%;
        }
    }
    .bg-content{
        width: rem(600/2);
        img{
            width: 100%;
        }
    }
    .bg-img{
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .content{
        position: absolute;
        top: 56%;
        left: 50%;
        transform: translate(-50%,-40%);
        .go{
            z-index: 100;
            position: absolute;
            left: 50%;
            top: 47%;
            transform: translate(-50%,-50%);
        }
    }
}
</style>