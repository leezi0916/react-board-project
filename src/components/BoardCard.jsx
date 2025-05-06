import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  background-color: #316282;
  display: flex;
  padding: 15px 20px;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #174252;
  }
`;

const No = styled.h3`
  flex: 1;
  font-size: 16px;
  color: #e5e5e5;
  text-align: center;
`;

const Title = styled.h3`
  flex: 3;
  font-size: 18px;
  color: #e5e5e5;
  text-align: center;
`;

const Writer = styled.small`
  flex: 2;
  font-size: 14px;
  color: #e5e5e5;
  text-align: center;
`;



const BoardCard = ({ board }) => {
  return (
    <Card to={`/board/${board.id}`}>
      <No>{board.id}</No>
      <Title>{board.title}</Title>
      <Title>{board.game}</Title>
      <Writer>작성자: {board.writer || '익명'}</Writer>
    </Card>
  );
};

export default BoardCard;
