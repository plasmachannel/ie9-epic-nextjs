const path = require("path");
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: (file) => {
                const shouldExclude = /node_modules/.test(file) && !file.includes("/node_modules/core-js/");
                if (shouldExclude) {
                    console.log(file);
                }

                if (file.includes("/node_modules/@tanstack/")){
                    console.log('found tanstack ');
                }

                return shouldExclude;
            },
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    // And replace .babelrc with babel.config.json...
                    babelrc: false,
                    // ...which might also mean you need this if you are using a monorepo:
                    rootMode: 'upward',
                }}]
        });

        return config;
    },

    // if you need the env variables to be defined to the client redefine it in here
    // https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    env: {},
};
module.exports = nextConfig
