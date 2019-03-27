//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    courseList:[],
    id:''
  },
  onShow: function () {
    this.showList();
  },
 
  goCourseDetail(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../courseDetail/courseDetail?course_id=' + id + ''
    });
  },
  onLoad: function (options) {
    console.log(options)
    //获取改页面url参数的id，专家id
     this.setData({
       id:options.id
     })
  },
  goVip(e) {
    wx.navigateTo({
      url: '../vip/vip'
    });
  },
  showList: function () {
    var _this = this;
    wx.request({
      url: 'https://api.hbwlife.com/course/list.json',
      header: {
        "AUTH_TOKEN": wx.getStorageSync('authToken')
      },
      data: {
        "expert_id": this.data.id,
        "count": 10
      },
      method: 'post',
      success: function (data) {
        var _courseList = data.data.data.courses
        console.log(_courseList);
        _this.setData({
          courseList: _courseList
        })
      }
    })
  }
})
