# Backend Readme

This readme provides essential information about the backend.

### To run the project locally

Ensure you are in the "/server" directory and execute the following commands:
1. `npm i` (to install all required packages)
2. `npm start` (to run the project locally)

### Deployment

Follow these steps to deploy the project:
1. Commit and push your changes to the GitHub repository.
2. Login to the Debain server, and go  to ':~/qf-tool/server', do a `git pull`.
3. While in ':~/qf-tool/server'  run `pm2 restart 1`.
4. Your changes are now live!

*Explanation*
- I have set up a pm2 instance serving the BE, When you execute `pm2 list`, you will see:

### Notes
- All security calculations and details are handled by the backend.
- There are mainly two endpoints
  - `/run-test` POST request
  - `/results:uuid` GET requets which jus
- The GET request takes in the uuid sent in as a query param by the POST request
- All results parsing start from `function parseResults(ssylyzeResults, wapitiResults)` so any changes to parsing can be debugged from there. 
