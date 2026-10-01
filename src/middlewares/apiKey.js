import { timingSafeEqual } from 'node:crypto';
import { xApiKey } from '../config/index.js';

function keysMatch(provided, expected) {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

function apiKeyAuth(req, res, next) {
  if (!xApiKey) {
    return res.status(500).json({ message: 'Server API key is not configured' });
  }

  const providedKey = req.get('x-api-key');

  if (!providedKey || !keysMatch(providedKey, xApiKey)) {
    return res.status(401).json({ message: 'Unauthorized: invalid or missing x-api-key header' });
  }

  next();
}

export { apiKeyAuth };
