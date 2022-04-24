import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
type UserInfo = {
  id: number;
  name: string;
  isSignIn: boolean;
  AccessToken?: string;
};

export const userState = atom<UserInfo>({
  key: "userInfo",
  default: {
    id: 0,
    name: "",
    isSignIn: false,
    AccessToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});
