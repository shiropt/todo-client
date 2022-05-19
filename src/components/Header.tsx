/* eslint-disable react-hooks/exhaustive-deps */
import { Header } from "@mantine/core";
import { ThemeIcon, Anchor, Box } from "@mantine/core";
import { MoonOff, Moon } from "tabler-icons-react";
import { useCallback, FC } from "react";
import { useUser } from "../atoms/states";
import { useRouter } from "next/router";

type Props = {
  isDark: boolean;
  changeTheme: VoidFunction;
};

export const HeaderComponent: FC<Props> = (props) => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUser();

  const signout = useCallback(() => {
    setUserInfo({ id: 0, name: "", isSignIn: false });
    router.push("/signin");
  }, []);

  return (
    <Header height={60}>
      <Box className="float-right mr-4 mt-2">
        {
          <Anchor className="p-6" onClick={signout}>
            ログアウト
          </Anchor>
        }
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
