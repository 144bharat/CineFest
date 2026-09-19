import { geminiModel } from "./firebase";

export const searchMoviesWithAI = async (userQuery) => {
  const prompt = `
You are a movie recommendation assistant.

The user searched for:
"${userQuery}"

Suggest exactly 5 movie titles that best match the user's request.

Rules:
- Return exactly 5 movie titles.
- Return only the movie titles.
- Do not include explanations.
- Do not include numbering.
- Do not include markdown.
`;

  const result = await geminiModel.generateContent(prompt);

  const response = result.response.text();

  return response
    .split("\n")
    .map((movie) => movie.trim())
    .filter(Boolean)
    .slice(0, 5);
};