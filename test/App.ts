import * as path from 'path';


import {Airship} from '../src/airship'

const ROOT_DIR = path.join(__dirname, '..')
const STATIC_DIR = ROOT_DIR + '/public'

let airship: Airship = new Airship();
airship.rootDir = ROOT_DIR;
airship.staticDir = STATIC_DIR;
airship.init();

import {TodoController} from './TodoController';

const todo = new TodoController();

airship.app.use('/', todo.router);


export default airship.app;