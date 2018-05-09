/**
 * Created by yubh on 2017/11/14.
 */
import { combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'lazy-reducer';


import football from '../containers/football/reducer';
//import register from '../containers/football/register';

const rootReducerObj = {
    football,
};

/**
 * 合成总的 reducer
 */
export const rootReducer = combineReducers(rootReducerObj);
export const lazyReducer = lazyReducerEnhancer(rootReducerObj);

