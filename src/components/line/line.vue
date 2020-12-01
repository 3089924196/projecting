<template>
  <div class="lineWrap">
    <span class="line"></span>
    <slot></slot>
    <span class="line"></span>
  </div>
</template>

<script>
export default {
  name: 'seller-line',
}
</script>

<style lang="stylus" scoped>
    .lineWrap
       color rgba(255,255,255,1)
        display flex
        align-items center
        .line
            background rgba(255,255,255,2)
            flex 1
            height 1px
            &:nth-child(1)
                margin-right 12px
            &:&:nth-child(3)
                margin-left 12px

        
</style>
