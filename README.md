# Getting Started

## Dependencies
Node.js and NPM:
https://nodejs.org/en/   
Firebase CLI (fetch via npm):
https://firebase.google.com/docs/cli#install-cli-windows
    
## Build the front-end
From root dir    
`cd funcitons`    
`npm install`

This will generate the node_modules and install dependencies (e.g., eslint)
Ensure you have a `.gitignore` file with node_modules included inside

## Run locally
1. `firebase emulators:start`   
2. Open a browser and navigate to http://localhost:5000/     

## Deploy the front-end

To deploy the full client-side app:    
`firebase deploy`   
To deploy only functions:    
`firebase deploy --only functions`    
To deploy everything except functions:    
`firebase deploy --only hosting`   

## Upgrading Tools

To upgrade Firebase CLI: 
`npm upgrade firebase-tools -g`    

Upgrade packages in package.json 

## Helpful Commands

List Firebase projects: 
`firebase projects:list`

### Reference Documentation

For further reference, please consider the following sections:

* [Firebase Documentation](https://firebase.google.com/docs)
* [Firebase Hosting](https://firebase.google.com/docs/hosting)
* [Firebase Hosting with Cloud Run (Dynamic Content)](https://firebase.google.com/docs/hosting)
* [Firebase CLI Reference](https://firebase.google.com/docs/cli/)
* [Firebase Emulator](https://firebase.google.com/docs/functions/local-emulator)
* [Firebase Deployment and Runtime Opts](https://firebase.google.com/docs/functions/manage-functions?authuser=0#set_nodejs_version)