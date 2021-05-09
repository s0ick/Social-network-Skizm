import * as Axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/reactive/';

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

  setPhoto(photo, username, flag) {
    const url = `${API_BASE_URL}users/add_photos/`;
    return Axios.post(url, {photo, username, flag});
  },
};



export const PostAPI = {
  setPost(photo, textBody, tags, username) {
    const url = `${API_BASE_URL}users/add_post/`;
    return Axios.post(url, {photo, textBody, tags, username});
  },

  deletePost(id) {
    const url = `${API_BASE_URL}users/delete_post/${id}`;
    return Axios.delete(url);
  },

  updatePost(id, photo, textBody, tags, username) {
    const url = `${API_BASE_URL}users/update_post/${id}`;
    return Axios
      .put(url, {photo, textBody, tags, username})
      .then(response => response.data);
  },

  likePost(id, username) {
    const url = `${API_BASE_URL}users/like_post/${id}`;
    return Axios
      .put(url, {username})
      .then(response => response.data);
  },

  commentPost(id, username, comment) {
    const url = `${API_BASE_URL}users/add_comment_post_on_id/${id}`;
    return Axios
      .post(url, {username, comment})
      .then(response => response);
  }
};



export const TimerAPI = {
  getTimer(username) {
    const url = `${API_BASE_URL}users/get_tomato/${username}`;
    return Axios
      .get(url)
      .then(response => response);
  },

  updatePomodoro(username, valueOnline, valueOffline, blocked, lockUpDate) {
    const url = `${API_BASE_URL}users/update_tomato/${username}`;
    return Axios
      .put(url, {valueOnline, valueOffline, blocked, lockUpDate})
      .then(response => response);
  },

  updateRestTime(username, restOnline) {
    const url = `${API_BASE_URL}users/update_rest_of_time/${username}`;
    return Axios
      .put(url,  {username, restOnline})
      .then(response => response);
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



export const TodoAPI = {
  createTask(username, task) {
    const url = `${API_BASE_URL}users/add_task/`;
    return Axios.post(url, {username, message: task.message});
  },

  getTasks(username) {
    const url = `${API_BASE_URL}users/todo/${username}`;
    return Axios
      .get(url)
      .then(response => response);
  },

  deleteTask(id) {
    const url = `${API_BASE_URL}users/delete_task/${id}`;
    return Axios.delete(url);
  },

  updateTask(username, id, task) {
    const url = `${API_BASE_URL}users/todo/${username}`;
    return Axios
      .put(url, {id, ...task})
      .then(response => response);
  }
};
