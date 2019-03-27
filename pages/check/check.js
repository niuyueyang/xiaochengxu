// pages/check/check.js
const app = getApp()
Page({
  bindGetUserInfo(e){
    wx.login({
      success: function (ress) {
        wx.request({
          url: 'https://api.hbwlife.com/v1/wx/checkIn.json',
          method: 'post',
          data: {
            iv: e.detail.iv,
            userCode: ress.code,
            encryptedData: e.detail.encryptedData
          },
          success: function (data) {
            wx.setStorageSync('authToken', data.data.data.authToken);
            wx.setStorageSync('openId', data.data.data.openId);
            wx.setStorageSync('isLogin', 'haveLogin');
            wx.switchTab({
              url: '../home/home',
            })
          },
        })
      }
    })
  }
})