Page({
  data: {
    selected1: true,
    selected2: false,
    "ctCourse": [
      {
        "id": 1,
        "ctImgs": "../../images/defaultImg1.png",
        "ctTxts": [{
          "courseName": "健康保障课程",
          "teacherName": "赵理想",
          "time": "近期推出"
        }]
      },
      {
        "id": 2,
        "ctImgs": "../../images/defaultImg2.png",
        "ctTxts": [{
          "courseName": "中医养生课程",
          "teacherName": "李某某",
          "time": "近期推出"
        }]
      },
      {
        "id": 3,
        "ctImgs": "../../images/defaultImg3.png",
        "ctTxts": [{
          "courseName": "食品安全课程",
          "teacherName": "徐某某",
          "time": "2019年5月2日"
        }]
      }
    ],
    "ctExpert": [
      {
        "id": 1,
        "ctImgs": "../../images/defaultImg1.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "健康保障课程",
          "time": "近期推出"
        }]
      },
      {
        "id": 2,
        "ctImgs": "../../images/defaultImg2.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "中医养生课程",
          "time": "2019-4-15"
        }]
      },
      {
        "id": 3,
        "ctImgs": "../../images/defaultImg3.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "食品安全课程",
          "time": "近期推出"
        }]
      },
      {
        "id": 1,
        "ctImgs": "../../images/defaultImg1.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "健康保障课程",
          "time": "近期推出"
        }]
      },
      {
        "id": 2,
        "ctImgs": "../../images/defaultImg2.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "中医养生课程",
          "time": "2019-4-15"
        }]
      },
      {
        "id": 3,
        "ctImgs": "../../images/defaultImg3.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "食品安全课程",
          "time": "近期推出"
        }]
      },
      {
        "id": 1,
        "ctImgs": "../../images/defaultImg1.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "健康保障课程",
          "time": "近期推出"
        }]
      },
      {
        "id": 2,
        "ctImgs": "../../images/defaultImg2.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "中医养生课程",
          "time": "2019-4-15"
        }]
      },
      {
        "id": 3,
        "ctImgs": "../../images/defaultImg3.png",
        "ctTxts": [{
          "teacherName": "李教授",
          "courseName": "食品安全课程",
          "time": "近期推出"
        }]
      }
    ]
  },
  selected1: function (e) {
    this.setData({
      selected2: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected1: false,
      selected2: true
    })
  },
  goCourseDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../courseDetail/courseDetail?id=' + id + ''
    });
  }



})