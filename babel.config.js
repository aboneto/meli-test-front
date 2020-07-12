module.exports = function (api) {
    api.cache(true);

    const presets = [[
        "@babel/preset-env",
        {
            "targets": "> 1%, IE 11, samsung 9.2",
            "useBuiltIns": "entry",
            "corejs": 3
        }
    ], "@babel/preset-react"];
    const plugins = [];

    return {
        presets,
        plugins
    };
};
