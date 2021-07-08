<template>
  <div class="brand-wrapper" style="margin: 0px 20px 0px 10px">
    <!--  搜索区域-->
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="品牌名称">
          <el-input v-model="searchForm.brandName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述">
          <el-input v-model="searchForm.brandDesc" placeholder="请输入品牌描述"></el-input>
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
        <a class="el-button el-button--warning el-button--mini" style="color: #FFFFFF;text-decoration: none"
           href="http://localhost:9999/brand/exportExcel">导出Excel</a>
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

      </el-button-group>
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
            label="品牌名称"
            prop="brandName">
        </el-table-column>
        <el-table-column
            align="center"
            label="品牌照片">
          <template v-slot="obj">
            <img :src="obj.row.brandLogo" width="120px" height="40px"/>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="品牌网址">
          <template v-slot="obj">
            <el-link type="primary" target="_blank" :href="obj.row.brandSite">{{ obj.row.brandSite }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="品牌描述"
            prop="brandDesc">
        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
          <template v-slot="obj">
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" circle @click=findById(obj.row.id) ></el-button>
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
              <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button>
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
        title="品牌操作"
        :visible.sync="createDialog"
        width="30%">
      <!--      内容-->
      <el-form ref="form" :rules="rules" :model="formData" size="mini" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="品牌名称" prop="brandName">
              <el-input v-model="formData.brandName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌网址" prop="brandSite">
              <el-input v-model="formData.brandSite"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="品牌图标" prop="brandLogo">
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :http-request="choseImg"
                  :show-file-list="false">
                <img v-if="formData.brandLogo" :src="formData.brandLogo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌描述" prop="brandDesc">
              <el-input type="textarea" v-model="formData.brandDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialog = false" size="mini">取 消</el-button>
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