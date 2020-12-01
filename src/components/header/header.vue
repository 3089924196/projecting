<template>
    <div class="seller_header">
        <div class="top">
            <div class="top_left">
                <img class="avatar" :src="seller.avatar">
            </div>
            <div class="top_right">
                <div class="title">
                    <i class="brand"></i>
                    <span class="name"></span>
                </div>
                <div class="delivery">
                    <span class="info">20分钟送达</span>
                </div>
                <div class="supports">
                    <seller-icon class="icon" :size="1"
                                 :type="iconType"></seller-icon>
                    <span class="text" >
                       在线支付满28减8，满50减5
                    </span>
                </div>
            </div>
            <div class="btns">
                <span class="count" v-if="seller.supports">
                    
                </span>
                <i class="seller-keyboard_arrow_right arrow_right"></i>
            </div>
        </div>
        <div class="bottom">
            <i class="icon"></i>
            <span class="text">
               
            </span>
            <i class="seller-keyboard_arrow_right arrow_right"></i>
        </div>
        <div class="bg">
            <!-- <img :src="seller.bgImg"> -->
        </div>
        <transition name="mask">
            <div class="mask">
                <div class="contentWrap">
                    <div class="content">
                        <!--真正的遮罩内容-->
                        <div class="title">
                            <span>茄子哥</span>
                        </div>
                        <!--评星组件-->
                       <div class="stars"></div>
                        <seller-line class="line">
                            <span class="text">优惠信息</span>
                        </seller-line>
                        <seller-list></seller-list>
                        <seller-line class="line">
                            <span class="text">商家公告</span>
                        </seller-line>
                        <p class="bulletin">
                            
                        </p>
                    </div>
                </div>
                <div class="footer">
                    <!-- <i class="seller-close close"></i> -->
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import icon from 'components/icon/icon'
import list from 'components/list/list'
    // import {mapState} from "vuex";
    export default {
        name: "seller-header",
         
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
            top 1px
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
                 font-siz 10px
                 color rgba(255, 255,255,1)
                 font-weight 200
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
                width 100%
                height 96px
                line-height -96px
                text-align center
                margin-top 96px
               


</style>