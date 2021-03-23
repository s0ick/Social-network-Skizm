export const updateObjectInArray = (items, itemId, objectPropName, newObjectProps) => {
  return items.map(u => {
    if(u[objectPropName] === itemId) return {...u, ...newObjectProps};
    return u;
  });
};

export const pushPost = (defaultImage, data, method) => {

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async function Main(img) {
    const img_base64 = await toBase64(img);
    await method(img_base64, {...data});
  }
  if(defaultImage) Main(defaultImage);
  else method('', {...data});
};

export const formatDate = (date) => {
  const updDate = new Date(date);

  const fixInteger = (int) => {
    if(int < 10) int = `0${int}`;
    return int;
  };

  const day = updDate.getDate(),
      hours = updDate.getHours(),
      minute = updDate.getMinutes(),
      month = updDate.toDateString().substring(3).replace(/[\s\d]+/g,'');

  return `${day} ${month} ${hours}:${fixInteger(minute)}`;
};

export const uniqueAuthor = (arr) => Array.from(arr.reduce((a, o) => a.set(o.author, o), new Map()).values());
