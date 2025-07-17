export const getYtVidId = (ytLink: string) => {
  const urlParams = new URLSearchParams(ytLink.split("?")[1]);
  return urlParams.get("v");
};
