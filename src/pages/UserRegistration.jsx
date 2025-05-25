import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userStore from '../store/userStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

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
    color: #adb5bd;
    font-size: 15px;
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 8px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #316282;
  color: white;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  margin: 5px 0 0;
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
  user_id: yup.string().required('아이디를 입력하세요.'),
  user_pwd: yup.string().min(4, '비밀번호는 4자 이상이어야 합니다.').required('비밀번호를 입력하세요.'),
  name: yup.string().required('이름을 입력하세요.'),
  nickname: yup.string().required('닉네임을 입력하세요.'),
  gender: yup.string().nullable(),
  genre: yup.string().required('선호 게임 장르를 선택해주세요.'),
  age: yup
    .number()
    .typeError('나이는 숫자여야 합니다.')
    .required('나이를 입력하세요.')
    .min(0, '0세 이상 입력해주세요.'),
  is_online: yup.boolean().nullable(),
});

const UserRegistration = () => {
  const { addUser, users, getUsers, loading } = userStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, []);

  // 여기서 onError 선언
  const onError = (errors) => {
    console.log('유효성 검사 실패:', errors);
    toast.error('입력 폼을 다시 확인해주세요.');
  };

  const onSubmit = async (data) => {
    console.log('폼 제출됨:', data);
    const isDuplicate = users.some((user) => user.user_id === data.user_id);
    if (isDuplicate) {
      toast.error('이미 존재하는 아이디입니다.');
      return;
    }

    const newUser = {
      user_id: data.user_id,
      user_pwd: data.user_pwd,
      name: data.name,
      nickname: data.nickname,
      gender: data.gender || null,
      genre: data.genre,
      age: parseInt(data.age),
      is_online: data.is_online || false,
    };

    await addUser(newUser);
    toast.success('회원가입 성공');
    reset();
    navigate('/');
  };

  if (loading) {
    return (
      <Wrapper>
        <ClipLoader color="#36d7b7" size={80} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit(onSubmit, onError)}>
        <Input placeholder="아이디" {...register('user_id')} />
        {errors.user_id && <ErrorMessage>{errors.user_id.message}</ErrorMessage>}

        <Input type="password" placeholder="비밀번호" {...register('user_pwd')} />
        {errors.user_pwd && <ErrorMessage>{errors.user_pwd.message}</ErrorMessage>}

        <Input placeholder="이름" {...register('name')} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

        <Input placeholder="닉네임" {...register('nickname')} />
        {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}

        <Input type="number" placeholder="나이" {...register('age')} />
        {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
        <Label>
          <input type="checkbox" {...register('is_online')} />
          &nbsp;온라인 상태
        </Label>
        <Label>성별 (선택)</Label>
        <Select {...register('gender')}>
          <option value="">선택 안함</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </Select>
        <Label>선호 게임 장르</Label>
        <Select {...register('genre')}>
          <option value="">장르 선택</option>
          <option value="FPS">FPS</option>
          <option value="RPG">RPG</option>
          <option value="MOBA">MOBA</option>
          <option value="스포츠">스포츠</option>
          <option value="시뮬레이션">시뮬레이션</option>
          <option value="기타">기타</option>
        </Select>
        {errors.genre && <ErrorMessage>{errors.genre.message}</ErrorMessage>}

        <SubmitButton type="submit">등록</SubmitButton>
      </FormContainer>
    </Wrapper>
  );
};

export default UserRegistration;
