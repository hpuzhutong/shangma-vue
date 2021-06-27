<template>
  <div class="role-wrapper" style="margin: 0px 20px 0px 10px">
    <!--  搜索区域-->
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="职位名称">
          <el-input v-model="searchForm.roleName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-date-picker size="mini"
                        v-model="choseDate"
                        @change="choseDateChange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
        </el-date-picker>
        <el-form-item style="margin-left: 10px">
          <el-button type="primary" @click="searchUser">查询</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--          操作区域-->
    <div class="exec-box" style="margin: 10px 0px 10px 0px ">
      <el-button-group>
        <el-button size="mini" type="success" @click=addBtnClick>新建</el-button>
        <el-button size="mini" type="success">导入Excel</el-button>
        <el-button size="mini" type="warning">导出Excel</el-button>
      </el-button-group>
      <el-popconfirm
          style="margin: 2px 0px 0px 5px"
          confirm-button-text='确定'
          cancel-button-text='不用了'
          icon="el-icon-info"
          icon-color="red"
          title="确定删除这么多项吗？"
          @confirm="batchDel"
      >
        <el-button type="danger"></el-button>
        <el-button slot="reference" type="danger" size="mini" :disabled="selectIds.length<=0">批量删除</el-button>
      </el-popconfirm>
    </div>

    <!--      数据表格-->
    <el-scrollbar>
      <el-table
          @selection-change="selectChange"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            align="center"
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            align="center"
            label="id"
            width="100px"
            prop="id">
        </el-table-column>
        <el-table-column
            align="center"
            label="职位名称"
            prop="roleName">
        </el-table-column>
        <el-table-column
            align="center"
            label="职位描述"
            prop="roleDesc">
        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
          <template v-slot="obj">
            <!--修改按钮-->
            <el-button type="primary" size="mini" @click=findById(obj.row.id) >修改</el-button>
            <el-popconfirm
                style="margin-left: 5px"
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="delById(obj.row.id)"
            >
              <!--删除按钮-->
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!--      分页区域-->
      <div class="pageHelper-box" style="margin: 20px ;text-align: center">
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="pageChange"
            :page-size="searchForm.pageSize"
            :current-page="searchForm.currentPage"
            :total="total">
        </el-pagination>
      </div>
    </el-scrollbar>

    <!--    上传表单-->
    <el-dialog
        title="职位操作"
        :visible.sync="createDialog"
        width="30%">
      <!--      内容-->
      <el-form ref="form" :rules="rules" :model="formData" size="mini" label-width="80px">
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model="formData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="职位描述" prop="roleDesc">
          <el-input type="textarea" v-model="formData.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialog = false,cancel()" size="mini">取 消</el-button>
        <el-button type="primary" @click="createDialog = false,addOrEditBtn()" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>

<style long="scss">
/*<!--直接src引入报错-->*/
@import "index.scss";
</style>