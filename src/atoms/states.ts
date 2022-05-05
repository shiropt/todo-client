import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
type UserInfo = {
  id: number;
  name: string;
  isSignIn: boolean;
  AccessToken?: string;
};

const userState = atom<UserInfo>({
  key: "userState",
  default: {
    id: 0,
    name: "",
    isSignIn: false,
    AccessToken: "",
  },
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export const useUser = () => {
  const userInfo = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);

  return { userInfo, setUserInfo };
};
