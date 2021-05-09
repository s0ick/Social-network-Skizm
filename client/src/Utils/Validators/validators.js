export const required = (value) => {
  if(value) if(typeof value === 'object' || value.trim()) return undefined;
  return "Field is required";
};

export const maxLengthAC = (maxLength) => (value) => {
  if(value.length >= maxLength) return `Max length ${maxLength} symbols`;
  return undefined;
};

export const formats = (value) => {
  let ACCEPT_IMAGE = /\.(gif|jpe?g|png)$/i;
  let ext;
  if(value) ext = value.type.split('/')[1];
  if(ACCEPT_IMAGE.test(ext)) {
    return undefined;
  } else return 'Only .gif, .png, .jp(e)g'; 
};

export const tagsIsValid = (value) => {
  let error1 = '',
      error2 = '',
      error3 = '';

  const pattern = /[^a-zA-Z0-9а-яА-ЯёЁ]+/g;  

  if(value) {
    let array = value.replace(/\s+/g, ' ').trim().split(' ');

    array.forEach(elem => {
      if(elem[0] !== '#') {
        error1 = `Not # (${elem})`;
      }

      if(!elem[1]) {
        error2 = `Empty tag`;
      }

      if(elem.substring(1) !== elem.substring(1).replace(pattern, '')) {
        error3 = 'Only letters and numbers';
      }
    });

  }
  if(error1) return error1
  else if(error2) return error2
  else if(error3) return error3
  else return undefined;
};