/**
 * Created by yubh on 2017/12/27.
 */
/**
 * 定时器Mixin（提供setTimeout方法和setInterval方法）
 * @type {{componentWillMount: Function}}
 */
var MixinSetInterval = {
    componentWillMount() {
        this.intervals = new Map();
        this.timeouts = new Map();
    },

    setInterval() {
        var key = setInterval.apply(null, arguments);
        this.intervals = this.intervals.set(key, key);
        return key;
    },


    clearInterval(key){
        clearInterval(key);
        this.intervals = this.intervals.delete(key);
    },

    setTimeout(){
        var key = setTimeout.apply(null, arguments);
        this.timeouts = this.timeouts.set(key, key);
        return key;
    },

    clearTimeout(key) {
        clearTimeout(key);
        this.timeouts = this.timeouts.delete(key);
    },

    componentWillUnmount() {
        this.intervals.map(this.clearInterval.bind(this));
        this.timeouts.map(this.clearTimeout.bind(this));
    }
};

var MixinTime = {
    format:function(time, fmt){
        var o = {
            "h+": Math.floor(time/1000/60/60), //小时
            "m+": Math.floor(time/1000/60%60), //分
            "s+": Math.floor(time/1000%60), //秒
        };
        //if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    format_dhm: function (time, fmt) {
        var o = {
            "d+": Math.floor(time/1000/60/60/24), //天
            "h+": Math.floor(time/1000/60/60%24), //小时
            "m+": Math.floor(time/1000/60%60), //分
            "s+": Math.floor(time/1000%60), //秒
        };
        //if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    Format:function(time, fmt){
        var date = new Date(time);
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    },
    formats: {
        date: 'yyyy-MM-dd',
        dateTime: 'yyyy-MM-dd hh:mm:ss',
        datePoint: 'yyyy.MM.dd',
        datePointTime: 'yyyy.MM.dd hh.mm.ss'
    }
};

export {MixinSetInterval,MixinTime}