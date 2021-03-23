import profileReducer, { addPost, deletePost, setUserProfile, setStatus } from "../Reducer/profileReducer";

const state = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likeCount: 12},
    {id: 2, message: "It's my first posts It's my first posts It's my first posts It's my first posts It's my first posts It's my first posts It's my first posts", likeCount: 19}
  ],
  profile: null,
  status: ''
};

const Obj = {
  aboutMe: null,
  contacts: {
    facebook: null,
    github: null,
    instagram: null,
    mainLink: null,
    twitter: null,
    vk: null,
    website: null,
    youtube: null
  },
  fullName: "s0ick",
  lookingForAJob: false,
  lookingForAJobDescription: null,
  photos: {small: null, large: null},
  userId: 9562
}

test('Length of post should be incremented', () => {
  // 1. Start data
  const action = addPost('Reactive Network');
  // 2. Action
  let newState = profileReducer(state, action);
  // 3. Expectation
  expect(newState.posts.length).toBe(3);
});

test('Message of new post should be correct', () => {
  // 1. Start data
  const action = addPost('Reactive Network');
  // 2. Action
  let newState = profileReducer(state, action);
  // 3. Expectation
  expect(newState.posts[2].message).toBe('Reactive Network');
});

test('After deleting length of message should be decrement', () => {
  // 1. Start data
  const action = deletePost(1);
  // 2. Action
  let newState = profileReducer(state, action);
  // 3. Expectation
  expect(newState.posts.length).toBe(1);
});

test("After deleting length shouldn't be decrement if id is incorrect", () => {
  // 1. Start data
  const action = deletePost(1000);
  // 2. Action
  let newState = profileReducer(state, action);
  // 3. Expectation
  expect(newState.posts.length).toBe(2);
});

test('Profile data should be successfully added', () => {
  // 1. Start data
  const action = setUserProfile(Obj);
  // 2. Action
  let newState = profileReducer(state, action);
  // 3. Expectation
  expect(newState.profile).toMatchObject(Obj);
});
test('Update status in profile', () => {
  // 1. Start data
  const action = setStatus('Hello, i am new user!');
  // 2. Action
  let newState = profileReducer(state, action);
  // 3. Expectation
  expect(newState.status).toBe('Hello, i am new user!');
});

