import React from 'react';
import {Card, CardContent} from '@mui/material';

    const UserProfile = ({ user }) => {
        return (
          <Card className='mx-20 px-10'>
            <CardContent>
              <h2 className='border-b-white'>Your user details:</h2>
              <p className='profile-text'><b>User ID: </b>{user.id}</p>
              <p className='profile-text'><b>Email: </b>{user.email}</p>
              <p className='profile-text'><b>Registration Date: </b>{user.created_at}</p>
              {/* Add more profile information and styling as desired */}
            </CardContent>
          </Card>
        );
      };
  export default UserProfile;