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
        theme_color: '#ffffff',
        display: 'standalone',
        icon: 'src/images/wikipedia-logo.png',
      },
    },
    'gatsby-plugin-netlify',
  ],
};
