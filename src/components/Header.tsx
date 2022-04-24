import { Header } from "@mantine/core";
import { ThemeIcon, Anchor } from "@mantine/core";
import { MoonOff, Moon } from "tabler-icons-react";
import { useCallback, FC } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/states";
import { useRouter } from "next/router";

type Props = {
  isDark: boolean;
  changeTheme: VoidFunction;
};

export const HeaderComponent: FC<Props> = (props) => {
  const setUserInfo = useSetRecoilState(userState);
  const router = useRouter();

  const signout = useCallback(() => {
    setUserInfo({ id: 0, name: "", isSignIn: false });
    router.push("/signin");
  }, []);

  return (
    <Header height={60}>
      <ThemeIcon
        className="float-right mt-2 mr-4 cursor-pointer"
        variant="outline"
        size="xl"
        color="gray"
        onClick={props.changeTheme}
      >
        {props.isDark ? <Moon /> : <MoonOff />}
      </ThemeIcon>
      <Anchor onClick={signout}>ログアウト</Anchor>
    </Header>
  );
};
