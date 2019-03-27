// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[
      {
        orderId: '111',
        orderName:'生命与健康',
        orderTime:new Date().getTime(),
        orderPrice:300,
        orderExpertName:'张三',
        orderExpertImg:'../../images/defaultImg.png',
        orderStatus:0,
        courseUrl:'http://www.baidu.com'
      },
      {
        orderId: '222',
        orderName: '生命与健康',
        orderTime: new Date().getTime(),
        orderPrice:300,
        orderExpertName: '张三',
        orderExpertImg: '../../images/defaultImg.png',
        orderStatus:0,
        courseUrl: 'http://www.baidu.com'
      },
      {
        orderId: '333',
        orderName: '生命与健康',
        orderTime: new Date().getTime(),
        orderPrice:300,
        orderExpertName: '张三',
        orderExpertImg: '../../images/defaultImg.png',
        orderStatus: 0,
        courseUrl: 'http://www.baidu.com'
      },
      {
        orderId: '444',
        orderName: '生命与健康',
        orderTime: new Date().getTime(),
        orderPrice:300,
        orderExpertName: '张三',
        orderExpertImg: '../../images/defaultImg.png',
        orderStatus: 0,
        courseUrl: 'http://www.baidu.com'
      },
      {
        orderId: '555',
        orderName: '生命与健康',
        orderTime: new Date().getTime(),
        orderPrice:300,
        orderExpertName: '张三',
        orderExpertImg: '../../images/defaultImg.png',
        orderStatus: 0,
        courseUrl: 'http://www.baidu.com'
      }
    ]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.showList();

    wx.showLoading({
      title: '加载中',
    })
    this.showDate();
    wx.hideLoading();
  },

  //重新格式化日期
  showDate:function(){
    var datas=this.data.orderList;
    var arr=[];
    datas.forEach((value,index)=>{
      var timeNow=value.orderTime;
      value.orderTime=this.format(timeNow);
      arr.push(value);
    })
    this.setData({
      orderList:arr
    })
  },

  //随机字符串
  randomWord: function (randomFlag, min, max){
    var str = "",
    range = min,
    arr =['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if(randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for(var i = 0; i<range; i++){
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
      return str;
    },

    //时间戳转换为日期

  add0:function (m){ return m < 10 ? '0' + m : m },
  format:function (shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    },

    //保存


//初始页面数据
showList: function () {
  var _this = this;
  wx.request({
    url: 'https://api.hbwlife.com/user/order/list.json',
    header: {
      "AUTH_TOKEN": wx.getStorageSync('authToken')
    },
    data: {
      // "userId": wx.getStorageSync('openId')
      "userId": "o1Vgg5eqKGWPWeaAp8Ydc9O95_20"
    },
    method: 'post',
    success: function (data) {
      console.log(data.data.data.orders);
      // var _courseList = data.data.data.courses
      // console.log(_courseList);
      // _this.setData({
      //   courseList: _courseList
      // })
    }
  })
}



})