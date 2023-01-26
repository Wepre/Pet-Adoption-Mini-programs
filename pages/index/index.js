//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    list: [{content:"1111",image:['https://img1.baidu.com/it/u=1237125161,1598336109&fm=253&fmt=auto&app=138&f=JPEG?w=1280&h=333']}],
    page: 1,
    isLoadMore: true,
    isLoadFinish: false,
    search:''
  },

  onLoad: function () {
   
    setTimeout(function()
    {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
  },
  
onPullDownRefresh(){
  wx.showNavigationBarLoading()
  wx.stopPullDownRefresh({
    success: (res) => {},
  })
},


  //文章列表
  getArticleList: function () {
      wx.showLoading({
        title: '正在加载数据',
      })
    wx.cloud.callFunction({
      name:'getlist',
      data:{

      }
    }).then(res=>{
      console.log(res)
      
      this.setData({
        list:res.result.data
      })
      wx.hideLoading({
        success: (res) => {},
      })
    })
  },
  addData(list){
    db.collection("article").add({

      data: {
        data: list.data,
        cover: list.cover,
        title: list.title,
        summary: list.summary,
        content: list.content
      },
    })
  },
  tosearch(e){
    wx.navigateTo({
      url: '/pages/search/search?search=' + this.data.search,
    })
  },
  input(e){
    this.setData({
      search:e.detail.value
    })
    
  },
  //跳转详情页
  onItemClick: function (e) {
    console.log(e)
    
    var id=e.currentTarget.dataset.index._id
    //跳转页面
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })

  },
  //滚动到底部触发事件  
  onLoadMore: function () {
    var self = this;

    if (self.data.isLoadMore && !self.data.isLoadFinish) {
      self.setData({
        page: self.data.page + 1,  //每次触发上拉事件，把 page + 1  
      });
      self.getArticleList();
    }

  },
  onShow(){
      this.getArticleList()
  }
})
