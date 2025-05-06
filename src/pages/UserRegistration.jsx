import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userStore from '../store/userStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
`;

const FormContainer = styled.form`
  max-width: 500px;
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
  background-color: #316282;
  outline: none;
  color: white;
  &:focus {
    border-color: #174252;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
  }

  &::placeholder {
    color: #adb5bd; /* 원하는 placeholder 색상 */
    font-size: 15px;
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
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
const schema = yup.object().shape({
  userId: yup.string().required('아이디를 입력하세요.'),
  userPwd: yup.string().min(4, '비밀번호는 4자 이상이어야 합니다.').required('비밀번호를 입력하세요.'),
  name: yup.string().required('이름을 입력하세요.'),
  nickname: yup.string().required('닉네임을 입력하세요.'),
  gender: yup.string().nullable(),
  genre: yup.string().required('선호 게임 장르를 선택해주세요.'),
  age: yup
    .number()
    .typeError('나이는 숫자여야 합니다.')
    .required('나이를 입력하세요.')
    .min(0, '0세 이상 입력해주세요.'),
});

const UserRegistration = () => {
  const { addUser } = userStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const newUser = {
      userId: data.userId,
      userPwd: data.userPwd,
      name: data.name,
      nickname: data.nickname,
      gender: data.gender || null,
      genre: data.genre,
      age: parseInt(data.age),
      isOnline: watch('isOnline') || false,
    };

    await addUser(newUser);
    toast.success("회원가입 성공");
    
    navigate('/');
  };

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="아이디" {...register('userId')} />
        {errors.userId && <p style={{ color: 'red' }}>{errors.userId.message}</p>}

        <Input type="password" placeholder="비밀번호" {...register('userPwd')} />
        {errors.userPwd && <p style={{ color: 'red' }}>{errors.userPwd.message}</p>}

        <Input placeholder="이름" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

        <Input type="number" placeholder="나이" {...register('age')} />
        {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}

        <Input placeholder="닉네임 (로그인시 보여줄 이름)" {...register('nickname')} />
        {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname.message}</p>}

        <Label>성별 (선택)</Label>
        <select style={{ width: '100%', height: '40px' }} {...register('gender')}>
          <option value="">선택 안함</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>

        <Label>선호 게임 장르</Label>
        <select style={{ width: '100%', height: '40px' }} {...register('genre')}>
          <option value="">장르 선택</option>
          <option value="FPS">FPS</option>
          <option value="RPG">RPG</option>
          <option value="MOBA">MOBA</option>
          <option value="스포츠">스포츠</option>
          <option value="시뮬레이션">시뮬레이션</option>
          <option value="기타">기타</option>
        </select>
        {errors.genre && <p style={{ color: 'red' }}>{errors.genre.message}</p>}

        <Label>
          <input type="checkbox" {...register('isOnline')} />
          &nbsp;온라인 상태
        </Label>

        <SubmitButton type="submit">등록</SubmitButton>
      </FormContainer>
    </Wrapper>
  );
};

export default UserRegistration;
