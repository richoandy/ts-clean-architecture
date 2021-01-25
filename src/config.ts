export default {
    APP: {
        PORT: process.env.APP_PORT || '',
    },

    DATABASE: {
        HOST: process.env.DATABSE_HOST || '',
        PORT: process.env.DATABASE_PORT || '',
        USERNAME: process.env.DATABASE_USERNAME || '',
        PASSWORD: process.env.DATABASE_PASSWORD || '',
        NAME: process.env.DATABASE_NAME || '',
    },

    CACHE: {
        HOST: process.env.CACHE_HOST || '',
        PORT: process.env.CACHE_PORT || '',
    },
};
