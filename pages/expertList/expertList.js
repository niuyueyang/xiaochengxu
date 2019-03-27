// pages/expertList/expertList.js
Page({
  data: {
    collected: false,
    expertList:[],        //全部的列表
    ExpertCollected:[],   //已被收藏的列表
    initReady:false        //确定是否开始循环
  },
  onLaunch:function(){
    
  },
  onShow: function () {
    this.showList();
    //this.initExpertCollect();
    this.ExpertCollected()
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
  },
  goExpertCourse(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../expertCourse/expertCourse?id='+id
    });
  },
  changePic(e) {
    this.setData({
      collected: true
    })
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
  },
  showList:function(){
    var _this = this
    wx.request({
      url: 'https://api.hbwlife.com/expert/list.json',
      header: {
        "AUTH_TOKEN": wx.getStorageSync('authToken')
      },
      method: 'post',
      success: function (data) {
        //console.log(data);
        var _expertList = data.data.data.experts;
        
        _this.setData({
          expertList: _expertList
        });
        //初始化收藏
        _this.initExpertCollect()
      }
    })
  },
  //初始的时候，收藏与否,全部的；列表
  initExpertCollect:function(){
    var initReady = this.data.initReady;
    var _expertList = this.data.expertList;
    var _ExpertCollected = this.data.ExpertCollected;
    if(initReady==true){
      for (var i = 0; i < _expertList.length;i++){
        for (var k = 0; k < _ExpertCollected.length; k++) {
          if (_expertList[i].expert_id == _ExpertCollected[k].expert_id){
            _expertList[i].collected = true
          }

        }
      }
      this.setData({
        expertList: _expertList
      })
    }
  },
//被收藏的列表
  ExpertCollected:function(){
    var _this = this;
    wx.request({
      url: 'https://api.hbwlife.com/user/expert/favorite/list.json?t=' + new Date().getTime() + '',
      header: {
        "AUTH_TOKEN": wx.getStorageSync('authToken')
      },
      data: {
        "userId": wx.getStorageSync('openId'),
      },
      method: 'post',
      success: function (data) {
        console.log(data)
        var ExpertCollected = data.data.data.experts;
        _this.setData({
          ExpertCollected: ExpertCollected,
          initReady:true
        },function(){
          _this.initExpertCollect()
        })
        
      }
    })
  },
  //封装request
  requests:function(url,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: url,
        header: {
          "AUTH_TOKEN": wx.getStorageSync('authToken')
        },
        data: data,
        method: 'post',
        success: function (data) {
          resolve(data)
        },
        fail:function(data){
          resolve(err)
        }
      })
    })
  },

  //操作收藏与取消收藏
  changePic(e){
    var expertId = e.currentTarget.dataset.expertid;
    var checks
    //开始收藏
    var datas = this.requests('https://api.hbwlife.com/user/expert/favorite/set.json',{
      "userId": wx.getStorageSync('openId'),
      "expert_id": expertId
    }).then((res)=>{
      var datas=res.data;
      console.log(datas)
    })
  }


})

  