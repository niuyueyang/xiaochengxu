// pages/courseDetail/courseDetail.js
Page({
  data: {
    course_id:"",
    cdPlayImg:'./../../images/cd-play.png',
    cdPauseImg:'./../../images/cd-pause.png',
    flag:true,
    modalHidden: true,
    restartPlan:[],
    // restartPlan:[
    //   {
    //     date:'2019-03-12',
    //     time:'15:00-18:00'
    //   }
    // ],
    tabHeader:0,
    tabLine:'translate3d(0,0,0)',
    tabContent: 'translate3d(0,0,0)',
    tabHeight:0,
    tabContentId:'#cd-tabExpirse',
    restartHeight:'105rpx',
    cdLliveTxtHeight:0,
    cdLiveTimeHeight:0,
    showCourseData:{},
    showExpertData:{},
    dataId:'cdDown'
  },
  /** 显示弹窗*/
  buttonTap: function () {
    this.setData({
      modalHidden: false
    })
  },

  /*** 点击取消*/
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /***  点击确认*/
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.setData({
      course_id: options.course_id
    })
    console.log(options.id);
  },

  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    this.ctx = wx.createLivePlayerContext('player')
  },
  onLoad:function(options){
    console.log(options)
    //获取改页面url参数的course_id，课程id
    this.setData({
      course_id: options.course_id
    })
  },
  /*** 生命周期函数--监听页面显示*/
  onShow: function () {
    //初始页面的数据
    this.showCourseData();
    this.ininTab();
    this.restartPlay();
    this.tabHeight();
  },
  //初始化tab高度
  tabHeight(){
    var self = this;
    var id = this.data.tabContentId;
    var query = wx.createSelectorQuery();
    query.select(id).boundingClientRect(function (rect) { 
      self.setData({
        tabHeight:rect.height+30
      })
    }).exec();
  },

  //播放
  bindPlay(){
    var flag=this.data.flag;
    this.ctx.play({
      success: res => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          flag:!flag
        })
      },
      fail:res=>{
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 2000
        })
        this.setData({
          flag: !flag
        })
      }
    })
  },

  //暂停
  bindPause(e){
    var flag = this.data.flag;
    this.ctx.pause({
        success:res=>{
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            flag: !flag
          })
        },
        fail:res=>{
          console.log(e.target)
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 2000
          })
          this.setData({
            flag: !flag
          })
        }
    })
  },

  //切换
  statechange(e){
    wx.showToast({
      title: e.detail.code,
      icon: 'fail',
      duration: 2000
    })
    console.log('live-player code:', e.detail.code)
  },

  //兄弟元素
  siblingElems(elem) {
    var nodes = [];
    var _elem = elem;
    while ((elem = elem.previousSibling)) {
      if (elem.nodeType == 1) {
        nodes.push(elem);
      }
    }
    var elem = _elem;
    while ((elem = elem.nextSibling)) {
      if (elem.nodeType == 1) {
        nodes.push(elem);
      }
    }
    return nodes;
  },

  addClass(element, newName) {
    if (!element || !newName) {
      return false;
    }
    if (element.className) {
      var oldClass = element.className;
      element.className = oldClass + ' ' + newName
    } else {
      element.className = newName;
    }
    return true;
  },

  //移除class
  removeClass(element, className) {
    if (!element || !className) {
      return false;
    }
    if (!element.className) {
      return false;
    }
    var allNames = element.className.split(" ");
    for (var i = 0; i < allNames.length; i++) {
      if (allNames[i] === className) {
        allNames.splice(i, 1);
        element.className = "";
        for (var j = 0; j < allNames.length; j++) {
          element.className += " ";
          element.className += allNames[j];
        }
        return true;
      }
    }
  },

  //查看是否拥有某一个class，cls是class类名
  hasClass(element, cls) {
    var result = element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    if (result) {
      return true;
    }
    return false;
  },

  //css
  css(element, obj) {
    if (arguments.length == 2) {
      for (var item in obj) {
        element.style[item] = obj[item]
      }
    } else {
      return false;
    }
  },

  //改变重播计划高度
  changeRestartHeight(e){
    var dataId=this.data.dataId;
    if (dataId =='cdDown'){
      var self = this;
      var query = wx.createSelectorQuery();
      var id0 = '#cd-liveTxt';
      var id1 = '#cd-liveTime';
      query.select(id0).boundingClientRect(function (rect) {
        self.setData({
          cdLliveTxtHeight: rect.height,
          dataId:'cdUp'
        })
      }).exec();
      query.select(id1).boundingClientRect(function (rect) {
        self.setData({
          cdLliveTimeHeight: rect.height
        },function(){
          self.setData({
            restartHeight: self.data.cdLliveTxtHeight + self.data.cdLliveTimeHeight +20+ 'px',
          })
        })
      }).exec();
    }
    else if (dataId == 'cdUp'){
      this.setData({
        restartHeight: '105rpx',
        dataId: 'cdDown'
      })
    }
  },

  //切换
  cdTabHeader(e){
    var self = this;
    var query = wx.createSelectorQuery();
    this.setData({
      tab: e.currentTarget.dataset.item
    },function(){
      if(this.data.tab==0){
        self.setData({
          tabLine: 'translate3d(0,0,0)',
          tabContent: 'translate3d(0,0,0)',
          tabContentId: "#cd-tabExpirse"
        })
        var id = this.data.tabContentId;
        query.select(id).boundingClientRect(function (rect) {
          self.setData({
            tabHeight: rect.height+30
          })
        }).exec();
      }
      else{
        self.setData({
          tabLine: 'translate3d(100%,0,0)',
          tabContent: 'translate3d(-50%,0,0)',
          tabContentId:"#cd-tabCourse"
        })
        var id = this.data.tabContentId;
        query.select(id).boundingClientRect(function (rect) {
          self.setData({
            tabHeight: rect.height+30
          })
        }).exec();
      }
    })
  },
  showCourseData: function () {
    var _this = this;

    wx.request({
      url: 'https://api.hbwlife.com/course/info.json',
      header: {
        "AUTH_TOKEN": wx.getStorageSync('authToken')
      },
      data: {
        "course_id": this.data.course_id
      },
      method: 'post',
      success: function (data) {
        console.log(data)
        var _showCourseData = data.data.data
        console.log(_showCourseData);
        var expert_id = _showCourseData.expert_id
        console.log(expert_id);

        _this.setData({
          showCourseData: _showCourseData
        })
        //根据专家id 获取专家的expert_id
        wx.request({
          url: 'https://api.hbwlife.com/expert/info.json',
          header: {
            "AUTH_TOKEN": wx.getStorageSync('authToken')
          },
          data: {
            "expert_id": _this.data.showCourseData.expert_id,
          },
          method: 'post',
          success: function (data) {
            var _showExpertData = data.data.data
            console.log(_showExpertData);
            _this.setData({
              showExpertData: _showExpertData
            })
            _this.ininTab();
          }
        })

      }
    })
  },
  // 重播計劃
  restartPlay: function () {
    var _this = this;
    wx.request({
      url: 'https://api.hbwlife.com/course/show/list.json',
      header: {
        "AUTH_TOKEN": wx.getStorageSync('authToken')
      },
      data: {
        "course_id": this.data.course_id
      },
      method: 'post',
      success: function (data) {
        console.log(data);
        var _restartPlan = data.data.data.shows
        
        _this.setData({
          restartPlan: _restartPlan
        })
      }
    })
  },
  //初始化tab高度
  ininTab(){
    var id = '#cd-tabExpirse';
    var self=this;
    var query = wx.createSelectorQuery();
    query.select(id).boundingClientRect(function (rect) {
      console.log(rect.height)
      self.setData({
        tabHeight: rect.height + 30
      })
    }).exec();
  }
  

})