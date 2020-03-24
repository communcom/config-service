const { get } = require('lodash');
const core = require('cyberway-core-service');
const { Basic } = core.controllers;
const { isLowerThan } = require('../utils/versions');
const { getGlobalSettings } = require('../utils/settings');

const minimalVersions = {
    app: {
        ios: '1.0.0',
        android: '1.0.0',
    },
};

class Config extends Basic {
    async getConfig({ platform, deviceType, clientType, version }) {
        const minVersion = get(minimalVersions, [clientType, platform]);

        if (minVersion && isLowerThan(version, minVersion)) {
            throw {
                code: 5000,
                message: 'Need update application version',
            };
        }

        const globalSettings = await getGlobalSettings();

        return {
            features: {
                ftueCommunityBunus: true,
            },
            domain: 'https://commun.com',
            ftueCommunityBonus: 10,
            isMaintenance: false,
            // params above can be overriden by globalSettings
            ...globalSettings,
        };
    }
}

module.exports = Config;
