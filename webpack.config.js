const path = require('path');

module.exports = {
  entry: './src/todo.js', // Point d'entrée de l'application
  output: {
    filename: 'bundle.js', // Nom du bundle généré
    path: path.resolve(__dirname, 'dist'), // Répertoire de sortie
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Utilisation de loaders pour les fichiers CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource', // Gérer les polices avec asset/resource
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  devtool: 'source-map', // Génération de sourcemaps
  
};