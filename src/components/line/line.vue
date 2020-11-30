<template>
    <div class="lineWrap">
        <span class="line"></span>
        <slot></slot>
        <span class="line"></span>
    </div>
</template>

<script>
    export default {
        name: "seller-line"
    }
</script>

<style scoped lang="stylus">
    /*1. 当子元素的类型是统一的时候
        nth-child & nth-of-type 之间是没有区别的
    2.  当子元素的类型不统一的时候
        应该使用nth-of-type (要结合标签名使用 而不是类名)*/

    .lineWrap
        color rgba(255,255,255,1)
        display flex
        align-items center
        .line
            height 1px
            background  rgba(255,255,255,1)
            flex 1
            &:first-child
                margin-right 12px
            &:last-child
                margin-left 12px

</style>