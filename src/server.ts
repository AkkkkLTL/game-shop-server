import express, {json} from 'express';
import gameRouter from './routes/games.route';
import { App } from './app';
import debug from 'debug';
import { UserRoute } from 'routes/users.route';
import { AuthRoute } from 'routes/auth.route';
import { MessageRoute } from '@routes/messages.route';
import { AuthorRoute } from '@routes/library/author.route';

const log_debug = debug('OdinProject:server');
const app = new App([
  new UserRoute(), 
  new AuthRoute(),
  new MessageRoute(),
  new AuthorRoute(),
]);

app.listen();