import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore'; // zustand store 경로에 맞게 수정
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
`;
const FormContainer = styled.form`
  width: 700px;
  margin: 50px auto;
  padding: 30px;
  background-color: #203e59;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  margin-top: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background: #316282;
  color: white;
  &:focus {
    outline: none;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 30px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const UserDetail = () => {
  const { currentUser, updateUser } = userStore(); // zustand store에서 사용자 정보 가져오기
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // 수정 상태 추가
  const [updatedName, setUpdatedName] = useState(currentUser?.name || '');
  const [updatedAge, setUpdatedAge] = useState(currentUser?.age || '');
  const [updatedIsOnline, setUpdatedIsOnline] = useState(currentUser?.isOnline || false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        user_id: currentUser.user_id, // userId 대신 user_id인지 확인
        name: updatedName,
        age: updatedAge,
        is_online: updatedIsOnline, // isOnline 대신 is_online인지 확인
      };
      await updateUser(updatedUser);
      setIsEditing(false);
      toast.success('회원정보가 수정 되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('사용자 수정 실패:', error);
      toast.error('회원정보 수정 실패.');
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <h2>마이페이지</h2>

        <Input
          value={isEditing ? updatedName : currentUser?.name}
          onChange={(e) => setUpdatedName(e.target.value)}
          readOnly={!isEditing}
          placeholder="이름"
        />
        <Input
          type="number"
          value={isEditing ? updatedAge : currentUser?.age}
          onChange={(e) => setUpdatedAge(Number(e.target.value))}
          readOnly={!isEditing}
          placeholder="나이"
        />
        <label>
          <input
            type="checkbox"
            checked={updatedIsOnline}
            onChange={(e) => setUpdatedIsOnline(e.target.checked)}
            disabled={!isEditing}
          />
          온라인 상태
        </label>

        <div>
          <SubmitButton type="button" onClick={() => navigate('/')}>
            뒤로가기
          </SubmitButton>
          {isEditing ? (
            <>
              <SubmitButton type="button" onClick={handleUpdate}>
                수정 완료
              </SubmitButton>
              <SubmitButton type="button" onClick={handleEditToggle}>
                수정 취소
              </SubmitButton>
            </>
          ) : (
            <SubmitButton type="button" onClick={handleEditToggle}>
              수정
            </SubmitButton>
          )}
        </div>
      </FormContainer>
    </Wrapper>
  );
};

export default UserDetail;
