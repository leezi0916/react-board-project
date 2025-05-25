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
      const response = await axios.get('http://localhost:8888/api/boards');
      set({ boards: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  addBoard: async (newBoard) => {
    const formData = new FormData();
    Object.entries(newBoard).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    const response = await axios.post('http://localhost:8888/api/boards', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    set((state) => ({
      boards: [...state.boards, response.data],
    }));
  },
  

  deleteBoard: async (boardNo) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:8888/api/boards/${boardNo}`);
      set((state) => ({
        boards: state.boards.filter((board) => board.board_no !== boardNo),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 게시글 수정하기
  updateBoard: async (updatedBoard) => {
    try {
      const formData = new FormData();
  
      // Object.entries()를 사용해 FormData에 키-값 추가
      Object.entries(updatedBoard).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      await axios.patch(`http://localhost:8888/api/boards/${updatedBoard.board_no}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      set((state) => ({
        boards: state.boards.map((board) =>
          board.board_no === updatedBoard.board_no ? updatedBoard : board
        ),
      }));
    } catch (error) {
      console.error(error);
      set({ error: '게시글 수정 실패' });
    }
  },
}));

export default boardStore;
