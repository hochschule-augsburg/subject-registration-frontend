module.exports = function override(config, env) {
    config.resolve = {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    };
    config.module.rules = config.module.rules.map(rule => {
        if (rule.oneOf instanceof Array) {
            return {
                ...rule,
                oneOf: [
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                noEmit: false
                            },
                            allowTsInNodeModules: true
                        }
                    },
                    ...rule.oneOf
                ]
            };
        }
        return rule;
    });
    return config;
}
