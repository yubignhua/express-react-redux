/**
 * Created by yubh on 2017/12/27.
 */
import { createAction } from 'redux-actions';

export const actionCreator = (type, data = {}) => createAction(type)(data);

export const ajaxDispatchFuc = ({
    url,
    type,
    handleData = data => data,
}) => (
    ({
        params = {},
        method = 'get',
        bfrDisptch = null,
        sucDispatch = null,
        errDispatch = null,
    } = {}) => (
        (dispatch) => {
            if (bfrDisptch) bfrDisptch(dispatch);
            console.log('url======',url)
            $.ajax(url, {
                data: params,
                method,
                success(res) {
                    dispatch(actionCreator(type, handleData(null, res)));
                    if (sucDispatch) sucDispatch(dispatch);
                },
                error(res) {
                    dispatch(actionCreator(type, handleData(true, res)));
                    if (errDispatch) errDispatch(dispatch);
                },
                dataType: 'json',
            });
        }
    )
);

export const ajaxFuc = ({url, handleData = data => data,} = {}) => ((params = {}, method = 'get') => {
        console.log('hahaha',url);
        $.ajax(url, {
            data: params,
            method,
            success(res) {
                handleData(null, res);
            },
            error(res) {
                handleData(true, res);
            },
            dataType: 'json',
        });
    }
);

export const dispatchFun = type =>
    (data = {}) => dispatch => dispatch(actionCreator(type, data));

export const getQueryStr = (key) => {
    /* eslint-disable */
    const queryString = location.search.match(new RegExp(`[\?\&]${key}=([^\&]*)(\&?)`, 'i'));
    /* eslint-enable */
    const val = (queryString && queryString.length > 1 && queryString[1]) || '';
    return decodeURIComponent(val);
};

// export const getData =()=>{
//     $.ajax({
//         type: "GET",
//         url: "/cyhospital/weihospital/yanda/weiWangZhanIndex/?is_json=1",
//         data: {},
//         dataType: "json",
//         success: function(data){
//             console.log('ajax-cross-domain-data:::',data);
//         },
//         error:function () {
//            
//         }
//     });
// }

export const subData =(URL='',SUCCESS,VALUE={},FAIL,TYPE='GET') => (
    (dispatch) =>{
        $.ajax({
            url:  URL,
            type: TYPE,
            data: VALUE,
            dataType: "json",
            success: function (res) {
                SUCCESS(res)
            },
            error:function (res) {
                FAIL(res)
            }
        });
    }
);
    


export default {
    actionCreator,
    ajaxFuc,
    ajaxDispatchFuc,
    getQueryStr,
    subData
};
