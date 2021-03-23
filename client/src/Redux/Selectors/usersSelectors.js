import { createSelector } from "reselect";

const getUsersPrimitive = (state) => {
  return state.UsersPage.users;
};
export const getUsers = createSelector(getUsersPrimitive, (users) => {
  return users.filter(u => true);
});

const getPageSizePrimitive  = (state) => {
  return state.UsersPage.pageSize;
};
export const getPageSize = createSelector(getPageSizePrimitive, (pageSize) => {
  return pageSize;
});


const getTotalUsersCountPrimitive  = (state) => {
  return state.UsersPage.totalUsersCount;
};
export const getTotalUsersCount = createSelector(getTotalUsersCountPrimitive, (totalUsersCount) => {
  return totalUsersCount;
});


const getCurrentPagePrimitive  = (state) => {
  return state.UsersPage.currentPage;
};
export const getCurrentPage = createSelector(getCurrentPagePrimitive, (currentPage) => {
  return currentPage;
});


const getIsFetchingPrimitive  = (state) => {
  return state.UsersPage.isFetching;
};
export const getIsFetching = createSelector(getIsFetchingPrimitive, (isFetching) => {
  return isFetching;
});


const getIsLoadingPrimitive  = (state) => {
  return state.UsersPage.isLoading;
};
export const getIsLoading = createSelector(getIsLoadingPrimitive, (isLoading) => {
  return isLoading;
});