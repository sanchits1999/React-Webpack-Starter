const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Between the entry point and output, there are two important steps:
// 1. Loader
// 2. Plugin

//LOADER
// Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed
// by your application and added to the dependency graph. Loaders are applied on a per-file level so we can have
// all javascript files should get handled by one loader and all CSS files should be handled by another loader.
// Two examples :- css-loader, babel-loader

//PLUGINS
// Plugins can be leveraged to perform a wider range of tasks like bundle optimization,
// asset management and injection of environment variables.
// Example :- html-webpack-plugin
// Here we can apply some general transformations or optimizations like uglify, so this is on a global level and
// happens after the loaders did their job.

module.exports = {
  mode: "development",
  //there can be multiple entry points in the application
  entry: path.join(__dirname, "src", "index.js"), // joins all the give paths and returns it,
  // ----------------------
  // We now need to tell webpack to transpile javascript files using babel before bundling them.
  // To do that we need to define some rules for the module bundling.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //Here we tell webpack to use babel-loader to transpile files that end with .js
        exclude: /node_modules/, //ignore node modules
        use: {
          loader: "babel-loader", // we need babel to transform es7/6 javascript to code to es5 to support old browsers
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], //Here we have 2 presets @babel/preset-env for transpiling ES2015+ syntax and we have @babel/preset-react for transpiling react code
          },
        },
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
        //1. css-loader will generate output string
        //2. style loader will take this string and will embed it in the style tag in index.html.
      },
      {
        test: /\.(s(a|c)ss)$/, //Note: The order in which webpack apply loaders is from last to first, so as said earlier the css-loader will generate the output string which will be used by the style-loader.
        use: ["style-loader", "css-loader", "sass-loader"], //We just need to add the sass-loader ahead of css-loader, so now first, the .scss file compiles back to CSS and after that process remains the same as explained above.
        //1. sass-loader converts scss to css
        //2. css-loader will generate output string
        //3. style loader will take this string and will embed it in the style tag in index.html.
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    //this plugin add the scrips tags of bundles created during build into the html file and then move the
    //html file into the dist folder
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  output: {
    //there can only be one output for an application
    path: path.resolve(__dirname, "dist"), //returns path absolute to the current working directory
  },
};
