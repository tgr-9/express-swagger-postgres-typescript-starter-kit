import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    saltRounds: Number(process.env.SALT_ROUNDS) || 11,
    accessTokenDuration: process.env.ACCESS_TOKEN_DURATION || '24h',
    refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION || '1h',
    accessTokenSecretKey:
        process.env.ACCESS_TOKEN_SECRET_KEY || '<ACCESS_TOKEN_SECRET_KEY>',
    refreshTokenSecretKey:
        process.env.REFRESH_TOKEN_SECRET_KEY || '<REFRESH_TOKEN_SECRET_KEY>'

};