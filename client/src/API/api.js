import * as Axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/reactive/';

export const UserAPI = {
  // getUsers(currentPage, pageSize) {
  //   return instance
  //     .get(`users?page=${currentPage}&count=${pageSize}`)
  //     .then(response => response.data);
  // }
};

export const FollowedAPI = {
  // followed(id) {
  //   return instance
  //     .post(`follow/${id}`)
  //     .then(response => response.data);
  // },
  // unFollowed(id) {
  //   return instance
  //     .delete(`follow/${id}`)
  //     .then(response => response.data);
  // }
};

export const NewsAPI = {
  getTags(username) {
    const url = `${API_BASE_URL}users/tags/${username}`;
    return Axios
      .get(url)
      .then(response => response.data);
  },

  updateTags(tags, username) {
    const url = `${API_BASE_URL}users/tags/${username}`;
    return Axios
      .put(url, {tags})
      .then(response => response.data);
  }
};

export const ProfileAPI = {
  getProfile(username) {
    const url = `${API_BASE_URL}users/profile/${username}`;
    return Axios
      .get(url)
      .then(response => response.data);
  },

  getAvatarPhoto(username) {
    const url = `${API_BASE_URL}users/get_avatar/${username}`;
    return Axios
      .get(url)
      .then(response => response.data);
  },

  getBackgroundPhoto(username, flag) {
    const url = `${API_BASE_URL}users/get_background${flag}/${username}`;
    return Axios
      .get(url)
      .then(response => response.data);
  },

  updateProfile(data, username) {
    const url = `${API_BASE_URL}users/profile/${username}`;
    return Axios
      .put(url, data)
      .then(response => response.data);
  },

  setPost(photo, textBody, tags, username, avatarURL) {
    const url = `${API_BASE_URL}users/add_post/`;
    return Axios.post(url, {photo, textBody, tags, username, avatarURL});
  },

  setPhoto(photo, username, flag) {
    const url = `${API_BASE_URL}users/add_photos/`;
    return Axios.post(url, {photo, username, flag});
  },

  deletePost(id) {
    const url = `${API_BASE_URL}users/delete_post/${id}`;
    return Axios.delete(url);
  },

  updatePost(id, photo, textBody, tags, username) {
    const url = `${API_BASE_URL}users/update_post/${id}`;
    return Axios
      .put(url, {photo, textBody, tags, username})
      .then(response => response.data)
  }
};

export const AuthAPI = {
  registration(newUser) {
    const url = `${API_BASE_URL}users/registration/`;
    return Axios.post(url, newUser);
  },

  authLogin(username, password) {
    const url = `${API_BASE_URL}users/user_login/`;
    return Axios.post(url, {username, password});
  }
};
