<template>
  <div class="main">
    <div class="content">
      <div class="list-part">
        <div class="shop-info">
          <img :src="'http://localhost:8081/img/'+useStore().user.avatar" class="shopkeeper-avatar">
          <div class="shop-name">
            {{useStore().user.uname}}
          </div>
        </div>
        <div class="chat-list">
          <span>对话记录({{data.contacts.length}})</span>
          <div class="list-li"
               v-for="(item,index) in data.contacts"
               :key="index"
               :class="{ 'selected': selectedIndex === item }"
               @click="selectItem(item)">
            <div class="user-avatar">
              <img :src="'http://localhost:8081/img/'+item.avatar">
            </div>
            <div class="list-li-content">
              <div class="title">
                <p class="user-name">{{ item.name }}</p>
                <p class="new-time">{{ item.time }}</p>
              </div>
              <div class="new-message">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block" v-if="selectedIndex===null">
        <img src="http://localhost:8081/img/chat.dec6e35a.png">
      </div>
      <div class="interface" v-if="selectedIndex!==null">
        <div class="chat-content">
          <div class="name">
            <p>{{ selectedIndex.name }}</p>
          </div>
          <div class="message-body">
            <div class="message-list" ref="messageList">
              <div class="message-li" v-for="(item,index) in data.chatMessage" :key="index">
                <div class="send-time">{{ item.sendTime }}</div>
                <div class="message-content-left" v-if="item.sendId===selectedIndex.id">
                  <img :src="'http://localhost:8081/img/'+selectedIndex.avatar" class="send-avatar">
                  <div class="send-message">
                    <pre>{{ item.content }}</pre>
                  </div>
                </div>
                <div class="message-content-right" v-if="item.sendId!==selectedIndex.id">
                  <div class="send-message" >
                    <pre v-if="item.type === 1">{{ item.content }}</pre>
                    <div class="goods" v-if="item.type === 2" @click="goto(JSON.parse(item.content).id)">
                      <img :src="'http://localhost:8081/img/'+JSON.parse(item.content).images[0]">
                      <span>{{JSON.parse(item.content).name}}</span>
                    </div>
                  </div>
                  <img :src="'http://localhost:8081/img/'+useStore().user.avatar" class="send-avatar">
                </div>
              </div>
            </div>
          </div>
          <div class="function">
            <div class="emoticon">
              <img src="http://localhost:8081/img/表情.png">
            </div>
          </div>
          <div class="input-box">
            <textarea class="input-text"
                      rows="6"
                      placeholder="你想要聊点什么呢 ..."
                      v-model="data.inputText"
                      @keydown.enter="handleEnter"></textarea>
          </div>
        </div><!--聊天内容-->
        <div class="order-part">
          <div class="title">
            <p>店家宝贝</p>
          </div>
          <div class="no-order" v-if="data.goods.length===0">暂无宝贝信息</div>
          <div class="order-list" v-if="data.goods.length!==0">
            <div class="goods-li" v-for="goods in data.goods" :key="goods.id">
              <div class="goods-main">
                <div class="img-wrapper">
                  <img :src="'http://localhost:8081/img/'+goods.images[0]">
                </div>
                <div class="info-wrapper">
                  <span class="title">{{ goods.name }}</span>
                  <span class="price-value"><em>¥</em>{{ goods.price }}</span>
                </div>
              </div>
              <div class="send-button">
                <el-button type="success" @click="sendGoods(goods)">发送</el-button>
              </div>
            </div>
          </div>
        </div><!--商家宝贝-->
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "@/stores/user";
import {nextTick, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {addChatMessage, addShopChat, getChatMessage, getChatter, getUserChatter} from "@/api/chat";
import {ElMessage} from "element-plus";
import {useRoute} from "vue-router";
import {getById} from "@/api/goods";
import {goodsStore} from "@/stores/Goods";
import router from "@/router";

const messageList = ref(null);
const route = useRoute()
const data = reactive({
  contacts:[],/*联系人*/
  chatMessage:[],/*聊天数据*/
  goods:[],/*商家的宝贝*/
  inputText:'',
})
const selectedIndex = ref(null);

const selectItem = (shop) => {
  if(selectedIndex.value!==shop){
    selectedIndex.value = shop;
    const shopId = shop.id
    const userId = useStore().user.id;
    getChatMessage({userId,shopId}).then(res=>{
      if (res.data.flag){
        data.chatMessage = res.data.data.chatMessage;
        data.goods = res.data.data.goodsList;
        nextTick(scrollToBottom);
      }else {
        ElMessage.error(res.data.data)
      }
    })
  }
};



const getContacts = (userId) => {
  const shopId = route.params.shopId
  getUserChatter({userId,shopId}).then(res=>{
    if(res.data.flag){
      data.contacts = res.data.data;
    }else{
      ElMessage.error(res.data.data);
    }
  })
}

const handleEnter = (event) => {
  if (event.keyCode === 13) {
    //1.首先是这条消息发到后端存数据库
    const sendId = useStore().user.id
    const receiveId = selectedIndex.value.id
    const content = data.inputText;
    const newChatMessage = {
      sendId : useStore().user.id,
      receiveId : selectedIndex.value.id,
      content : data.inputText,
      type: 1,
      sendTime:new Date().toLocaleString(),
    }/*新的聊天数据*/
    addChatMessage(newChatMessage).then(res=>{
      if(res.data.flag){
        data.chatMessage.push(newChatMessage);
        selectedIndex.value.content = newChatMessage.content
        selectedIndex.value.time = newChatMessage.sendTime
        nextTick(scrollToBottom);
      }
    })
    //2.最后将输入框清零，并且阻止浏览器默认的换行操作
    data.inputText = '';
    event.preventDefault(); // 阻止浏览器默认换行操作
    return false;
  }
}


const sendGoods = (goods) => {
  //1.首先是这条消息发到后端存数据库
  const sendId = useStore().user.id
  const receiveId = selectedIndex.value.id
  const content = data.inputText;
  const newChatMessage = {
    sendId : useStore().user.id,
    receiveId : selectedIndex.value.id,
    content : goods.id,
    type: 2,
    sendTime:new Date().toLocaleString(),
  }/*新的聊天数据*/
  addChatMessage(newChatMessage).then(res=>{
    if(res.data.flag){
      newChatMessage.content = JSON.stringify(goods);
      data.chatMessage.push(newChatMessage);
      selectedIndex.value.content = '[商品信息]'
      selectedIndex.value.time = newChatMessage.sendTime
      nextTick(scrollToBottom);
    }
  })
}


const goto = (id) => {
  getById({id}).then(ref=>{
    console.log("商品请求")
    if(ref.data.flag){
      goodsStore().goods=ref.data.data.goods
      goodsStore().shop=ref.data.data.shop
      window.open("/home/goods/"+id);
    }else{
      ElMessage({ type: "error", message: ref.data.data})
    }
  })
}
const scrollToBottom = () => {
  if (messageList.value) {
    messageList.value.scrollTop = messageList.value.scrollHeight;
  }
};/*这个是将聊天记录列表置于最底下*/
const initWebSocket = () => {
  // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
  const userId = useStore().user.id;
  const websock = new WebSocket("ws://localhost:8081/websocket/"+useStore().user.id);
  websock.onopen = websocketonopen;
  websock.send = websocketsend;
  websock.onerror = websocketonerror;
  websock.onmessage = websocketonmessage;
  websock.onclose = websocketclose;
  console.log("ws已建立连接")
};

const websocketonopen = () => {
  console.log("WebSocket连接成功");
};

const websocketonerror = (e) => {
  console.log("WebSocket连接发生错误");
};

const websocketsend = (e) => {
  console.log("WebSocket连接发生错误");
};

// 接收后端消息
// vue 客户端根据返回的cmd类型处理不同的业务响应
const websocketonmessage = (e) => {
  const date = eval("(" + e.data + ")");
  // 处理订阅信息
  if (date.cmd === "newChat") {
    // TODO 新的聊天
  } else if (date.cmd === "user") {
    // TODO 用户消息
    const newChatMessage = JSON.parse(date.msgTxt)
    if(selectedIndex.value.id===newChatMessage.sendId){
      data.chatMessage.push(newChatMessage);
      if(newChatMessage.type===2){
        selectedIndex.value.content = "[商品信息]"
      }else{
        selectedIndex.value.content = newChatMessage.content
      }
      selectedIndex.value.time = newChatMessage.sendTime
      nextTick(scrollToBottom);
    }else{
      data.contacts.forEach(item=>{
        if (item.id === newChatMessage.sendId){
          item.time = newChatMessage.sendTime
        }
      })
    }
  }
};

// 关闭连接时调用
const websocketclose = (e) => {
  console.log("connection closed (" + e.code + ")");
};


onBeforeUnmount(() => {
  // 离开页面生命周期函数
  websocketclose();
});
onMounted(()=>{
  const userId = useStore().user.id;
  getContacts(userId);//这是得到已经聊天了的
  // 初始化websocket
  initWebSocket();
})
</script>

<style scoped lang='scss'>
.main{
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content{
    width: 1200px;
    height: 85%;
    background-color: white;
    display: flex;
    .list-part{
      width: 320px;
      border: 1.5px solid rgb(245, 238, 238);
      .shop-info{
        display: flex;
        align-items: center;
        height: 10%;
        border-bottom: 1.5px solid rgb(245, 238, 238);
        .shopkeeper-avatar{
          margin: 12px 10px 12px 12px;
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
        .shop-name{
          font-size: 17px;
        }
      }
      .chat-list{
        height: 90%;
        display: flex;
        flex-direction: column;
        overflow-y: auto; /* 启用垂直滚动条 */

        span{
          font-size: 12px;
          font-weight: 600;
          color: #1f2329;
          margin: 9px;
        }
        .list-li{
          padding: 8px 10px;
          height: 66px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-left: 3px solid transparent;
          transition: .2s ease-in;
          .user-avatar{
            height: 35px;
            width: 35px;
            flex-shrink: 0;
            background-color: #508afe;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #fff;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            transition: 1s ease;
            position: relative;
            overflow: hidden;
          }
          .list-li-content{
            height: 40px;
            display: flex;
            align-content: center;
            flex-direction: column;
            flex: 1 1;
            margin-left: 10px;
            overflow: hidden;
            .title{
              width: 100%;
              height: 20px;
              display: flex;
              align-items: center;
              .user-name{
                color: #1f2329;
                font-size: 14px;
                line-height: 20px;
                flex: 1 1;
                display: flex;
                align-items: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis; /* 使用省略号(...)表示被隐藏的文本 */
              }
              .new-time{
                color: #8f959e;
                font-size: 12px;
                margin-left: 10px;
              }
            }
            .new-message{
              font-size: 12px;
              color: #8f959e;
            }
          }
        }
        .list-li:hover{
          background-color: rgb(239, 240, 241);
        }
        .selected {
          /* 添加选中元素的样式 */
          background-color: rgb(239, 240, 241);
          border-left: 2.5px solid rgb(51, 112, 255);
        }
      }
      /* 修改滚动条的样式 */
      .chat-list::-webkit-scrollbar {
        width: 2px; /* 宽度 */
      }
      /* 滚动条轨道 */
      .chat-list::-webkit-scrollbar-track {
        background: #f1f1f1; /* 滚动条轨道颜色 */
      }
      /* 滚动条滑块 */
      .chat-list::-webkit-scrollbar-thumb {
        background: rgb(186, 186, 186); /* 滑块颜色 */
        border-radius: 6px; /* 滑块圆角 */
      }
      /* 滚动条滑块悬停状态 */
      .chat-list::-webkit-scrollbar-thumb:hover {
        background: rgb(135, 135, 135); /* 滑块悬停时颜色 */
        cursor: pointer;
      }
    }
    .block{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 880px;
      height: 100%;
      img{
        width: 300px;
        height: 300px;
      }
    }
    .interface{
      width: 880px;
      height: 100%;
      display: flex;
      .chat-content{
        width: 518px;
        display: flex;
        flex-direction: column;
        .name{
          height: 10%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 20px;
          border-bottom: 1px solid rgb(245, 238, 238);
          border-right: 1px solid rgb(245, 238, 238);
        }
        .message-body{
          position: relative;
          height: 65%;
          border-bottom: 1px solid rgb(245, 238, 238);
          border-right: 1px solid rgb(245, 238, 238);
          .message-list{
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            padding: 10px 15px 30px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            .message-li{
              display: flex;
              flex-direction: column;
              .send-time{
                padding: 10px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgb(167, 160, 160);
              }
              .message-content-left{
                display: flex;
                margin-bottom: 10px;
                .send-avatar{
                  width: 45px;
                  height: 45px;
                  border-radius: 5px;
                }
                .send-message{
                  display: flex;
                  align-items: center;
                  min-width: 30px;
                  min-height: 30px;
                  border-radius: 5px;
                  padding: 5px;
                  margin-left: 10px;
                  background-color: rgb(208, 233, 255);
                  color: black;
                  pre{
                    white-space: pre-wrap;
                    overflow: hidden;
                    word-break: break-word;
                    word-wrap: break-word;
                    font-size: 15px;
                    padding: 3px 10px;
                    font-family: Microsoft YaHei;
                    margin: 0;
                  }
                }
              }
              .message-content-right{
                display: flex;
                justify-content: flex-end; /* 将右侧消息调整到右侧 */
                margin-bottom: 10px;
                .send-avatar{
                  width: 45px;
                  height: 45px;
                  border-radius: 5px;
                }
                .send-message{
                  display: flex;
                  align-items: center;
                  min-width: 30px;
                  min-height: 30px;
                  border-radius: 5px;
                  padding: 5px;
                  margin-right: 10px;
                  background-color: #95ec69;
                  color: black;
                  pre{
                    white-space: pre-wrap;
                    overflow: hidden;
                    word-break: break-word;
                    word-wrap: break-word;
                    font-size: 15px;
                    padding: 3px 10px;
                    font-family: Microsoft YaHei;
                    margin: 0;
                  }
                  .goods{
                    display: flex;
                    height: 80px;
                    width: 260px;
                    img{
                      width: 58px;
                      height: 58px;
                      margin: auto 10px;
                      border-radius: 5px;
                    }
                    span{
                      display: flex;
                      align-items: center;
                      color: #999999;
                      width: 180px;
                    }
                  }
                }
              }
            }
          }
          .message-list::-webkit-scrollbar {
            width: 2px; /* 宽度 */
          }
          /* 滚动条轨道 */
          .message-list::-webkit-scrollbar-track {
            background: #f1f1f1; /* 滚动条轨道颜色 */
          }
          /* 滚动条滑块 */
          .message-list::-webkit-scrollbar-thumb {
            background: rgb(186, 186, 186); /* 滑块颜色 */
            border-radius: 6px; /* 滑块圆角 */
          }
          /* 滚动条滑块悬停状态 */
          .message-list::-webkit-scrollbar-thumb:hover {
            background: rgb(135, 135, 135); /* 滑块悬停时颜色 */
            cursor: pointer;
          }
        }
        .function{
          height: 6%;
          display: flex;
          border-bottom: 1px solid rgb(245, 238, 238);
          border-right: 1px solid rgb(245, 238, 238);
          .emoticon{
            height: 100%;
            margin-left: 5px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            img{
              width: 18px;
            }
          }
          .emoticon:hover{
            background-color: rgb(247, 245, 245);
          }
        }
        .input-box{
          height: 19%;
          border-bottom: 1px solid rgb(245, 238, 238);
          border-right: 1px solid rgb(245, 238, 238);
          .input-text{
            width: calc(100% - 10px);
            width: 90%;
            height: calc(100% - 10px);
            height: 90%;
            border: 0 none;
            outline: none;
            resize: none;
            font-size: 15px;
            overflow-y: auto;
            color: #464545;
            padding: 5px;
            position: relative;
          }
          .input-text::-webkit-scrollbar {
            width: 2px; /* 宽度 */
          }
          /* 滚动条轨道 */
          .input-text::-webkit-scrollbar-track {
            background: #e7e7e7; /* 滚动条轨道颜色 */
          }
          /* 滚动条滑块 */
          .input-text::-webkit-scrollbar-thumb {
            background: rgb(186, 186, 186); /* 滑块颜色 */
            border-radius: 6px; /* 滑块圆角 */
          }
          /* 滚动条滑块悬停状态 */
          .input-text::-webkit-scrollbar-thumb:hover {
            background: rgb(135, 135, 135); /* 滑块悬停时颜色 */
            cursor: pointer;
          }
        }
      }
      .order-part{
        width: 360px;
        display: flex;
        flex-direction: column;
        .title{
          height: 10%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgb(245, 238, 238);
          p{
            color: #47a2ff;
          }
        }
        .no-order{
          font-size: 12px;
          color: #999;
          text-align: center;
          margin-top: 20px;
        }
        .order-list{
          height: 90%;
          display: flex;
          flex-direction: column;
          overflow-y: auto; /* 启用垂直滚动条 */
          .goods-li{
            display: flex;
            border-radius: 5px;
            width: 340px;
            height: 100px;
            margin: 10px 10px;
            padding: 0 10px;
            transition: background-color 0.3s ease;
            background-color: white;
            .goods-main{
              display: flex;
              width: 260px;
              .img-wrapper{
                img{
                  height: 80px;
                  width: 80px;
                  border-radius: 3px;
                  margin: 10px;
                }
              }
              .info-wrapper{
                display: flex;
                flex-direction: column;
                margin:auto 0;
                .title{
                  display: inline-block;
                  width: 150px;
                  max-height: 46px;
                  margin-bottom: 10px;
                  overflow: hidden;
                  color: #333;
                  font-size: 16px;
                  line-height: 23px;
                  border: none;
                }
                .price-value{
                  display: inline-block;
                  font-size: 22px;
                  line-height: 22px;
                  margin-top: 10px;
                  color: #ff5000;
                }
              }
            }
            .send-button{
              display: flex;
              align-items: center;
            }
          }
          .goods-li:hover{
            background-color: #f7f9fa;
          }
        }
        .order-list::-webkit-scrollbar {
          width: 2px; /* 宽度 */
        }
        /* 滚动条轨道 */
        .order-list::-webkit-scrollbar-track {
          background: #e7e7e7; /* 滚动条轨道颜色 */
        }
        /* 滚动条滑块 */
        .order-list::-webkit-scrollbar-thumb {
          background: rgb(186, 186, 186); /* 滑块颜色 */
          border-radius: 6px; /* 滑块圆角 */
        }
        /* 滚动条滑块悬停状态 */
        .order-list::-webkit-scrollbar-thumb:hover {
          background: rgb(135, 135, 135); /* 滑块悬停时颜色 */
          cursor: pointer;
        }
      }
    }
  }
}
</style>