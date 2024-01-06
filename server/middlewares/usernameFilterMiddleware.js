const usernameFilterMiddleware = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const hasInappropriateWord = name.some((word) =>
    name.toLowerCase().includes(word.toLowerCase())
  );

  if (hasInappropriateWord) {
    return res.status(403).json({ error: "name contains inappropriate words" });
  }

  next();
};
export { usernameFilterMiddleware };
