import { Request, Response } from 'express';

class HelloController {
  public getHello(req: Request, res: Response) {
    res.send('Hello');
  }
}

const helloController = new HelloController();

export default helloController;
