export const getYtVidId = (ytLink: string) => {
  const urlParams = new URLSearchParams(ytLink.split("?")[1]);
  const videoId = urlParams.get("v");

  return videoId;
};
