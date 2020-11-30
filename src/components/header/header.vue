<template>
    <div class="seller_header">
        <div class="top">
            <div class="top_left">
                <img class="avatar" :src="seller.avatar">
            </div>
            <div class="top_right">
                <div class="title">
                    <i class="brand"></i>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="delivery">
                    <span class="info">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
                </div>
                <div class="supports" v-if="seller.supports&&seller.supports[0]">
                    <seller-icon class="icon" :size="1"
                                 :type="iconType"></seller-icon>
                    <span class="text" >
                        {{seller.supports[0].content}}
                    </span>
                </div>
            </div>
            <div class="btns" @click="showMask=true">
                <span class="count" v-if="seller.supports">
                    {{seller.supports.length}}个
                </span>
                <i class="seller-keyboard_arrow_right arrow_right"></i>
            </div>
        </div>
        <div class="bottom" @click="showMask=true">
            <i class="icon"></i>
            <span class="text">
                {{seller.bulletin}}
            </span>
            <i class="seller-keyboard_arrow_right arrow_right"></i>
        </div>
        <div class="bg">
            <img :src="seller.bgImg">
        </div>
        <transition name="mask">
            <div class="mask" v-show="showMask">
                <div class="contentWrap">
                    <div class="content">
                        <!--真正的遮罩内容-->
                        <div class="title">
                            <span>{{seller.name}}</span>
                        </div>
                        <!--评星组件-->
                        <div class="starsWrap">
                            <seller-stars size="48" :score="seller.score"></seller-stars>
                        </div>
                        <seller-line class="line">
                            <span>优惠信息</span>
                        </seller-line>
                        <seller-list :supports="seller.supports"></seller-list>
                        <seller-line class="line">
                            <span>商家公告</span>
                        </seller-line>
                        <p class="bulletin">
                            {{seller.bulletin}}
                        </p>
                    </div>
                </div>
                <div class="footer">
                    <i class="seller-close close" @click="showMask=false"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import icon from 'components/icon/icon'
    import {mapState} from "vuex";
    import list from "components/list/list.vue"
    import stars from "components/stars/stars.vue"
    export default {
        name: "seller-header",
        data(){
          return {
              showMask:false
          }
        },
        computed:{
            ...mapState(["seller"]),
           /* 什么时候使用计算属性:
                1. 当需要在模板内进行大量运算的时候 最好使用计算属性
                2. 当可以明显分析属于有依赖数据的存在时 最好使用计算属性*/
            iconType(){
                return this.seller.supports[0].type
            }
        },
        components:{
            "seller-list":list,
            "seller-stars":stars,
            "seller-icon":icon
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    @import "../../common/stylus/extend.styl"
    .seller_header
        background rgba(7,17,27,.5)
        position relative
        overflow hidden
        & > .top
            padding 24px 12px 18px 24px
            display flex
            position relative
            .top_left
                width 64px
                height 64px
                margin-right 16px
                .avatar
                    width 100%
                    height 100%
            .top_right
                color rgba(255,255,255,1)
                .title
                    display flex
                    align-items center
                    font-size 16px
                    font-weight bold
                    line-height 18px
                    margin-top 2px
                    margin-bottom 8px
                    .brand
                        bg-image(brand)
                         background-repeat no-repeat
                        background-size 100%
                        display inline-block
                        width 30px
                        height 18px
                    .name
                        margin-left 6px
                .delivery
                    font-size 12px
                    font-weight 200
                    line-height 12px
                    .info
                        zoom 1
                .supports
                    display flex
                    align-items center
                    font-size 10px
                    font-weight 200
                    line-height 12px
                    margin-top 10px
                    margin-bottom 2px
                    .text
                        margin-left 4px
                    .icon
                        zoom 1
            .btns
                position absolute
                right 12px
                bottom 42px
                width 45px
                height 24px
                background rgba(0,0,0,0.2)
                font-size 10px
                font-weight 200px
                line-height 12px
                color rgba(255,255,255,1)
                display flex
                justify-content space-around
                align-items center
                border-radius 10px
                .count
                    zoom 1
                    position relative
                    left 4px
                .arrow_right
                    zoom 1
        & > .bottom
            box-sizing border-box
            width 100%
            height 28px
            padding 0px 26px 0 12px
            background rgba(7,17,27,.2)
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            color rgba(255,255,255,1)
            line-height 28px
            font-size 10px
            font-weight 200
            position relative
            .icon
                bg-image(bulletin)
                background-size 100%
                background-repeat no-repeat
                display inline-block
                width 22px
                height 12px
                margin-right 4px
                position relative
                top 1px
            .text
                zoom 1
            .arrow_right
                position absolute
                right 12px
                top 8px
        & > .bg
            position absolute
            left 0
            right  0
            top 0
            bottom  0
            background pink
            z-index -1
            filter blur(3px)
            img
                width 100%
                height 100%
        & > .mask
            position fixed
            left 0
            right  0
            top 0
            bottom  0
            margin auto
            z-index 9
            backdrop-filter blur(10px)
            background rgba(7,17,27,.8)
            overflow auto
            .contentWrap
                @extend .clearfix
                min-height 100%
                .content
                    @extend .clearfix
                    padding-bottom 96px
                    padding-top 64px
                    .title
                        text-align center
                        font-size 16px
                        line-height 16px
                        color rgba(255,255,255,1)
                        font-weight 700
                    .starsWrap
                        width 80%
                        margin 0 auto
                        margin-top 16px
                        margin-bottom 28px
                        text-align center
                    .line
                        width 80%
                        margin 0 auto
                    .bulletin
                        width 80%
                        margin 0 auto
                        margin-top 24px
                        box-sizing border-box
                        padding 0 12px
                        color white
                        font-size 12px
                        line-height 24px
            .footer
                margin-top -96px
                width 100%
                height 96px
                line-height 96px
                text-align center
                .close
                    color rgba(255,255,255,.5)
                    font-size 32px
</style>