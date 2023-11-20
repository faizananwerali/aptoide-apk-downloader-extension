const { override } = require('customize-cra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const overrideEntry = (config) => {
    config.entry = {
        main: './src/popup', // the extension UI
        background: './src/background',
        content: [
            './src/content/index.js', // Include index.js
            './src/content/index.css' // Include index.css
        ],
    };

    return config;
};

const overrideOutput = (config) => {
    config.output = {
        ...config.output,
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js',
    };

    return config;
};

const overridePlugins = (config) => {
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[id].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'icons', // Source directory
                    to: 'icons' // Destination directory
                },
                {
                    from: 'images', // Source directory
                    to: 'images' // Destination directory
                }
            ]
        })
    );

    return config;
};

module.exports = {
    webpack: (config) => {
        config = override(overrideEntry, overrideOutput)(config);
        config = overridePlugins(config);
        return config;
    },
};
