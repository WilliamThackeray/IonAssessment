module.exports = function (api) {
  api.cache(true);
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
  ];
  return {
    presets: ["babel-preset-expo"],
  };
};
