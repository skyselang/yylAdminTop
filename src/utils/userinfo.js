import Cookies from 'js-cookie'
const keyPrefix = 'ya'

const ApiTokenKey = keyPrefix + 'ApiToken'
const getApiToken = function () {
  return Cookies.get(ApiTokenKey)
}
const setApiToken = function (apiToken) {
  return Cookies.set(ApiTokenKey, apiToken)
}
const delApiToken = function () {
  return Cookies.remove(ApiTokenKey)
}

const MemberIdKey = keyPrefix + 'MemberId'
const getMemberId = function () {
  return Cookies.get(MemberIdKey)
}
const setMemberId = function (MemberId) {
  return Cookies.set(MemberIdKey, MemberId)
}
const delMemberId = function () {
  return Cookies.remove(MemberIdKey)
}

const UsernameKey = keyPrefix + 'Username'
const getUsername = function () {
  return Cookies.get(UsernameKey)
}
const setUsername = function (username) {
  return Cookies.set(UsernameKey, username)
}
const delUsername = function () {
  return Cookies.remove(UsernameKey)
}

const NicknameKey = keyPrefix + 'Nickname'
const getNickname = function () {
  return Cookies.get(NicknameKey)
}
const setNickname = function (nickname) {
  return Cookies.set(NicknameKey, nickname)
}
const delNickname = function () {
  return Cookies.remove(NicknameKey)
}

const AvatarKey = keyPrefix + 'Avatar'
const getAvatar = function () {
  return Cookies.get(AvatarKey)
}
const setAvatar = function (avatar) {
  return Cookies.set(AvatarKey, avatar)
}
const delAvatar = function () {
  return Cookies.remove(AvatarKey)
}

const setUserInfo = function (data) {
  Cookies.set(MemberIdKey, data.member_id)
  Cookies.set(UsernameKey, data.username)
  Cookies.set(NicknameKey, data.nickname)
  Cookies.set(AvatarKey, data.avatar_url)
}

const delUserInfo = function () {
  Cookies.remove(MemberIdKey)
  Cookies.remove(UsernameKey)
  Cookies.remove(NicknameKey)
  Cookies.remove(AvatarKey)
}

export {
  getApiToken,
  setApiToken,
  delApiToken,
  getMemberId,
  setMemberId,
  delMemberId,
  getUsername,
  setUsername,
  delUsername,
  getNickname,
  setNickname,
  delNickname,
  getAvatar,
  setAvatar,
  delAvatar,
  setUserInfo,
  delUserInfo
}
