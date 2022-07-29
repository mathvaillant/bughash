export const serverUrlOptions = {
    development: 'http://localhost:5000',
    production: 'https://bughash.herokuapp.com',
    test: 'http://localhost:5000',
};

export const SERVER_URL = serverUrlOptions[process.env.NODE_ENV];