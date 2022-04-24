/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { API } from "../utils/path";
import { PostModel } from "../models/post";
import { useSWRConfig } from "swr";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/states";
import { useFetchers } from "../hooks/useFetcher";
import { useRouter } from "next/router";
import { LoadingOverlay } from "@mantine/core";

type State = {
  title: string;
  posts: PostModel[];
};

const Home: NextPage = () => {
  const router = useRouter();
  const { useFetch, postData, deleteData } = useFetchers();
  const [userInfo] = useRecoilState(userState);
  const [state, setState] = useState<State>({ title: "", posts: [] });
  const {
    data: posts,
    error,
    isLoading,
  } = useFetch<PostModel[]>(API.post, userInfo.isSignIn);
  const { mutate } = useSWRConfig();
  const [visible, setVisible] = useState(false);

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
    <div className=" p-12">
      <input
        type="text"
        className="m-4 outline"
        value={state.title}
        onChange={(e) => setState({ ...state, title: e.target.value })}
      />
      <button className="p-1 outline active:opacity-70" onClick={register}>
        send
      </button>
      {posts.map((post) => (
        <li key={post.id} className="ml-4 w-48 flex justify-between">
          <p>{post.title}</p>

          <p onClick={() => deletePost(post.id)}>削除</p>
        </li>
      ))}
    </div>
  );
};

export default Home;
