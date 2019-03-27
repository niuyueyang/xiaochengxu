//logs.js
const util = require('../../utils/util.js')
var app=getApp();
Page({
  data: {
    userInfo:'',
    myloginBtn:'block',
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId: wx.getStorageSync('openId')
  },
  onLoad: function () {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
      console.log(this.data.userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        var uses = this.data.userInfo
        console.log(wx.getStorageSync('openId'))
      }
    }
  },
  onShow:function(){
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
  },
  //获取用户信息
  bindGetUserInfo(e){
    app.globalData.userInfo = e.detail.userInfo;
    var self=this;
    wx.login({
      success:function(ress){
        wx.request({
          url: 'https://api.hbwlife.com/v1/wx/checkIn.json',
          method:'post',
          data: {
            iv: e.detail.iv,
            userCode: ress.code,
            encryptedData: e.detail.encryptedData
          },
          success: function (data) {
            self.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: true,
              openId:data.data.openId
            })
            wx.setStorageSync('openId', data.data.openId)
          },
        })
      }
    })
  }

})
