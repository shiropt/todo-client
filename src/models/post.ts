export type PostModel = {
  id?: number;
  title: string;
  content?: string | null;
  published?: boolean | null;
  authorId?: number | null;
};
