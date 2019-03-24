/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// Authentication
import { checkLoggedIn, redirect } from '../api/auth'
// Material components
import { makeStyles } from '@material-ui/styles'
// Global page layout
import Page from '../sections/global/containers/Page'

// Create Index styles
const indexStyles = makeStyles(theme => ({
}))

function Index() {
    // Define styles
    const classes = indexStyles()
    return (
        <React.Fragment>
            <Page
                title='Admin Portal'
                metaDescription='Admin Portal for Gold Coast Maids'
            >
                test
            </Page>
        </React.Fragment>
    )
}

// Before page is rendered...
Index.getInitialProps = async ctx => {
    console.log('home page getInitialProps hit')
    // Check if user is logged in
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    console.log('loggedInUser')
    console.log(loggedInUser)
    // If not signed in, redirect to login page
    if (!loggedInUser.me) { redirect(ctx, '/login') }
    // Return the logged in user
    return { loggedInUser }
}

export default Index