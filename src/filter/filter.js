import moment from 'moment'
import Vue from 'vue'

//注册一个全局过滤器
Vue.filter('dateString', function (value, format) {
    return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})