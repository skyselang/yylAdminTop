import Cookies from 'js-cookie'

const TokenKey = 'MemberToken'
const getToken = function () {
  return Cookies.get(TokenKey)
}
const setToken = function (token) {
  return Cookies.set(TokenKey, token)
}
const delToken = function () {
  return Cookies.remove(TokenKey)
}

const MemberIdKey = 'MemberId'
const getMemberId = function () {
  return Cookies.get(MemberIdKey)
}
const setMemberId = function (MemberId) {
  return Cookies.set(MemberIdKey, MemberId)
}
const delMemberId = function () {
  return Cookies.remove(MemberIdKey)
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
  Cookies.set(TokenKey, data.token)
  Cookies.set(MemberIdKey, data.member_id)
  Cookies.set(NicknameKey, data.nickname)
  Cookies.set(UsernameKey, data.username)
  Cookies.set(AvatarKey, data.avatar)
}

const delUserInfo = function () {
  Cookies.remove(TokenKey)
  Cookies.remove(MemberIdKey)
  Cookies.remove(NicknameKey)
  Cookies.remove(UsernameKey)
  Cookies.remove(AvatarKey)
}

export {
  getToken,
  setToken,
  delToken,
  getMemberId,
  setMemberId,
  delMemberId,
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
