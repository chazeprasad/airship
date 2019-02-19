import * as debug from 'debug'


class Paper {
    public log: any
    public name: string
    constructor() {
        this.name = this.constructor.name;
        this.log = debug(`${this.name}::LOG`);
        debug.enable(`${this.name}::LOG`);
        
    }
}

export { Paper }