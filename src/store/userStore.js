import axios from 'axios';
import { create } from 'zustand';

const userStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,
  isLoggedIn: false, // 로그인 상태
  currentUser: null, // 로그인한 사용자 정보


  // 사용자 데이터 가져오기
  getUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3005/users');
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 사용자 추가하기
  addUser: async (newUser) => {
    const response = await axios.get('http://localhost:3005/users');
    const users = response.data;
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;

    const userToAdd = {
      ...newUser,
      id: (maxId + 1).toString(),// 고유 id 생성
    };

    await axios.post('http://localhost:3005/users', userToAdd);
  },

  // 사용자 삭제하기
  deleteUser: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:3005/users/${id}`); 

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 사용자 수정하기
  updateUser: async (updatedUser) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`http://localhost:3005/users/${updatedUser.id}`, updatedUser);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: '사용자 수정 실패', loading: false });
    }
  },

  login: async (id, pwd) => {
    set({ loading: true });
  
    let users = get().users;
    if (users.length === 0) {
      try {
        const response = await axios.get('http://localhost:3005/users');
        users = response.data;
        set({ users });
      } catch (error) {
        set({ error: '서버 연결 실패', loading: false });
        return false; // 실패 반환
      }
    }
  
    const user = users.find((u) => u.userId === id && u.userPwd === pwd);
  
    if (user) {
      set({ isLoggedIn: true, currentUser: user, error: null });
      set({ loading: false });
      return true; // 성공 반환
    } else {
      set({ isLoggedIn: false, currentUser: null, error: '아이디 또는 비밀번호가 틀렸습니다.' });
      set({ loading: false });
      return false; // 실패 반환
    }
  },
   
  logout: () => {
    set({ isLoggedIn: false, currentUser: null });
  },
  
}));

export default userStore;
