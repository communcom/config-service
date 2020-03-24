const core = require('cyberway-core-service');
const { MongoDB } = core.services;

module.exports = MongoDB.makeModel(
    'Settings',
    {
        type: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
    },
    {
        index: [
            {
                fields: {
                    type: 1,
                },
                options: {
                    unique: true,
                },
            },
        ],
    }
);
