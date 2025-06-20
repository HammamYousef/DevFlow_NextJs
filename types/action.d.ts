interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    name: string;
    email: string;
    profileImage: string;
  };
}

interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}

interface editQuestionParams extends CreateQuestionParams {
  questionId: string;
}

interface getQuestionParams {
  questionId: string;
}
