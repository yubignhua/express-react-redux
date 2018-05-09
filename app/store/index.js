/**
 * Created by yubh on 2017/12/11.
 */
import { createStore,applyMiddleware } from 'redux';
import callMiddleware from '../middleware/index';
import {rootReducer,lazyReducer} from '../reducers/index';
export default function configureStore(preloadedState) {
    //console.log('immutable.fromJS(preloadedState)::::',immutable.fromJS(preloadedState));
    //console.log('---1--',callMiddleware())
    let store = createStore(
        rootReducer,
        lazyReducer,//懒加载 reducer
        callMiddleware(),
        //preloadedState,
    );
    return store
}