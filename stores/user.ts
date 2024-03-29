type UserInfo = {
  username: string;
  email: string;
  nickName: string;
  headPic: string;
  isAdmin: boolean;
  isFreeze: boolean;
  permission: any[];
  roles: any[];
  phoneNumber: string;
  id: number;
};

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userInfo: null as UserInfo | null,
  }),
});
