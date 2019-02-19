export class Util {

    static ROUTE_PREFIX = '$$route_';

    static DestructRouteDecorator(args){
        if (args.length === 0) {
            throw new Error('Missing Route path')
        }
        if ((typeof args !== 'string') && typeof args[0] !== 'string' ) {
            throw new Error('Route path must be string')
        }
        const list = (args.length > 1) ? args[1] : [];
        const path = (typeof args !== 'string') ? args[0] : args;
        
        return { path: path, middlewareList: list }
    }

    static DestructBeforeActionDecorator(args){
        if (args.length === 0) {
            throw new Error('Missing Before Action List')
        }
        const list = args;
        
        if (list.some(m => typeof m !== 'function')) {
            throw new Error('Before action must be function')
        }
    
        return {actionList: list}
    }
    
    static DestructApiDecorator(args){
        if (args.length === 0) {
            throw new Error('Missing Route path')
        }
        if ((typeof args !== 'string') && (typeof args[0] !== 'string')) {
            throw new Error('Route path must be string')
        }
        
        const path = (typeof args !== 'string') ? args[0] : args;
        return { path: path }
    }
}
