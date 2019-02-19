import {
    Util
} from './Util'

const ROUTE_PREFIX = Util.ROUTE_PREFIX;

function Api(args: string | any) {
    const { path } = Util.DestructApiDecorator(args);
    const ctrlPath = Util.DestructApiDecorator(args).path
    return function (target) {
        const proto = target.prototype
        proto.$routes = Object.getOwnPropertyNames(proto)
            .filter(prop => prop.indexOf(ROUTE_PREFIX) === 0)
            .map(prop => {
                const { method, path, middlewareList } = proto[prop]
                const url = `${ctrlPath}${path}`
                const actionName = prop.substring(ROUTE_PREFIX.length)
                return {
                    method: method === 'del' ? 'delete' : method,
                    url,
                    middlewareList,
                    actionName
                }
            })
    }
}

export { Api }
