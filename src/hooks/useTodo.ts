/* eslint-disable react-hooks/exhaustive-deps */
import { useSWRConfig } from "swr";
import { useCallback, useState } from "react";
import { PostModel } from "../models/post";
import { useFetchers } from "../hooks/useFetcher";
import { API } from "../utils/path";

type State = {
  title: string;
  posts: PostModel[];
  completed: boolean;
};

export const useTodo = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { useFetch, postData, deleteData } = useFetchers();
  const { data, error, isLoading } = useFetch<PostModel[]>(
    API.post,
    shouldFetch
  );
  const { mutate } = useSWRConfig();

  const [state, setState] = useState<State>({
    title: "",
    posts: [],
    completed: false,
  });

  const fetchData = useCallback(async () => {
    mutate(API.post);
    setState({ ...state, title: "" });
  }, [state]);

  const postTodo = useCallback(async () => {
    if (!state.title) return;
    await postData<PostModel, Pick<PostModel, "title">>(API.post, {
      title: state.title,
    });
    fetchData();
  }, [state.title]);

  const deleteTodo = useCallback(
    async (id?: number) => {
      if (!id) return;
      await deleteData(`${API.post}/${id}`);
      fetchData();
    },
    [state.posts]
  );

  return {
    state,
    data,
    error,
    isLoading,
    postTodo,
    deleteTodo,
    setState,
    setShouldFetch,
  };
};
