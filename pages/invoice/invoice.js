// pages/invoice/invoice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ivType0:0,
    ivType1:1,
    ivType:0,
    ivCompanyName:'',
    ivgetCompanyTax:'',
    ivgetCompanyPhone:'',
    ivgetCompanyAddress:'',
    ivgetCompanyBane:'',
    ivgetCompanyCode:'',
    ivgetPersonName:'',
    isCompany:true
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //切换radio
  radioChange:function(e){
    console.log(e.detail)
    if(e.detail.value=='个人'){
      this.setData({
        ivType0: 1,
        ivType1:0,
        ivType:1,
        isCompany:false
      })
    }
    else{
      this.setData({
        ivType0: 0,
        ivType1:1,
        ivType:0,
        isCompany:true
      })
    }
  },

  //获取公司抬头
  ivgetCompanyName:function(e){
    this.setData({
      ivCompanyName:e.detail.value
    })
  },

  //公司税号
  ivgetCompanyTax:function(e){
    this.setData({
      ivgetCompanyTax:e.detail.value
    })
  },
  //电话号码
  ivgetCompanyPhone:function(e){
    this.setData({
      ivgetCompanyPhone:e.detail.value
    })
  },
  //单位地址
  ivgetCompanyAddress:function(e){
    this.setData({
      ivgetCompanyAddress:e.detail.value
    })
  },
  //单位开户行
  ivgetCompanyBane:function(e){
    this.setData({
      ivgetCompanyBane:e.detail.value
    })
  },
  //银行账号
  ivgetCompanyCode:function(e){
    this.setData({
      ivgetCompanyCode:e.detail.value
    })
  },
  //个人抬头
  ivgetPersonName:function(e){
    this.setData({
      ivgetPersonName:e.detail.value
    })
  },
  //toast
  showToasts:function(txt){
    wx.showToast({
      title:txt,
      icon: 'none',
      duration: 1000,
      mask: true
    })
  },
  //公司提交
  ivSaveCompany:function(e){
    var ivCompanyName = this.data.ivCompanyName;
    var ivgetCompanyTax = this.data.ivgetCompanyTax;
    var ivgetCompanyPhone = this.data.ivgetCompanyPhone;
    var ivgetCompanyAddress = this.data.ivgetCompanyAddress;
    var ivgetCompanyBane = this.data.ivgetCompanyBane;
    var ivgetCompanyCode = this.data.ivgetCompanyCode;
    if (ivCompanyName.replace(/\s+/g, "").length==0){
      this.showToasts('公司抬头不能为空');
    }
    if (ivgetCompanyTax.replace(/\s+/g, "").length == 0) {
      this.showToasts('公司税号不能为空');
    }
    if (ivgetCompanyPhone.replace(/\s+/g, "").length == 0) {
      this.showToasts('公司号码不能为空');
    }
    if (ivgetCompanyAddress.replace(/\s+/g, "").length == 0) {
      this.showToasts('公司地址不能为空');
    }
    if (ivgetCompanyBane.replace(/\s+/g, "").length == 0) {
      this.showToasts('开户银行不能为空');
    }
    if (ivgetCompanyCode.replace(/\s+/g, "").length == 0) {
      this.showToasts('银行账号不能为空');
    }
    if (ivCompanyName.replace(/\s+/g, "").length != 0 && ivgetCompanyPhone.replace(/\s+/g, "").length != 0 && ivgetCompanyTax.replace(/\s+/g, "").length != 0 && ivgetCompanyAddress.replace(/\s+/g, "").length != 0 && ivgetCompanyBane.replace(/\s+/g, "").length != 0 && ivgetCompanyCode.replace(/\s+/g, "").length!=0){
      wx.showToast({
        title: '提交成功',
        icon:'success'
      })
    }
  },

  //个人提交
  ivSavePerson:function(){
    var ivgetPersonName = this.data.ivgetPersonName;
    if (ivgetPersonName.replace(/\s+/g, "").length == 0) {
      this.showToasts('个人抬头不能为空');
    }
    else{
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })
    }
  }
})