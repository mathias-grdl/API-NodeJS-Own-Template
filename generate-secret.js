/**
 * Script to generate a secure JWT_SECRET
 * Run this script using: node generate-secret.js
 */

import crypto from 'crypto';

const secret = crypto.randomBytes(64).toString('hex');

console.log('Copy this value for your JWT_SECRET in your .env file:');
console.log(secret);
console.log('\nExample .env entry:');
console.log(`JWT_SECRET=${secret}`);
