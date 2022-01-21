import React, { useEffect } from 'react';
import '../../Styles/Profile.css'

import { Link } from 'react-router-dom';

const Profile = ({ history }) => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col mt-5'>
            <div className='card m-auto ' style={{ width: '50%' }}>
              <div className='card-body'>
                <h3 className='card-title'>Full Name</h3>
                <h3 className='card-title'>Email</h3>
                <h3 className='card-title'>Username</h3>
                <h3 className='card-title'>Password</h3>
                <Link to='/user-update' className='btn btn-primary'>
                  Update your profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Profile;