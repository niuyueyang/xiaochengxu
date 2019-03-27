//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    collected: true,
    courseList:[],
    mycollectionList:[],
    collectId:[]
  },
  onLoad: function () {
    
  },
  onShow:function(){
    this.showList();
    this.initCourseList();
  },
  //初始化收藏课程列表
  initCourseList(){
    wx.showLoading({
      title: '正在初始化',
    })
    var userId = wx.getStorageSync('openId');
    var self = this;
    wx.request({
      url: 'https://api.hbwlife.com/user/course/favorite/list.json?t='+new Date().getTime()+'',
      header: {
        "AUTH_TOKEN": wx.getStorageSync('authToken')
      },
      data: {
        "userId": userId,
      },
      method: 'post',
      success: function (data) {
        wx.hideLoading();
        if (data.data.code == 0) {
          var courses = data.data.data.courses;
          var collectId=self.data.collectId;
          for(var i=0;i<courses.length;i++){
            collectId.push({ course_id: courses[i].course_id, expert_id: courses[i].expert_id});
          }
          self.setData({
            mycollectionList: courses,
            collectId: collectId
          })
          self.changeCourseList();
          // wx.showToast({
          //   title: '初始化成功',
          //   icon: 'success',
          //   duration: 2000
          // })
        }
        else{
          // wx.showToast({
          //   title: '初始化失败',
          //   icon: 'success',
          //   duration: 2000
          // })
        }
      }
    })
  },
  //设置课程列表字段
  changeCourseList(){
    var courseList = this.data.courseList;
    var mycollectionList = this.data.mycollectionList;
    console.log(courseList,mycollectionList)
    for(var i=0;i<courseList.length;i++){
      var cId = courseList[i].course_id;
      for(var j=0;j<mycollectionList.length;j++){
        var myId = mycollectionList[j].course_id;
        if(cId==myId){
          courseList[i].collected=true;
        }
      }
    }
    this.setData({
      courseList:courseList
    })
  },
  changePic(e){
    var id = e.currentTarget.dataset.courseid;
    var eId = e.currentTarget.dataset.expertid;
    var courseList = this.data.courseList;
    var collectId = this.data.collectId;
    var userId = wx.getStorageSync('openId');
    var self = this;
    //开始收藏
    this.selCollectIcon(id,eId,userId);
  },
  //改变图标
  selCollectIcon(cId,eId,userId){
    var self=this;
    var collectFlag;
    var courseList = this.data.courseList;
    courseList.forEach((value,i)=>{
      var datacId = courseList[i].course_id;
      var everyCourse = courseList[i];
      if (cId == datacId && typeof (courseList[i].collected) == 'undefined' || cId == datacId && courseList[i].collected == false) {
        wx.request({
          url: 'https://api.hbwlife.com/user/course/favorite/set.json',
          header: {
            "AUTH_TOKEN": wx.getStorageSync('authToken')
          },
          data: {
            "userId": userId,
            'course_id': cId
          },
          method: 'post',
          success: function (data) {
            if (data.data.code == 0) {
              wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
              })
              everyCourse.collected = true;
              self.setData({
                courseList: courseList
              })
            }
            else {
              wx.showToast({
                title: '收藏失败',
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
      }
      else if (cId == datacId && courseList[i].collected == true) {
        wx.request({
          url: 'https://api.hbwlife.com/user/course/favorite/delete.json',
          header: {
            "AUTH_TOKEN": wx.getStorageSync('authToken')
          },
          data: {
            "userId": userId,
            'course_id': cId
          },
          method: 'post',
          success: function (data) {
            if (data.data.code == 0) {
              wx.showToast({
                title: '取消收藏成功',
                icon: 'success',
                duration: 2000
              })
              everyCourse.collected = false;
              self.setData({
                courseList: courseList
              })
            }
            else {
              wx.showToast({
                title: '取消收藏失败',
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  goCourseDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../courseDetail/courseDetail?course_id=' + id + ''
    });
  },
  showList: function () {
    var _this = this
    wx.request({
      url: 'https://api.hbwlife.com/course/list.json',
      header: {
        "AUTH_TOKEN": wx.getStorageSync('authToken')
      },
      data:{
        "expert_id": "",
        "count":10

      },
      method: 'post',
      success: function (data) {
        var _courseList = data.data.data.courses
        console.log(_courseList);
        _this.setData({
          courseList:_courseList
        })
      }
    })
  }


})
