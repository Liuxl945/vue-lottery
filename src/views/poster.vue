<template>
    <div class="poster">
        <div class="poster-bg">
            <img class="bg-img" src="../assets/image/poster.jpg" alt="">
            <div class="wx-content">
                <div class="top">
                    <div class="avatar">
                        <img src="../assets/image/btn.png" alt="">
                    </div>
                    <p>微信ID</p>
                </div>
                <div class="center">
                    <div class="left">
                        <p>成功战胜</p>
                        <p>了全国</p>
                    </div>
                    <div class="right">565684位人</div>
                </div>
                <div class="bottom">
                    <p>成为了里水线上欢乐家庭赛龙舟文化传承的“知识龙王”</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
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
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
}
.wx-content{
    position: absolute;
    padding: 20px;
    color: #118666;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 420px;
    .top{
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        .avatar{
            margin-right: 20px;
            height: 92px;
            width: 92px;
            border: 4px solid #fff;
            border-radius: 92px;
            overflow: hidden;
        }
    }
    .center{
        display: flex;
        height: 75px * 1.175;
        border: 2px dashed #118666;
        font-size: 28px;
        align-items: center;
        font-weight: 600;
        text-align: center;
        .left{
            padding: 0 10px;
        }
        .right{
            padding: 0 10px;
            height: 100%;
            line-height:75px * 1.175;
            font-size: 36px;
            border-left: 2px dashed #118666;
            text-align: center;
            flex:1;
        }
    }
    .bottom{
        padding-top: 15px;
        width: 100%;
        font-size: 28px;
        text-align: center;
    }
}
</style>