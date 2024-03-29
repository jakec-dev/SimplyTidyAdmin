import Router from 'next/router'
import {
    GET_ME,
    REFRESH_ACCESS_TOKEN,
    USER_VALIDATE_RESET_PASSWORD_TOKEN
} from './graphql'

// Check if user is logged in
export function checkLoggedIn(ctx) {
    // Verify access token with server
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
        mutation: REFRESH_ACCESS_TOKEN,
        variables: {
            refreshToken
        }
    })
        // Return new tokens on success
        .then(({ data }) => {
            return data.refreshAccessToken
        })
        // Return empty object on failure
        .catch(() => {
            return {}
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