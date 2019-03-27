//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners: [
      {
        id: 1,
        img: '../../images/banner1.jpg',
        name: 'banner1'
      },
      {
        id: 2,
        img: '../../images/banner2.jpg',
        name: 'banner2'
      },
      {
        id: 3,
        img: '../../images/banner3.jpg',
        name: 'banner3'
      }
    ],
    autoplay: true,//是否自动切换  
    indicatorDots: true,//是否显示圆点  
    interval: 5000,//自动切换间隔  
    duration: 500, //滑动动画时长  
    indicatorColor: "#676a6d",//滑动圆点颜色  
    indicatorActiveColor: "#0ac167", //当前圆点颜色  
    current: 0, //当前所在页面的 index  
    circular: true,  //是否采用衔接滑动  
    authToken:'',
    loginFlag:app.globalData.loginFlag,
    //其中只可放置<swiper-item/>组件，否则会导致未定义的行为。 
    curImgUrls: [
      { url: '../../images/curImg1.jpg', txt: '健康保障课堂' },
      { url: '../../images/curImg2.jpg', txt: '中医养生课堂' },
      { url: '../../images/curImg5.jpg', txt: '食品安全课堂' },
      { url: '../../images/curImg4.jpg', txt: '健康保障课堂' },
      { url: '../../images/curImg1.jpg', txt: '健康保障课堂' },
      { url: '../../images/curImg2.jpg', txt: '健康保障课堂' } 
    ],
    historyJson: [
      { id: 1, url: '../../images/curImg5.jpg', txt1: '健康保障课堂', txt2: '健康保障课堂', txt3: '视频讲堂将在今年四月份播出'},
      { id: 2, url: '../../images/curImg1.jpg', txt1: '健康保障课堂', txt2: '健康保障', txt3: '每个月将在所有会员内进行抽奖'},
      { id: 3, url: '../../images/curImg2.jpg', txt1: '健康保障课堂', txt2: '健康保障课堂',txt3: '健康保障课堂'},
      { id: 4, url: '../../images/curImg4.jpg', txt1: '健康保障课堂', txt2: '每位专家每年推出十二期讲座',txt3: '健康保障课堂'},
      { id: 5, url: '../../images/curImg1.jpg', txt1: '健康保障课堂', txt2: '健康保障课堂',txt3: '健康保障课堂'},
      { id: 6, url: '../../images/curImg2.jpg', txt1: '健康保障课堂', txt2: '健康保障课堂',txt3: '健康保障课堂'}
    ]
  },
  swiperClick: function (e) {//点击图片触发事件
    var swiperId = this.data.banners[e.target.dataset.id].id;
    wx.showModal({
      title: '提示',
      content: '您点击了第 “' + swiperId + '” 页面',
      showCancel: false
    });
  },
  onShow(){
    this.checkToken();
  },
  init(){
    var self=this;
    var obj={};
    wx.login({
      success:function(res){
        var data1=function(){
          return new Promise((resolve, reject) => {
            wx.request({
              url: 'https://api.hbwlife.com/v1/wx/auth.json',
              data: { userCode: res.code},
              method: 'post',
              header: null,
              success: function (data) {
                wx.setStorageSync('authToken', data.data.data.authToken)
                wx.setStorageSync('openId', data.data.data.openId)
                resolve(data)
              },
              fail: function (data) {
                resolve(data)
              }
            })
          })
        }
        var data2 = function (data1) {
          return new Promise((resolve, reject) => {
            wx.request({
              url: 'https://api.hbwlife.com/course/showing.json',
              data: { count: 1000 },
              method: 'post',
              header: { "AUTH_TOKEN": data1.data.data.authToken },
              success: function (data) {
                var _showListData = data.data.data.courses;
                self.setData({
                  curImgUrls: _showListData
                })
                data.data.data.authToken = data1.data.data.authToken
                resolve(data)
              },
              fail: function (data) {
                resolve(data)
              }
            })
          })
        }
        var data3 = function (data1) {
          console.log(data1)
          return new Promise((resolve, reject) => {
            wx.request({
              url: 'https://api.hbwlife.com/course/shown.json',
              data: { count: 1000 },
              method: 'post',
              header: { "AUTH_TOKEN":data1.data.data.authToken},
              success: function (data) {
                var _showListData = data.data.data.courses;
                self.setData({
                  historyJson: _showListData
                })
                  //resolve(data)
              },
              fail: function (data) {
                //resolve(data)
              }
            })
          })
        }
        // var data1=self.requests('https://api.hbwlife.com/v1/wx/auth.json', null, {
        //   userCode: res.code,
        // })
        // var data2 = self.requests('https://api.hbwlife.com/course/shown.json', null, {
        //   count: 1000,
        // })
          self.reduce([data1, data2,data3])

      }
    })
    
  },
  reduce(arr) {
    var sequence = Promise.resolve()
    arr.forEach(function (item) {
      sequence = sequence.then(item)
    })
    return sequence
  },

  //检查是否有token
  checkToken(){
    var isLogin=wx.getStorageSync('isLogin');
    console.log(111)
    if (isLogin =='noLogin'){
      wx.navigateTo({
        url: '../check/check',
      })
    }
    else if (isLogin == 'haveLogin'){
      this.init();
    }
  },


})


