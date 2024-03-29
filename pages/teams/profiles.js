/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../src/bootstrap'
import React from 'react'
// Authentication
import { checkLoggedIn, redirect } from '../../api/auth'
// Global page layout
import Page from '../../sections/global/containers/Page'
// Page specific sections
import TeamList from '../../sections/teams/profiles/containers/'

function TeamProfiles() {
    return (
        <Page
            title='Services'
            metaDescription='Services'
        >
            <TeamList />
        </Page>
    )
}

// Before page is rendered...
TeamProfiles.getInitialProps = async ctx => {
    // Check if user is logged in
    const { loggedInUser } = await checkLoggedIn(ctx)
    // If not signed in, redirect to login page
    if (!loggedInUser.me) { redirect(ctx, '/admin/login') }
    // Return
    return { loggedInUser }
}


export default TeamProfiles