
import React from 'react';
import {connect } from 'react-redux';



function mixin(...mixins) {
    if (typeof mixins[0] === 'function') {
        return handleClass(mixins[0], []);
    } else {
        return target => {
            return handleClass(target, mixins);
        };
    }
}



const { defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, getPrototypeOf } = Object;

const getOwnKeys = getOwnPropertySymbols ? function (object) {return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));}: getOwnPropertyNames;


function getOwnPropertyDescriptors(obj) {
    const descs = {};
    getOwnKeys(obj).forEach(
        key => (descs[key] = getOwnPropertyDescriptor(obj, key))
    );
    return descs;
}

function buggySymbol(symbol) {
    return Object.prototype.toString.call(symbol) === '[object Symbol]' && typeof(symbol) === 'object';
}

function hasProperty(prop, obj) {
    if (buggySymbol(prop)) {
        do {
            if (obj === Object.prototype) {
                return typeof(obj[prop]) !== 'undefined';
            }
            if (obj.hasOwnProperty(prop)) {
                return true;
            }
        } while (obj = getPrototypeOf(obj));
        return false;
    } else {
        return prop in obj;
    }
}

function handleClass(target, mixins) {
    if (!mixins.length) {
        throw new SyntaxError(`@mixin() class ${target.name} requires at least one mixin as an argument`);
    }
    for (let i = 0, l = mixins.length; i < l; i++) {
        const descs = getOwnPropertyDescriptors(mixins[i]);
        var keys = Object.keys(descs);
        for(var j=0; j<keys.length;j++){
            var key = keys[j];
            if(!(hasProperty(key, target.prototype))){
                defineProperty(target.prototype, key, descs[key]);
            }
        }
    }
}




const JRootMixin = {

    /**
     * 发送消息
     * @param action
     */
    dispatch:function(action, flag){
        if(this.props.dispatch){
            this.props.dispatch(action, flag);
        }
    },

    shallowEqualImmutable:function(objA, objB){
        if (objA === objB || immutable.is(objA, objB)) {
            return true;
        }
        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
            return false;
        }
        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) {
            return false;
        }
        const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
        for (let i = 0; i < keysA.length; i++) {
            //不对同是方法的两个属性进行比较,直接作为没有改变
            if(typeof objA[keysA[i]] =='function' && typeof objB[keysB[i]] == "function")
                continue;
            if (!bHasOwnProperty(keysA[i]) || !immutable.is(objA[keysA[i]], objB[keysA[i]])) {
                return false;
            }
        }
        return true;
    },

    shouldComponentUpdate:function(nextProps, nextState){
        return !this.shallowEqualImmutable(this.props, nextProps) || !this.shallowEqualImmutable(this.state, nextState);
    },
};

@mixin(JRootMixin)
class View extends React.Component{
    render(){
        return <div {...this.props}></div>
    }
}


export  {View,connect,React};

//export mixin;