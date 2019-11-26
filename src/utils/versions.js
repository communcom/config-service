function isLowerThan(version, than) {
    const v1 = version.split('.');
    const v2 = than.split('.');

    const maxLength = Math.max(v1.length, v2.length);

    for (let i = 0; i < maxLength; i++) {
        const a1 = parseInt(v1[i], 10);
        const a2 = parseInt(v2[i], 10);

        if (Number.isNaN(a1) || Number.isNaN(a2)) {
            throw {
                code: 3021,
                message: 'Invalid version format',
            };
        }

        if (a1 < a2) {
            return true;
        } else if (a1 > a2) {
            return false;
        }
    }

    return false;
}

module.exports = {
    isLowerThan,
};
