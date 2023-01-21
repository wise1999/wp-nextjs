export interface GenericResponse {
  status: string;
  message: string;
}

export interface PostType {
  id: number;
  slug: string;
  date: string;
  featured_image: {
    url: string;
    alt: string;
  };
  title: {
    rendered: string
  };
  content: {
    rendered: string
  };
  excerpt: {
    rendered: string
  };
  author: string;
}