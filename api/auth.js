import Router from 'next/router'
import {
    GET_ME,
    REFRESH_AUTH_TOKEN,
} from './graphql'
import { destroyCookie } from 'nookies'

// Check if user is logged in
export function checkLoggedIn(ctx) {
    // Verify access token with server (access token sent in request headers in ./init-apollo.js)
    return ctx.apolloClient.query({
        query: GET_ME,
    })
        // Return logged in user on verification success
        .then(({ data }) => {
            return { loggedInUser: data }
        })
        // Return nothing on verification failure
        .catch(() => { return { loggedInUser: {} } })
}

// Refresh expired access tokens
export function refreshAccessToken(refreshToken, client) {
    // Fetch a new access token from the server
    return client.mutate({
        mutation: REFRESH_AUTH_TOKEN,
        variables: {
            refreshToken
        }
    })
        // Return new token on success
        .then(({ data }) => {
            return data.refreshAccessToken
        })
        // Log out user on failure
        .catch(() => {
            console.log('signing user out')
            signOut(ctx, client)
            return {}
        })
}

// Handle sign out
export function signOut(ctx, client) {
    // Delete auth and refesh tokens from cookies
    destroyCookie({}, 'x-token')
    destroyCookie(ctx, 'x-token-refresh')
    // Reset store 
    return client.resetStore()
        .then(() => {
            // Redirect to login screen
            redirect({}, '/login')
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
    else {
        Router.replace(target)
    }

}