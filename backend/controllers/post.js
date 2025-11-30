export const getPosts = (req, res) => {
  res.json([
    { id: 1, title: "First post" },
    { id: 2, title: "Second post" }
  ]);
};
