import Cookies from 'js-cookie'

const TokenKey = 'UserToken'
const getToken = function () {
  return Cookies.get(TokenKey)
}
const setToken = function (token) {
  return Cookies.set(TokenKey, token)
}
const delToken = function () {
  return Cookies.remove(TokenKey)
}

const UserIdKey = 'UserId'
const getUserId = function () {
  return Cookies.get(UserIdKey)
}
const setUserId = function (UserId) {
  return Cookies.set(UserIdKey, UserId)
}
const delUserId = function () {
  return Cookies.remove(UserIdKey)
}

const NicknameKey = 'Nickname'
const getNickname = function () {
  return Cookies.get(NicknameKey)
}
const setNickname = function (nickname) {
  return Cookies.set(NicknameKey, nickname)
}
const delNickname = function () {
  return Cookies.remove(NicknameKey)
}

const UsernameKey = 'Username'
const getUsername = function () {
  return Cookies.get(UsernameKey)
}
const setUsername = function (username) {
  return Cookies.set(UsernameKey, username)
}
const delUsername = function () {
  return Cookies.remove(UsernameKey)
}

const AvatarKey = 'Avatar'
const getAvatar = function () {
  return Cookies.get(AvatarKey)
}
const setAvatar = function (username) {
  return Cookies.set(AvatarKey, username)
}
const delAvatar = function () {
  return Cookies.remove(AvatarKey)
}

const setUserInfo = function (data) {
  Cookies.set(TokenKey, data.user_token)
  Cookies.set(UserIdKey, data.user_id)
  Cookies.set(NicknameKey, data.nickname)
  Cookies.set(UsernameKey, data.username)
  Cookies.set(AvatarKey, data.avatar)
}

const delUserInfo = function () {
  Cookies.remove(TokenKey)
  Cookies.remove(UserIdKey)
  Cookies.remove(NicknameKey)
  Cookies.remove(UsernameKey)
  Cookies.remove(AvatarKey)
}

export {
  getToken,
  setToken,
  delToken,
  getUserId,
  setUserId,
  delUserId,
  getNickname,
  setNickname,
  delNickname,
  getUsername,
  setUsername,
  delUsername,
  getAvatar,
  setAvatar,
  delAvatar,
  setUserInfo,
  delUserInfo
}
