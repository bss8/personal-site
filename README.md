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

## Deploy the front-end
To deploy the full client-side app:    
`firebase deploy`   
To deploy only functions:    
`firebase deploy --only functions`    
To deploy everything except functions:    
`firebase deploy --only hosting`    

### Reference Documentation
For further reference, please consider the following sections:

* [Firebase Documentation](https://firebase.google.com/docs)
* [Firebase Hosting](https://firebase.google.com/docs/hosting)
* [Firebase Hosting with Cloud Run (Dynamic Content)](https://firebase.google.com/docs/hosting)
* [Firebase CLI Reference](https://firebase.google.com/docs/cli/)