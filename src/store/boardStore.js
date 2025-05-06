import axios from 'axios';
import { create } from 'zustand';

const boardStore = create((set) => ({
  boards: [],
  loading: false,
  error: null,
  isLoggedIn: false, // 로그인 상태
  currentUser: null, // 로그인한 사용자 정보

  // 게시판 데이터 가져오기
  getBoards: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get('http://localhost:3005/boards');
      set({ boards: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  addBoard: async (newBoard) => {
    const response = await axios.get('http://localhost:3005/boards');
    const boards = response.data;
    const maxId = boards.length > 0 ? Math.max(...boards.map((b) => b.id)) : 0;

    const boardToAdd = {
      ...newBoard,
      id: (maxId + 1).toString(),// 번호 자동 부여
    };

    await axios.post('http://localhost:3005/boards', boardToAdd);
  },

  deleteBoard: async (id) => {
    set({ loading: true, error: null });

    try {
      console.log(`삭제 요청할 게시글 ID: ${id}`); 
      await axios.delete(`http://localhost:3005/boards/${id}`);
      console.log('삭제 성공');

      set((state) => ({
        boards: state.boards.filter((board) => board.id !== parseInt(id)),
        loading: false,
      }));
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  },

  // 게시글 수정하기
  updateBoard: async (updatedBoard) => {
    try {
      await axios.put(`http://localhost:3005/boards/${updatedBoard.id}`, updatedBoard);
      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        ),
      }));
    } catch (error) {
      set({ error: '게시글 수정 실패' });
    }
  },
}));

export default boardStore;
