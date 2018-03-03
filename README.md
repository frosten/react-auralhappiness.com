# AuralHappiness 

AuralHappines is a indie-rock, underground music web site.

# Technologies
AuralHappiness uses a number of technologies to work properly:
  - [Node-vc API Server](https://github.com/frosten/node-vc) codename is APLA - fast node.js web api framework
  - [nginx](https://nginx.org/en/) - TCP/UDP proxy server to Node.js
  - [MongoDB](https://docs.mongodb.com/) - nosql database, thanks to [mLab](https://mlab.com/)
  - [Let's Encrypt](https://letsencrypt.org) - It's free SSL solution
  - [React](https://reactjs.org/) - ReactJS a JavaScript library for building user interfaces
  - [Webflow](https://webflow.com) - Build responsive websites


### Installation

AuralHappiness requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd auralhappiness
$ npm install
$ npm run start
```

For production...

```sh
$ npm run build
```
   
### Dependencies

AuralHappiness is currently extended with the following dependencies. 

| Plugin | README | Version
| ------ | ------ | -----
| react,  react-dom, react-scripts | [facebook/react/blob/master/README.md](https://github.com/facebook/react/blob/master/README.md) | ^16.2.0, ^16.2.0, 1.1.1
| react-player | [plugins/dropbox/README.md](https://github.com/CookPete/react-player/blob/master/README.md) | ^1.2.1
 
### Todos
 - Enhanced player
 - Use Redux
 - Write MORE Tests
 

 
 