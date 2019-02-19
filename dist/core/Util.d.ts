export declare class Util {
    static ROUTE_PREFIX: string;
    static DestructRouteDecorator(args: any): {
        path: any;
        middlewareList: any;
    };
    static DestructBeforeActionDecorator(args: any): {
        actionList: any;
    };
    static DestructApiDecorator(args: any): {
        path: any;
    };
}
