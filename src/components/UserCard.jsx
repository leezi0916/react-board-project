import React from 'react';
import styled from 'styled-components';
import { BsCircleFill } from 'react-icons/bs';

const Card = styled.div`
  background-color: #316282;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between; /* 좌우 배치 */
  align-items: center;
  transition: box-shadow 0.3s ease;
  &:hover {
    background-color: #174252;
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 5px;
`;
const UserId = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #e5e5e5;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const UserName = styled.div`
  font-size: 16px;
  color: #e5e5e5;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
`
const UserOnline = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const UserCard = ({ user }) => {
  return (
    <Card>
      <UserInfo>
        <UserId>닉네임 : {user.nickname}</UserId>
        <UserName>선호 장르 : {user.genre}</UserName>
      </UserInfo>
      <UserOnline>{user.isOnline ? <BsCircleFill color="green"/> : <BsCircleFill color="red" />}</UserOnline>
    </Card>
  );
};

export default UserCard;
