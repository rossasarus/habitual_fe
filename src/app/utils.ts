export function isLocalStorageAvailable() {
  const test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export const getJWTFromLocalStorage = async (): Promise<string | undefined> => {
  const jwt = isLocalStorageAvailable()
    ? localStorage.getItem("access_jwt")
    : null;
  console.log("JWT", { jwt });
  if (jwt === null) {
    console.log("no jwt in localstorage");
    return undefined;
  }
  console.log("jwt found in localstorage");
  return jwt;
};

export const logoutUser = () => {
  localStorage.removeItem("access_jwt");
  localStorage.removeItem("refresh_jwt");
};
