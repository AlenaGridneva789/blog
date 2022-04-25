export const toLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data.user));
};
export const toLocalStorageArt = (data) => {
  localStorage.setItem('fullarticle', JSON.stringify(data.article))
}