# React Directory (Serving the Application)

It is advisable to have the `server/` directory sorted out prior to this directory. Follow the instructions in that directory's README file.

In order to get the application running locally on your host machine, the React application requires the `react/` directory to have the node modules properly installed.

```bash
$ npm install
```

Should you encounter issues installing the node modules, delete the `node_modules` directory and the `package-lock.json` file and reinstall the node modules.

```bash
$ rm -rf node_modules
$ rm package-lock.json
$ npm install
```
