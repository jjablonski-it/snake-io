// Server
export const PORT = 25565 || process.env.PORT;
export const DELAY = 100;
export const NAME_LENGTH = 20;

// Game
export const WORLD_SIZE = 20;
export const CHUNK_SIZE = 10;
export const WORLD_SIZE_PER_PLAYER = CHUNK_SIZE;
export const TAIL_LENGTH = 3;
export const LENGTH_PER_FRUIT = 6;
export const RENDER_DISTANCE = 5;
export const RENDER_DISTANCE_PER_LENGTH = 0; //1 / TAIL_LENGTH / LENGTH_PER_FRUIT;

// Client
export const SCALE = 15;
export const MIN_SCALE = 7;
export const ZOOMOUT_PER_FRUIT = 1 / 5;
export const GRID_P = CHUNK_SIZE;
export const MIN_VIEWPORT = CHUNK_SIZE * 4;
