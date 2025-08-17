import crypto from 'node:crypto';

const TOKEN_TTL_SEC = 30 * 60; // 30 minutes

function generateOpaqueToken(bytes = 32) {
  // Node >=16 : base64url natif
  return crypto.randomBytes(bytes).toString('base64url');
}

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// clé Redis
const tokenKey = (hash: string) => `pwdreset:token:${hash}`;
const userKey  = (userId: number | string) => `pwdreset:user:${userId}`;

export {
  TOKEN_TTL_SEC,
  generateOpaqueToken,
  hashToken,
  tokenKey,
  userKey
};
