// Server
export const PORT = 25565;
export const DELAY = 100;

// Game
export const WORLD_SIZE = 20;
export const CHUNK_SIZE = 10;
export const WORLD_SIZE_PER_PLAYER = CHUNK_SIZE;
export const TAIL_LENGTH = 3;
export const LENGTH_PER_FRUIT = 6;
export const RENDER_DISTANCE = 3;
export const RENDER_DISTANCE_PER_LENGTH = 1 / TAIL_LENGTH / LENGTH_PER_FRUIT;

// Client
export const SCALE = 20;
export const MIN_SCALE = 1;
export const GRID_P = CHUNK_SIZE;
export const MIN_VIEWPORT = CHUNK_SIZE * 4;
