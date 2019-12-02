module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Wikipedia',
        short_name: 'Wikipedia',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        display: 'minimal-ui',
        icon: 'src/images/wikipedia-logo.png',
      },
    },
  ],
};
