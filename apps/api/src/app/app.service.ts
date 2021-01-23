import { Injectable } from '@nestjs/common';
import { Message } from '@blood-pressure-diary/api-interfaces';

import  * as pg from 'pg';

@Injectable()
export class AppService {
  constructor(){
    // const pool = new Pool
  }
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
