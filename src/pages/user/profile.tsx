import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import React from 'react'

const Profile = () => <div>Profile Page</div>

export default authenticatedRoute(Profile)
