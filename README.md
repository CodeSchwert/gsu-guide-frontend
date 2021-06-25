# GetSetUp Guide Frontend

Interface to allow guides to book their availability.

## Getting Started

1. Install deps and test the code works:

    ```zsh
    yarn install
    yarn test
    ```

2. Start an API server:

    There are a couple of options here, either start a local mock API server that serves mock data, or check out this [GSU Guide Backend API](https://github.com/CodeSchwert/gsu-guide-backend) specifically designed for this React app.

    If you're using the [GSU Guide Backend API](https://github.com/CodeSchwert/gsu-guide-backend), skip this step.

    Otherwise, instructions are for the local mock API server:
    ```zsh
    yarn serve:api
    ```

3. Start the React development server (open in another terminal):

    ```zsh
    yarn start
    ```

4. Open the React app your browser of choice: http://localhost:3000
