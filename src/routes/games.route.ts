import express from 'express';
import tryCatch from '../utils';
import { game_create_post, game_delete, game_get, game_list_get } from '../controllers/games.controller';

const router = express.Router();

router.post('/game/create', tryCatch(game_create_post));
router.get('/games', tryCatch(game_list_get));
router.get('/games/:id', tryCatch(game_get));
router.delete('/games/:id', tryCatch(game_delete));

export default router;