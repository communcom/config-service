const core = require('cyberway-core-service');
const { Basic } = core.controllers;
const { isLowerThan } = require('../utils/versions');

class Config extends Basic {
    async getConfig({ platform, deviceType, type, isWebView, version }) {
        if (platform === 'ios' && type === 'app' && isLowerThan(version, '1.0.0')) {
            throw {
                code: 5000,
                message: 'Need update application version',
            };
        }

        return {
            features: {
                ftueCommunityBunus: true,
            },
            domain: 'https://commun.com',
            ftueCommunityBonus: 10,
        };
    }
}

module.exports = Config;
