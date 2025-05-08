import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userStore from '../store/userStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import boardStore from '../store/boardStore';
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
const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 12px;
  margin-top: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  resize: none;
  background: #316282;
  color: white;
  &:focus {
    outline: none;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
`;

const schema = yup.object().shape({
  title: yup.string().required('제목을 입력하세요.'),
  content: yup.string().required('내용을 입력하세요.'),
});

const BoardEnrollForm = () => {
  const { currentUser } = userStore(); // 현재 로그인 사용자 정보 가져오기
  const { addBoard } = boardStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const newBoard = {
      ...data,
      writer: currentUser?.userId || '익명', // 로그인된 사용자 아이디 or '익명'
    };
    await addBoard(newBoard);
    toast.success("게시글 작성 성공");
    navigate('/');
  };

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <h2>게시글 작성</h2>
        <Input value={currentUser?.userId || '로그인 필요'} readOnly />
        <Input placeholder="제목" {...register('title')} />
        {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        <Input placeholder="게임" {...register('game')} />
        {errors.game && <p style={{ color: 'red' }}>{errors.game.message}</p>}
        <Textarea placeholder="내용" {...register('content')} />
        {errors.content && <p style={{ color: 'red' }}>{errors.content.message}</p>}
        <ButtonGroup>
          <SubmitButton type="submit">등록</SubmitButton>
          <SubmitButton type="button" onClick={() => navigate(-1)}>
            뒤로가기
          </SubmitButton>
        </ButtonGroup>
      </FormContainer>
    </Wrapper>
  );
};

export default BoardEnrollForm;
