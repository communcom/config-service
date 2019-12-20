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
                    validation: {
                        required: ['platform', 'deviceType', 'clientType', 'version'],
                        properties: {
                            platform: {
                                type: 'string',
                                enum: ['ios', 'android', 'desktop'],
                            },
                            deviceType: {
                                type: 'string',
                                enum: ['phone', 'tablet', 'desktop'],
                            },
                            clientType: {
                                type: 'string',
                                enum: ['app', 'web', 'web-view'],
                            },
                            version: {
                                type: 'string',
                            },
                            deviceId: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        });
    }
}

module.exports = Connector;
