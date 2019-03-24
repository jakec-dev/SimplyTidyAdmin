import Router from 'next/router'
import cookie from 'next-cookies'
import {
    GET_ME,
    USER_SIGN_IN,
    REFRESH_AUTH_TOKEN,
} from './graphql'

// Check if user is logged in
export function checkLoggedIn(ctx) {
    // Get auth token from cookies
    const token = cookie(ctx)['x-token']

    // Return false if no auth token provided
    if (!token) { return false }

    // Verify auth token with server (auth token sent in request headers in ./init-apollo.js)
    ctx.apolloClient
    client.query({
        query: GET_ME,
    })

        // Return true on verification success
        .then(() => {
            return true
        })

        // Return false on verification failure and output error to console for debugging
        .catch((error) => {
            console.error('Error in catch of checkLoggedIn() in auth.js:')
            console.error(error)
            console.log('*****************')
            return false
        })
}

// Sign in user
export function signInUser(login, password) {
    // Attempt to sign in
    client.query({
        query: USER_SIGN_IN,
        variables: { login, password }
    })
        // On successful login...
        .then((data) => {
            // Force a reload of all the current queries
            client.cache.reset()
            // Return new tokens
            return data.data.signIn
        })
        // Return error message on login fail for debugging
        .catch(error => {
            console.error('Eror in catch of signIn() auth.js')
            console.error(error)
            console.log('*****************')
        })
}

// Refresh expired auth tokens
export function refreshAuthToken(refreshToken) {
    // Fetch a new auth token from the server
    client.mutate({
        mutation: REFRESH_AUTH_TOKEN,
        variables: {
            refreshToken
        }
    })
        // Return new auth token
        .then(data => { return data.data.refreshAuthToken.token })

        // Log refresh failures for debugging
        .catch(error => {
            console.error('Error received in fetchNewAuthToken() catch of auth.js:')
            console.error(error)
            console.log('*****************')
        })
}

// Handle redirects
export function redirect(ctx, target) {
    // Check if in server
    if (ctx.res) {
        ctx.res.writeHead(303, { Location: target })
        ctx.res.end()
    }
    // Continue redirect if in browswer
    Router.replace(target)

}