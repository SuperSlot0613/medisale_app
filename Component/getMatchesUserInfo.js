const getMathchedUserInfo = (user, userLoggedIn) => {
  const newUsers = { ...user };
  delete newUsers[userLoggedIn];

  const [id, users] = Object.entries(newUsers).flat();

  return { id, ...users };
};

export default getMathchedUserInfo;
