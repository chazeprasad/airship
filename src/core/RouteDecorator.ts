function hi(){
    return 'Hi..!!'
}

export {hi};

import { Util}  from './Util'

const ROUTE_PREFIX = Util.ROUTE_PREFIX;

function route(method, ...args) {
    if (typeof method !== 'string') {
        throw new Error('The first argument must be an HTTP method')
    }
    const {path, middlewareList} = Util.DestructRouteDecorator(args)
    return function (target, name, descriptor) {
        target[`${ROUTE_PREFIX}${name}`] = {
            method,
            path,
            middlewareList
        }
    }
}

let Head = route.bind(null, 'head');
let Options = route.bind(null, 'options');
let Get = route.bind(null, 'get');
let Post = route.bind(null, 'post');
let Put = route.bind(null, 'put');
let Patch = route.bind(null, 'patch');
let Delete = route.bind(null, 'delete');
let Del = route.bind(null, 'del');
let All = route.bind(null, 'all');

export { Head, Options, Get, Post, Put, Patch, Delete, Del, All}