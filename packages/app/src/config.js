const PROD = {
    API_BASE_URL: 'https://rain-app-api.herokuapp.com'
};

const DEV = {
    API_BASE_URL: 'http://localhost:4000'
};

const config = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default config;