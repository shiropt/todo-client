import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { HeaderComponent } from "../components/Header";
import { useState } from "react";
import { RecoilRoot } from "recoil";
function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, changeTheme] = useState(false);
  const colorScheme = isDark ? "dark" : "light";

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <RecoilRoot>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <HeaderComponent
            isDark={isDark}
            changeTheme={() => changeTheme(!isDark)}
          />
          <Component {...pageProps} />
        </MantineProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
