import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import userStore from '../store/userStore'; // zustand store 경로에 맞게 수정
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

const BoardDetail = () => {
  const { boardNo } = useParams(); // id 대신 boardNo 사용
  const navigate = useNavigate();
  const { currentUser } = userStore();
  const { boards, deleteBoard, updateBoard } = boardStore();
  const [board, setBoard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedGame, setUpdatedGame] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  // 게시글 불러오기
  useEffect(() => {
    const found = boards.find((b) => String(b.board_no) === String(boardNo));
    if (found) {
      setBoard(found);
      setUpdatedTitle(found.title);
      setUpdatedGame(found.game);
      setUpdatedContent(found.content);
    }
  }, [boards, boardNo]);

  // 현재 사용자가 작성자인지 체크
  const isAuthor = String(currentUser?.user_id) === String(board?.writer);

  // 삭제 핸들러
  const handleDelete = async (boardNo) => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        await deleteBoard(boardNo);
        toast.success('게시글 삭제 성공!');
        navigate('/');
      } catch (error) {
        console.error('게시글 삭제 실패:', error);
      }
    }
  };

  // 수정 모드 토글
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // 수정 완료 핸들러
  const handleUpdate = async () => {
    try {
      const updatedBoard = {
        ...board,
        board_no: board.board_no,
        title: updatedTitle,
        game: updatedGame,
        content: updatedContent,
      };
      await updateBoard(updatedBoard);
      setIsEditing(false);
      toast.success('게시글 수정 성공!');
      navigate('/');
    } catch (error) {
      console.error('게시글 수정 실패:', error);
    }
  };

  if (!board) {
    return (
      <Wrapper>
        <p>게시글을 불러오는 중입니다...</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <FormContainer>
        <h2>게시글 상세</h2>
        <Input
          value={isEditing ? board.writer : board.writer || '작성자 정보 없음'}
          readOnly
        />
        <Input
          value={isEditing ? updatedTitle : board.title}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          readOnly={!isEditing}
        />
        <Input
          value={isEditing ? updatedGame : board.game}
          onChange={(e) => setUpdatedGame(e.target.value)}
          readOnly={!isEditing}
        />
        <Textarea
          value={isEditing ? updatedContent : board.content}
          onChange={(e) => setUpdatedContent(e.target.value)}
          readOnly={!isEditing}
        />

        <ButtonGroup>
          <SubmitButton type="button" onClick={() => navigate(-1)}>
            뒤로가기
          </SubmitButton>
          {isAuthor && (
            <>
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
              <SubmitButton type="button" onClick={() => handleDelete(board.board_no)}>
                삭제
              </SubmitButton>
            </>
          )}
        </ButtonGroup>
      </FormContainer>
    </Wrapper>
  );
};

export default BoardDetail;
