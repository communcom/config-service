const core = require('cyberway-core-service');
const { BasicMain } = core.services;
const env = require('./data/env');
const Config = require('./controllers/Config');
const Connector = require('./services/Connector');

class Main extends BasicMain {
    constructor() {
        super(env);

        const config = new Config();
        const connector = new Connector({ config });

        this.addNested(connector);
    }
}

module.exports = Main;
