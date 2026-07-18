export interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  created_at: string;
}

export interface Space {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  question: string;
  thank_you_msg: string;
  logo_url: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  space_id: string;
  author_name: string;
  author_email: string;
  author_title: string | null;
  content: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}
