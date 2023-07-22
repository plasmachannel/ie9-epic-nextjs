const path = require("path");
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config, options) => {
        const {isServer} = options;
        console.log(config);
        //console.log({options});
        config.snapshot.managedPaths = [];
        // config.entry().then(console.log);
        config.stats = 'verbose';
        config.module.rules.push({
            test: /\.(js|jsx|ts|tsx|mjs)$/,
            exclude: (file) => {

                const excludeList = [
                    "/node_modules/core-js/",
                    "/node_modules/@babel/",
                    "@babel",
                ]

                const isExcluded = excludeList.find(ef => file.includes(ef));

                const shouldExclude = /node_modules/.test(file) && isExcluded;
                if (!shouldExclude) {
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
                    // cacheDirectory: true,
                    // And replace .babelrc with babel.config.json...
                    babelrc: false,
                    // ...which might also mean you need this if you are using a monorepo:
                    rootMode: 'upward',
                }}],
        });

        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                modules: ['src', 'node_modules'],
            };
        }
        return config;
    },

    // if you need the env variables to be defined to the client redefine it in here
    // https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    env: {},
};
module.exports = nextConfig
