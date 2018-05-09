/**
 * Created by yubh on 2017/11/14.
 */
import {applyMiddleware } from 'redux';

/**
 * 让你可以发起一个函数来替代 action。
 * 这个函数接收 `dispatch` 和 `getState` 作为参数。
 * `dispatch` 会返回被发起函数的返回值。
 */
//var thunk = store => next => action => typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);
import thunk from 'redux-thunk';


/**
 * 记录所有被发起的 action 以及产生的新的 state。
 */
var logger = store => next => action => {
    console.group('|--执行:'+(action.type||action.url)+'--|');
    console.time('|--时间:');
    console.info('|--参数:', action);
    console.timeEnd('|--时间:');
    console.groupEnd('|--执行:'+action.type+'--|');
    return next(action);
};



export default function callMiddleware () {
    return applyMiddleware(thunk,logger)
}

//console.log('-----0------',applyMiddleware(thunk,logger))