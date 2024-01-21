<template>
  <div class="goods-list">
    <h3 class="box-title">评论管理</h3>
    <div class="box-body">
      <table class="goods">
        <thead>
          <tr>
            <th width="80">用户名</th>
            <th width="100">商品名称</th>
            <th width="100">评论时间</th>
            <th width="80">评价</th>
            <th width="100">回复状态</th>
            <th width="80">状态</th>
            <th width="200">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in date.comments" :key="index">
            <td>
              <span class="sort">{{item.name}}</span>
            </td>
            <td>
              <span class="long">{{item.goodsName}}</span>
            </td>
            <td>
              <span class="sort">{{item.createTime}}</span>
            </td>
            <td v-if="item.score<=5 && item.score >=4">
              <p class="hao-ping">好评</p>
            </td>
            <td v-if="item.score<=3 && item.score >=2">
              <p class="zhong-ping">中评</p>
            </td>
            <td v-if="item.score === 1">
              <p class="cha-ping">差评</p>
            </td>
            <td v-if="item.reply !== null">
            <p class="yi-hui-fu">已回复</p>
            </td>
            <td v-if="item.reply === null">
            <p class="wei-hui-fu">未回复</p>
            </td>
            <td v-if="item.status===1">
              <p class="hao-ping">展示</p>
            </td>
            <td v-if="item.status===0">
              <p class="cha-ping">隐藏</p>
            </td>
            <td>
              <el-button type="primary" @click="openDialog(item)">详细</el-button>
              <el-button type="info" @click="updateCommentStatus(0,item)" v-if="item.status === 1">隐藏</el-button>
              <el-button type="success" @click="updateCommentStatus(1,item)" v-if="item.status === 0">展示</el-button>
              <el-popconfirm
                  confirm-button-text="Yes"
                  cancel-button-text="No"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确认删除该条评论？"
                  @confirm="deleteComment(item.id)"
              >
                <template #reference>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="详细"
      width="30%"
      :close-on-click-modal="false"
  >
    <div class="ivu-modal-body">
      <div class="comment-content">
        <span>评论内容</span>
        <el-input
            v-model="date.comment.content"
            :rows="4"
            type="textarea"
            disabled
            autocomplete="off"
            spellcheck="false"
            placeholder=""
            maxlength="200"
        />
      </div>
      <div class="comment-reply">
        <span>回复内容</span>
        <el-input
            v-model="reply"
            :rows="4"
            type="textarea"
            disabled
            autocomplete="off"
            spellcheck="false"
            placeholder=""
            maxlength="200"
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {getAllComment, updateComment, updateStatus} from "@/api/comment";
import {InfoFilled} from "@element-plus/icons-vue";

const dialogVisible =ref(false)

const date = reactive({
  comments:[],
  comment:{},
})
let reply = ref("");

const openDialog = (comment) => {
  dialogVisible.value = true;
  date.comment = comment;
  reply.value = comment.reply;
}
const deleteComment = (id) => {
  updateComment({id}).then(ref=>{
    if (ref.data.flag){
      ElMessage.success(ref.data.data)
      getAllComments();
    }else{
      ElMessage.error(ref.data.data)
    }
  })
}

const updateCommentStatus = (status,item) => {
  const id = item.id
  updateStatus({status,id}).then(res=>{
    if (res.data.flag){
      ElMessage.success(res.data.data)
      item.status = status
    }else {
      ElMessage.error(res.data.data)
    }
  })
}

const getAllComments = () => {
  getAllComment().then(res=>{
    if (res.data.flag){
      date.comments = res.data.data;
    }else{
      ElMessage.error(res.data.data)
    }
  })
}
onMounted(()=>{
  getAllComments();
})


</script>

<style scoped lang='scss'>
.goods-list{
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  background-color: white;
  .box-title {
    margin-top: 10px;
    font-size: 20px;
    font-weight: normal;
    padding-left: 20px;
    line-height: 48px;
    border-bottom: 1px solid #f5f5f5;
    background-color: white;
  }

  .box-body {
    background-color: white;
    font-size: 14px;
    .goods {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      .info {
        display: flex;
        text-align: left;

        .right {
          line-height: 24px;

          p {
            &:last-child {
              color: #999;
            }
          }
          span{
            padding-right: 10px;
            color: #999;
          }
        }
      }

      tr {
        transition: background-color 0.3s ease;
        th {
          background: #f5f5f5;
          font-weight: normal;
        }

        td,
        th {
          text-align: center;
          border: 1px solid #ededed;
          height: 48px;
          padding: 0 10px;
          font-size: 13px;
          color: #515a6e;
          &:first-child {
            border-left: 1px solid #ededed;
          }

          &:last-child {
            border-right: 1px solid #ededed;
          }
          .sort{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 3px;
            width: 150px;
            display:block;
          }
          .long{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 3px;
            width: 250px;
            display:block;
          }
          .hao-ping{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #69ca39;
            background-color: #f4fcec;
            border: 1px solid #bfeb9d;
          }
          .zhong-ping{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #fa8c16;
            background-color: #fcf5e6;
            border: 1px solid #fcd89e;
          }
          .cha-ping{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #f34049;
            background-color: #fcf0ef;
            border: 1px solid #fcaea9;
          }
          .yi-hui-fu{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #69ca39;
            background-color: #f4fcec;
            border: 1px solid #bfeb9d;
          }
          .wei-hui-fu{
            margin: 0 8px;
            padding: 4px 0;
            border-radius: 4px;
            color: #379dfc;
            background-color: #e6f5fc;
            border: 1px solid #9ed8fc;
          }
          .reply-button{
            padding: 4px 6px;
            border-radius: 2px;
            color: white;
            background-color: #fa6419;

          }
        }
      }
      tr:hover{
        background-color: #ededed;
      }
    }
  }
}
.ivu-modal-body{
  font-size: 12px;
  line-height: 1.5;
  span{
    color: #515a6e;
  }
  .comment-content{
    display: block;
  }
}
</style>