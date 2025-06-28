export const oktaConfig = {
    clientId: '0oaogvfltkwffScvz5d7',
    issuer: 'https://dev-56158702.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
};