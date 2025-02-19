export default interface Topic {
  _id: string;
  name: string;
  slug: string;
  description: string;
  totalPosts: number;
  createdAt: string;
  updatedAt: string;
}

export interface InitialTopicState {
  isLoading: boolean;
  topics: Topic[];
}
