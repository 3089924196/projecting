<template>
 <ul class="list">
   <li v-for="(support, index) in supports" :key="index">
     <seller-icon class="icon" size="2" :type="support.type"></seller-icon>
     <span>{{support.content}}</span>
   </li>
  
 </ul>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'list',
  props:{
    supports:Array
  },
  computed:{
    ...mapState(["iconTypes"]),
  }
}
</script>

<style lang="stylus" scoped>
    .list
        width 80%
        margin 0 auto
        box-sizing border-box
        padding 0 12px
        font-size 12px
        font-weight 200px
        color white
        margin-top 24px
        margin-bottom 28px
        & > li
            display flex
            align-items center
            margin-bottom 12px
            &:last-child
                margin-bottom 0
            .icon
                margin-right 6px

           



</style>
