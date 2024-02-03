# Frontend Readme

This readme provides essential information about the frontend.

### To run the project locally

Ensure you are in the "/app" directory and execute the following commands:
1. `npm i` (to install all required packages)
2. `npm run dev` (to run the project locally)

### Deployment

Follow these steps to deploy the project:
1. Commit and push your changes to the GitHub repository.
2. Login to the Debain server, and go  to ':~/qf-tool/app', do a `git pull`.
3. While in ':~/qf-tool/app'  run `npm run build`.
4. Your changes are now live!

*Explanation*
- When you run `npm run build`, the React project is built inside a folder called 'dist'.
- I have set up a pm2 instance serving that 'dist' folder. When you execute `pm2 list`, you will see:
   ![image](https://github.com/karimReemo/qf-tool/assets/141929996/60a9b3eb-8b5a-4869-8be2-aba2627151da)

### Notes
- To quickly modify text, edit the `app\src\utils\constants.tsx` file.
- The deployed backend on the Debian server won't be accessible locally as the server doesn't allow calls from outside IPs. If you need to test the connection between the frontend and backend, run the backend locally alongside the frontend (refer to the backend readme for more details).
- All security calculations and details are handled by the backend. If there are changes in those aspects, check the backend for updates.
