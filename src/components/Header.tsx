import { Header } from "@mantine/core";
import { ThemeIcon, Anchor, Box } from "@mantine/core";
import { MoonOff, Moon } from "tabler-icons-react";
import { useCallback, FC } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/states";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

type Props = {
  isDark: boolean;
  changeTheme: VoidFunction;
};

export const HeaderComponent: FC<Props> = (props) => {
  const setUserInfo = useSetRecoilState(userState);
  const router = useRouter();
  const [userInfo] = useRecoilState(userState);

  const signout = useCallback(() => {
    setUserInfo({ id: 0, name: "", isSignIn: false });
    router.push("/signin");
  }, []);

  return (
    <Header height={60}>
      <Box className="float-right mr-4 mt-2">
        {userInfo.isSignIn ? (
          <Anchor className="p-6" onClick={signout}>
            ログアウト
          </Anchor>
        ) : null}
        <ThemeIcon
          className="cursor-pointer"
          variant="outline"
          size="xl"
          color="gray"
          onClick={props.changeTheme}
        >
          {props.isDark ? <Moon /> : <MoonOff />}
        </ThemeIcon>
      </Box>
    </Header>
  );
};
