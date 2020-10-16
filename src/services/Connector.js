const core = require('cyberway-core-service');
const BasicConnector = core.services.Connector;

const Config = require('../controllers/Config');

class Connector extends BasicConnector {
    constructor({ config }) {
        super();

        this._config = config;
    }

    async start() {
        await super.start({
            serverRoutes: {
                getConfig: {
                    handler: this._config.getConfig,
                    scope: this._config,
                },
            },
        });
    }
}

module.exports = Connector;
