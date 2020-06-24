<template>
    <div class="modal" v-if="show">
        <div class="content" v-show="!successShow && !errorShow">
            <img class="bg" src="../assets/image/qestion-bg.png" alt="" srcset="">
            <div class="title">
                <img :src="titleImage" alt="">
            </div>

            <div class="qeustion-answer">
                <div class="content-wapper">
                    <p>{{selectData.title}}</p>
                </div>

                <ul class="answer">
                    <li class="answer-item" v-for="item in selectData.answer" :key="item.tips" @click="selectAnswer(item.yes)">
                        <div class="order">{{item.tips}}</div>
                        <div class="item">{{item.name}}</div>
                        <div class="right-or-wrong" v-if="selectData.isAnser">
                            <img :src="item.yes ? right : wrong" >
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>

        <div class="success-error" v-if="successShow || errorShow ">
            <div v-if="successShow">
                <img src="../assets/image/success.png" alt="成功">
                <p class="score">{{score}}分</p>
            </div>
            <div v-if="errorShow">
                <img src="../assets/image/error.png" alt="失败">
                <p class="score" style="top: 42%;">{{score}}分</p>
            </div>
            
            <!-- <div class="close" @click="closeModal"></div>wx-content -->
            <div class="again" @click="again"></div>
            <div class="poster" @click="poster"></div>
        </div>

        <audio src="../assets/error.mp3" ref="error"></audio>
        <audio src="../assets/right.mp3" ref="right"></audio>
    </div>
</template>

<script>

const data = require("./question.json")
import API from "../api/index"
import { mapState } from 'vuex'


export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        cancle: {
            type: Function,
            default: () => {
                
            }
        },
        dataindex: {
            type: Number,
            default: 1
        },
        playagain: {
            type: Function,
            default: () => {
                
            }
        }
    },
    data() {
        return {
            right: require("../assets/image/right.png"),
            wrong: require("../assets/image/wrong.png"),
            index: 0,
            successShow: false,
            errorShow: false,
            questionData: data
        }
    },
    computed: {
        titleImage() {
            
            return require(`../assets/image/${this.dataindex}.png`) 
        },
        selectData() {
            return this.questionData[this.dataindex][this.index]
        },
        ...mapState({
            score: state => state.score,
        })
    },
    methods: {
        selectAnswer(yes) {
            if(yes){
                this.$store.commit("SET_SCORE",this.score + 10)
                this.$refs.right.play()
            }else{
                this.$refs.error.play()
            }

            let index = this.index
            if(this.questionData[this.dataindex][index].isAnser){
                return
            }
            
            this.questionData[this.dataindex][index].isAnser = true
            
            if(this.dataindex === Object.keys(this.questionData).length){
                
                API.getAjax({
                    type: "save_score",
                    score: this.score
                }).then(res => {
                    
                    this.$store.commit("SET_DEFEAT_NUM",res.data.defeat_num)
                    this.$store.commit("SET_CODE",res.data.code)

                    // 场景结束 计算分数
                    if(this.score >= 60){
                        // 成功
                        this.successShow = true
                    }else{
                        // 失败
                        this.errorShow = true
                    }
                },() => {
                    // 场景结束 计算分数
                    if(this.score >= 60){
                        // 成功
                        this.successShow = true
                    }else{
                        // 失败
                        this.errorShow = true
                    }
                })

                return
            }
            setTimeout(() => {
                this.cancle()
            },1000)
            
        },
        closeModal() {
            this.cancle()
            this.index = 0
            this.errorShow = false
            this.successShow = false

            for(let i = 1;i<= Object.keys(this.questionData).length;i++) {
                let item = this.questionData[i]
                for(let j = 0;j< item.length;j++){
                    item[j].isAnser = false
                }
            }
        },
        again() {
            if(this.successShow){
                // 抽奖
                this.$store.commit("SET_INDEX", 2)
            }else{
                // 继续答题
                this.index = 0
                this.errorShow = false
                // this.priceIndex = 1
                this.$store.commit("SET_SCORE",0)
                this.playagain()
            }
            this.closeModal()
        },
        poster() {
            // 生成海报
            this.$store.commit("SET_INDEX", 3)
            this.closeModal()
        }
    },
    watch: {
        dataindex(val) {
            let max = this.questionData[val].length - 1
            this.index = Math.floor(Math.random() * max) + 1
        }
    }
}
</script>

<style lang="scss" scoped>
@import url("../assets/modal.scss");

@function rem($n){
  @return $n/(100)+rem;
}

.content{
    width: 95%;
    position: relative;
    >img{
        width: 100%;
    }
    .title{
        position: absolute;
        height: rem(46/2);
        top: 18%;
        left: 50%;
        transform: translateX(-50%);
        >img{
            height: 100%;
        }
    }
    .qeustion-answer{
        position: absolute;
        top: rem(320/2);
        width: 76%;
        left: 50%;
        transform: translateX(-50%);
    }
    .content-wapper{
        background: #fff;
        padding: rem(40/2);
        font-size: rem(30/2);
        font-weight: 600;
        color: #b77500;
        text-align: justify;
        box-shadow: 0  rem(1) rem(9) rgba(194, 110, 40, 0.33);
        border-radius: rem(15/2);
        line-height: rem(22);
        margin-bottom: rem(20);
    }

    .answer-item{
        background: #aad26d;
        &:active{
            background: #a2ce5f;
        }
        height: rem(74 *1.17/2);
        align-items: center;
        margin-bottom: rem(10);
        display: flex;
        border-radius: rem(7.5);
        padding: rem(10);
        color: #fff;
        font-size: rem(18);
        .order{
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f0b245;
            height: rem(50 * 1.17/2);
            width: rem(50 * 1.17/2);
            border-radius: rem(50);
            font-size: rem(24);
        }
        .item{
            flex: 1;
            padding-left: rem(40 * 1.17/2);
        }
        .right-or-wrong{
            height: rem(50 * 1.17/2);
            width: rem(50 * 1.17/2);
            img{
                height: rem(50 * 1.17/2);
                width: rem(50 * 1.17/2);
            }
        }
        
    }
}
.success-error{
    position: relative;
    width: 75%;
    .score{
        position: absolute;
        left: 43%;
        top: 49%;
        transform: translateX(-50%);
        color: #fff;
        font-size: rem(72/2);
        font-weight: 600;
        transform: rotate(-11deg);
    }
    img{
        width: 100%;
    }
    .close{
        position: absolute;
        right: 0;
        top: rem(135/2);
        width: rem(35);
        height: rem(35);
    }
    .again{
        position: absolute;
        left: rem(25);
        bottom: 0;
        width: rem(110);
        height: rem(38);
    }
    .poster{
        position: absolute;
        right: rem(15);
        bottom: 0;
        width: rem(110);
        height: rem(38);
    }
}
</style>