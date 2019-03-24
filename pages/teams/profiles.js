/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../src/bootstrap'
import React from 'react'
// Authentication
import {
    redirect,
    checkLoggedIn
} from '../../api/auth'
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

TeamProfiles.getInitialProps = async (context) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    if (!loggedInUser.me) {
        redirect(context, '/login')
    }
    return {}
}

export default TeamProfiles