/**
 * Created by yubh on 2017/12/11.
 */

// 使用 Mock

var Mock = require('mockjs')
Mock.mock('/cy_wechat_bot/wxadmin/account', {
    'page|1-10': 10,
    'total_num|1-1000': 1000,
    'account_list|20': [{
        'index|+1': 1,
        'id|+1': 10000,
        nick_name: '@cname',
        wx_alias: '@name',
        'invite_num|0-1000': 1000,
        'status_text|1-5': 5,
        'is_blocked|1': true,
    }],
});

/**
 * 设置延时时间
 */
Mock.setup({
    timeout: '3000-4000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})