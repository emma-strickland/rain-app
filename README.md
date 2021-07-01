# rain-app

TODO(emmastrickland): write description
I'm going to write something here...

## Api

### Usage

1.  Create a `.env` file in `./packages/api` and set your [Open Weather Map](https://openweathermap.org/api) and [Zip Code](https://www.zipcodeapi.com/) API Keys. Please refer to `./packages/api/.env.example`.

2.  Start the server:
    ```
    yarn backend:install
    yarn backend:start
    ```

## App

### Usage
1.  Configure dev and prod `API_BASE_URL` variables in `./packages/app/config.js`.

2.  Start the frontend app:
    ```
    yarn frontend:install
    yarn frontend:start
    ```