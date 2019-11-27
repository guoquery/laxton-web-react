"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    cssModule: process.env.CSS_MODULE || false,
    prefix: process.env.SO_PREFIX || 'so',
    locale: process.env.LOCALE || 'en-US',
};
exports.default = config;
function setConfig(conf) {
    Object.assign(config, conf);
}
exports.setConfig = setConfig;
