import * as React from 'react';
import styled from 'styled-components';
import { UserData } from '../../../types';

interface UserProfileProps {
  userData: UserData;
}
const UserProfile = ({ userData }: UserProfileProps) => {
  return <UserName>{userData.name}</UserName>;
};

export default UserProfile;

const UserName = styled.h3`
  color: #fff;
  font-size: 1.25rem;
`;
