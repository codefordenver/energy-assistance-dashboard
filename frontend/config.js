export default {
    API_ENDPOINT: process.env.NODE_ENV === ('production') 
        ? 'https://energy-assistance-dashboard.herokuapp.com'
        : 'http://127.0.0.1:8000/',
}