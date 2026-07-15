type StoryCategory = {
  _id: string;
  category: string;
};

export type Story = {
  _id: string;
  title: string;
  img: string;
  article: string;
  rate: number;
  date: string;
  category: string | StoryCategory;
};