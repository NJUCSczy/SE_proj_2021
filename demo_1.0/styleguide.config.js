const webpack = require('webpack');

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.examples\.md$/, // see comment below!
        type: 'javascript/auto', // Tell webpack to interpret the result from examples-loader as JavaScript
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-react'] },
      },
      // Other loaders that are needed for your components
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
    }
    ],
  },
  plugins: [
    // Rewrites the absolute paths to those two files into relative paths
    new webpack.NormalModuleReplacementPlugin(
      /react-styleguidist\/lib\/loaders\/utils\/client\/requireInRuntime$/,
      'react-styleguidist/lib/loaders/utils/client/requireInRuntime'
    ),
    new webpack.NormalModuleReplacementPlugin(
      /react-styleguidist\/lib\/loaders\/utils\/client\/evalInContext$/,
      'react-styleguidist/lib/loaders/utils/client/evalInContext'
    ),
  ],
};

module.exports = {
  webpackConfig,
  // The rest of your styleguidist config
};
module.exports = {
    webpackConfig,
    sections: [
        {
            name: '用户操作部分',
            sections:[
                {
                    name:"委托部分",
                    components: 'src/UserActions/actions/DelegationPart/**/*.js',
                    usageMode: 'collapse', // 'hide' | 'collapse' | 'expand'
                    exampleMode: 'collapse',
                },
                {
                    name:"合同部分",
                    components: 'src/UserActions/actions/ContractPart/**/*.js',
                },
                {
                    name:"测试部分",
                    components: 'src/UserActions/actions/TestPart/**/*.js',
                },
                {
                    name:"回显部分",
                    components: 'src/UserActions/actions/ViewPart/**/*.js',
                }
            ]
            
        },
        {
            name: '用户信息部分',
            components: 'src/register_login/**/*.js',
        },
    ],
    title: "SEE Document",
};