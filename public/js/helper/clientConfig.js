/*jshint esnext: true */
const ClientConfig = {
    appId : '0LM8552PMH',
    userKey: '015d05cd67dc809d4f3e93c429a62d13',
    version: 1,
    indexes: {
      master: 'AppStore_master',
      rankDesc: 'AppStore_ranking_desc',
      rankAsc: 'AppStore_ranking_asc'
    },
    httpAuthentificationHeader: {
      'X-Algolia-Application-Id': '0LM8552PMH',
      'X-Algolia-API-Key': '0e5fd5df56677d5084edd6f2c85a3033'
    }
};

module.exports = ClientConfig;