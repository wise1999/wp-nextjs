export interface GenericResponse {
  status: string;
  message: string;
}

export interface PostType {
  id: number;
  date: string;
  title: {
    rendered: string
  };
  content: {
    rendered: string
  };
  excerpt: {
    rendered: string
  };
}