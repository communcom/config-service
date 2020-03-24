const core = require('cyberway-core-service');
const { Logger } = core.utils;
const SettingsModel = require('../models/Settings');

const GLOBAL_SETTINGS_TYPE = 'global';
const CACHE_EXPIRE_TIMEOUT = 30000;

const settingsCache = {
    data: null,
    expireAt: 0,
};

async function getGlobalSettings() {
    if (settingsCache.expireAt <= Date.now()) {
        const settingsModel = await SettingsModel.findOne(
            {
                type: GLOBAL_SETTINGS_TYPE,
            },
            {
                _id: false,
                data: true,
            },
            {
                lean: true,
            }
        );

        if (settingsModel) {
            settingsCache.data = settingsModel.data;
        } else {
            settingsCache.data = {};

            try {
                await SettingsModel.create({
                    type: GLOBAL_SETTINGS_TYPE,
                    data: {},
                });
            } catch (err) {
                Logger.warn(err);
            }
        }

        settingsCache.expireAt = Date.now() + CACHE_EXPIRE_TIMEOUT;
    }

    return settingsCache.data;
}

module.exports = {
    getGlobalSettings,
};
