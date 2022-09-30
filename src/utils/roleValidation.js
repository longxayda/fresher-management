const validateRoleName = (roleName) => {
  const numChar = 5;
  let regex = /^[a-zA-Z0-9\s]+$/;
  let res = {
    status: true,
    mess: "",
  };
  if (roleName.length < numChar) {
    res.status = false;
    res.mess = `Username must have least ${numChar} characters!`;
  } else if (!regex.test(roleName)) {
    res.status = false;
    res.mess = "Only letters and numbers";
  }
  return res;
};

export { validateRoleName };
