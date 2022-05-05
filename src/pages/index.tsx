/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { API } from "../utils/path";
import { PostModel } from "../models/post";
import { useSWRConfig } from "swr";
import { useFetchers } from "../hooks/useFetcher";
import { useRouter } from "next/router";
import {
  LoadingOverlay,
  Button,
  Input,
  InputWrapper,
  Container,
  List,
  ThemeIcon,
  Text,
  Box,
} from "@mantine/core";
import {
  CircleCheck,
  CircleDashed,
  Trash,
  CircleRectangleOff,
  Checkbox,
} from "tabler-icons-react";
import { useUser } from "../atoms/states";

type State = {
  title: string;
  posts: PostModel[];
  completed: boolean;
};

const Home: NextPage = () => {
  const router = useRouter();
  const { useFetch, postData, deleteData } = useFetchers();
  const { userInfo } = useUser();
  const [state, setState] = useState<State>({
    title: "",
    posts: [],
    completed: false,
  });
  const {
    data: posts,
    error,
    isLoading,
  } = useFetch<PostModel[]>(API.post, true);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!userInfo.isSignIn) {
      router.replace("/signin");
    }
  }, []);

  const fetchData = useCallback(async () => {
    mutate(API.post);
    setState({ ...state, title: "" });
  }, [state]);

  const register = useCallback(async () => {
    if (!state.title) return;
    await postData<PostModel, Pick<PostModel, "title">>(API.post, {
      title: state.title,
    });
    fetchData();
  }, [state.title]);

  const deletePost = useCallback(
    async (id?: number) => {
      if (!id) return;
      await deleteData(`${API.post}/${id}`);
      fetchData();
    },
    [state.posts]
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <LoadingOverlay visible />;
  if (!posts) return <div>投稿はありません</div>;

  return (
    <Container className=" p-12">
      <Container className="flex pb-10 border-b">
        <InputWrapper id="input-demo" label="Todo" size="xl">
          <Input
            value={state.title}
            className="w-96"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setState({ ...state, title: e.target.value })
            }
          />
        </InputWrapper>
        <Button className="mt-9 ml-4" onClick={register}>
          send
        </Button>
      </Container>
      <List spacing="xs" withPadding={true} size="xl" center className=" mt-8">
        {[...posts].reverse().map((post) => (
          <List.Item
            icon={
              false ? (
                <ThemeIcon color="green" size={24} radius="xl">
                  <CircleCheck size={16} />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="blue" size={24} radius="xl">
                  <CircleDashed size={16} />
                </ThemeIcon>
              )
            }
            key={post.id}
          >
            <Box className="flex">
              <Text className="w-40">{post.title}</Text>
              <Trash onClick={() => deletePost(post.id)} />
            </Box>
          </List.Item>
        ))}
      </List>
    </Container>
  );
};

export default Home;
