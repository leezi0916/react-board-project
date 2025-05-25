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
      const response = await axios.get('http://localhost:8888/api/members');
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },  

  // 사용자 추가하기
  addUser: async (newUser) => {
    console.log(newUser);
    set({ loading: true, error: null });
    try {
      await axios.post('http://localhost:8888/api/members', newUser);
      const response = await axios.get('http://localhost:8888/api/members');
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 사용자 삭제하기
  deleteUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:8888/api/members/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user.userId !== userId),
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
      await axios.patch(`http://localhost:8888/api/members/${updatedUser.user_id}`, updatedUser);
      set((state) => ({
        users: state.users.map((user) =>
          user.userId === updatedUser.user_id ? updatedUser : user
        ),
        currentUser: updatedUser,  // 현재 로그인한 사용자 정보도 갱신
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      set({ error: '사용자 수정 실패', loading: false });
    }
  },

  // 로그인
  // userStore.js 안의 login 함수 수정
login: async (id, pwd) => {
  set({ loading: true, error: null });

  try {
    const response = await axios.post('http://localhost:8888/api/members/login', {
      user_id: id,
      user_pwd: pwd,
    });

    const user = response.data;

    set({
      isLoggedIn: true,
      currentUser: user,
      loading: false,
      error: null,
    });
    return true;
  } catch (error) {
    set({
      isLoggedIn: false,
      currentUser: null,
      loading: false,
      error: '아이디 또는 비밀번호가 틀렸습니다.',
    });
    return false;
  }
},

  logout: () => {
    set({ isLoggedIn: false, currentUser: null });
  },
}));

export default userStore;
