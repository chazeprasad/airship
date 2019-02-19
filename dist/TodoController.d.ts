import { ActionController } from "./ActionController";
declare class TodoController extends ActionController {
    constructor();
    getTodo(req: any, res: any, next: any): void;
}
export { TodoController };
