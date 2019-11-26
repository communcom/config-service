const { get } = require('lodash');
const core = require('cyberway-core-service');
const { Basic } = core.controllers;
const { isLowerThan } = require('../utils/versions');

const minimalVersions = {
    app: {
        ios: '1.0.0',
        android: '1.0.0',
    },
};

class Config extends Basic {
    async getConfig({ platform, deviceType, type, isWebView, version }) {
        const minVersion = get(minimalVersions, [type, platform]);

        if (minVersion && isLowerThan(version, minVersion)) {
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
