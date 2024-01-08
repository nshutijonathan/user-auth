export const checkUserName = (req, res, next) => {
  let errorMessage = "Invalid name input";
  let { name } = req.body;
  let nums = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "(",
    ")",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "-",
    "+",
  ];
  if (!name.length > 0) {
    return res.status(400).json({
      message: errorMessage,
    });
  }
  if (typeof name !== "string") {
    return res.status(400).json({
      message: errorMessage,
    });
  }
  if (name[0] !== name[0].toUpperCase()) {
    console.log("name[0]", name[0]);
    console.log("name[0].toUpperCase(", name[0].toUpperCase());
    return res.status(400).json({
      message: errorMessage,
    });
  }
  if (name.length > 10) {
    return res.status(400).json({
      message: errorMessage,
    });
  }
  for (let i = 0; i < name.length; i++) {
    if (nums.includes(name[i])) {
      return res.status(400).json({
        message: errorMessage,
      });
    }
  }
  next();
};
