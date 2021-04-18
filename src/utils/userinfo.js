import Cookies from 'js-cookie'

const MemberTokenKey = 'MemberToken'
const getMemberToken = function () {
  return Cookies.get(MemberTokenKey)
}
const setMemberToken = function (memberToken) {
  return Cookies.set(MemberTokenKey, memberToken)
}
const delMemberToken = function () {
  return Cookies.remove(MemberTokenKey)
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

const AvatarKey = 'Avatar'
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
  Cookies.set(MemberTokenKey, data.member_token)
  Cookies.set(MemberIdKey, data.member_id)
  Cookies.set(UsernameKey, data.username)
  Cookies.set(NicknameKey, data.nickname)
  Cookies.set(AvatarKey, data.avatar)
}

const delUserInfo = function () {
  Cookies.remove(MemberTokenKey)
  Cookies.remove(MemberIdKey)
  Cookies.remove(UsernameKey)
  Cookies.remove(NicknameKey)
  Cookies.remove(AvatarKey)
}

export {
  getMemberToken,
  setMemberToken,
  delMemberToken,
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
