import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import userStore from '../store/userStore';
import UserCard from '../components/UserCard';
import BoardCard from '../components/BoardCard';
import { Link } from 'react-router-dom';
import boardStore from '../store/boardStore';
import { HiMiniUser } from 'react-icons/hi2';
import { FadeLoader } from 'react-spinners';
import { FaSquareSteam } from 'react-icons/fa6';
import { ImUser } from "react-icons/im";
import { toast } from 'react-toastify';
const Wrapper = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  padding: 70px;
  gap: 20px;
  
`;
const AdContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 15px;
`;
const BoardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
`;
const UserContainer = styled.div`
  width: 35%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BoardHeader = styled.div`
  width: 100%;
  background: #182331;
  height: 50px;
  display: flex;
  align-items: center;
`;

const UserHeader = styled.div`
  width: 100%;
  background: #182331;
  height: 50px;
  display: flex;
  align-items: center;
`;

const AdList = styled.div`
  width: 100%;
  height: 100%;
  background: #213e59;
  border-radius: 20px;

  img {
    border-radius: 30px;
    padding: 20px;
  }
`;
const AdImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  padding: 20px;
  opacity: ${(props) => (props.isFading ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;
`;
const BoardList = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #213e59;
  width: 100%;
`;

const UserList = styled.div`
  width: 100%;
  height: 380px;
  background: #213e59;
  overflow-y: auto; /* 세로 스크롤 추가 */

  li {
    list-style: none;
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 20px;
  background: #213e59;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Login = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 25px;
`;
const InputField = styled.input`
  width: 100%; /* 80%에서 100%로 변경하여 버튼과 동일한 너비로 맞춤 */
  height: 60px;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid #ced4da;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px; /* 아래 간격 추가 */
  transition: all 0.3s ease;
  background: #316282;
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

const LoginButton = styled.button`
  flex: 1;
  height: 45px;
  border-radius: 8px;
  background-color: #28a745;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:active {
    background-color: #1e7e34;
  }
`;
const LogOutButton = styled.button`
  flex: 1;
  height: 45px;
  border-radius: 8px;
  background-color: #dc3545;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }

  &:active {
    background-color: #bd2130;
  }
`;

const Button = styled(Link)`
  flex: 1;
  height: 45px;
  border-radius: 8px;
  background-color: #28a745;
  color: white;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:active {
    background-color: #1e7e34;
  }
`;

const Id = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Pwd = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const UserWrapper = styled.div`
  width: 100%;

  border-radius: 15px;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 20%;
  object-fit: cover;
  border: 2px solid white;
`;
const UserButton = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  justify-content: center;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserInfo1 = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;  /* 왼쪽 정렬 추가 */
  
  h2 {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
  
    width: auto;  /* 고정 너비를 없애서 글씨 길이에 맞게 조정 */
    white-space: normal; /* 줄바꿈 허용 */
    word-break: break-word; /* 단어가 길면 강제 줄바꿈 */
   
  }
`;




const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 750px;
  gap: 20px;
`;

const Home = () => {
  const { users, getUsers, login, logout, isLoggedIn, currentUser, error, loading } = userStore();
  const { boards, getBoards } = boardStore();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const adImages = ['/ads/ad1.jpg', '/ads/ad2.jpg', '/ads/ad3.jpg', '/ads/ad4.jpg'];
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // 페이드 아웃 시작
      setTimeout(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length);
        setIsFading(false); // 페이드 인 시작
      }, 400); // 애니메이션 시간에 맞게 설정
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getBoards();
    getUsers();
  }, []); // 빈 배열 → 최초 1회만 실행

  //로그인
  const handleLogin = async () => {
    const result = await login(id, password);
  
    if (result) {
      toast.success("로그인 성공");
      setId('');
      setPassword('');
    } else {
      toast.error("로그인 실패: 아이디 또는 비밀번호를 확인하세요");
    }
  };
  

  //로그아웃
  const handleLogout = () => {
    toast.error("로그아웃 성공");
    logout();
  };

  return (
    <Wrapper>
      <Container>
        <AdContainer>
          <AdList>
            <AdImage src={adImages[currentAdIndex]} alt="광고 배너" isFading={isFading} />
          </AdList>
        </AdContainer>
        <BoardContainer>
          <BoardHeader>
            <h2>게시판 목록</h2>
          </BoardHeader>
          <BoardList>
            {boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </BoardList>
        </BoardContainer>
      </Container>

      <UserContainer>
        {isLoggedIn ? (
          <LoginContainer>
            <Login>
            
                
                <UserInfo1>
                <UserImg src="https://i.pinimg.com/736x/3c/bd/86/3cbd86e0fab831190029fee0ea5bb882.jpg"></UserImg>
                  <h2>
                    <FaSquareSteam />
                    {currentUser?.userId}
                  </h2>
                  <h2>
                    <ImUser />
                    {currentUser?.name}님
                  </h2>
                </UserInfo1>
             

              <UserButton>
                <Button to={'/board/'}>게시글 등록</Button>
                <Button to={`/user/${currentUser.id}`}>마이페이지</Button>
                <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
              </UserButton>
            </Login>
          </LoginContainer>
        ) : (
          <LoginContainer>
            <Login>
              <Id>
                <InputField
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Id>
              <Pwd>
                <InputField
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Pwd>
              <ButtonContainer>
                <Button to={'/user/'}>회원가입</Button>
                <LoginButton onClick={handleLogin} disabled={loading}>
                  {loading ? '로그인 중...' : '로그인'}
                </LoginButton>
                {loading && <FadeLoader />}
              </ButtonContainer>
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </Login>
          </LoginContainer>
        )}
        <UserWrapper>
          <UserHeader>
            <h2>온라인 여부</h2>
          </UserHeader>
          <UserList>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </UserList>
        </UserWrapper>
      </UserContainer>
    </Wrapper>
  );
};

export default Home;
