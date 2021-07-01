<template>
  <div class="brand-wrapper" style="margin: 0px 20px 0px 10px">
    <!--  搜索区域-->
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="菜单名称">
          <el-input v-model="searchForm.menuTitle" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-select v-model="searchForm.menuType" placeholder="请输入菜单类型">
            <el-option label="目录" value="1"></el-option>
            <el-option label="菜单" value="2"></el-option>
            <el-option label="按钮" value="3"></el-option>
          </el-select>
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
      <!--      <el-popconfirm
                style="margin: 2px 0px 0px 5px"
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除这么多项吗？"
                @confirm="batchDel"
            >
       <el-button slot="reference" type="danger" size="mini"  :disabled="selectId==-1">批量删除</el-button>
            </el-popconfirm>-->
    </div>

    <!--      数据表格-->
    <el-scrollbar>
      <el-table
          highlight-current-row
          @row-click="rowClick"
          :data="tableData"
          row-key="id"
          :tree-props="{children:'children'}"
          style="width: 100%">
        <el-table-column
            align="center"
            label="权限名称"
            prop="menuTitle">
        </el-table-column>
        <el-table-column
            align="center"
            label="权限类型"
            prop="menuType">
          <template v-slot="obj">
            <el-tag v-if="obj.row.menuType == 1">目录</el-tag>
            <el-tag type="success" v-if="obj.row.menuType == 2">菜单</el-tag>
            <el-tag type="warning" v-if="obj.row.menuType == 3">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="权限图标"
            prop="menuIcon">
          <template v-slot="obj">
            <e-icon :icon-name="obj.row.menuIcon"/>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="权限排序"
            prop="sort">
        </el-table-column>
        <el-table-column
            align="center"
            label="菜单路由"
            prop="menuRouter">
        </el-table-column>
        <el-table-column
            align="center"
            label="权限标识"
            prop="perm_sign">
        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
          <template v-slot="obj">
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" circle @click.native.stop=findById(obj.row.id)></el-button>
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
              <el-button slot="reference" type="danger" icon="el-icon-delete" @click.native.stop circle></el-button>
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
        title="权限(菜单)操作"
        :visible.sync="createDialog"
        width="30%">
      <!--      内容-->
      <el-form ref="form" :rules="rules" :model="formData" size="mini" label-width="80px">
        <el-form-item label="上级权限" prop="parentId">
          <treeselect v-model="formData.parentId" :options="menuSelectList" :show-count="true"
                      :normalizer="normalizer"/>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="权限类型" prop="menuType">
              <el-radio-group v-model="formData.menuType" size="mini">
                <el-radio-button label="1">目录</el-radio-button>
                <el-radio-button label="2">按钮</el-radio-button>
                <el-radio-button label="3">菜单</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="按钮图标" prop="menuIcon" v-if="formData.menuType!=3">
          <e-icon-picker v-model="formData.menuIcon" :options="options"/>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="权限名称" prop="menuTitle">
              <el-input v-model="formData.menuTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限排序" prop="sort">
              <el-input-number style="width: 100%" v-model="formData.sort" controls-position="right"
                               :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" v-if="formData.menuType!=3">
            <el-form-item label="路由地址" prop="menuRouter">
              <el-input v-model="formData.menuRouter"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限标识" prop="permSign" v-if="formData.menuType!=1">
              <el-input v-model="formData.permSign"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="formData.menuType==2">
          <el-col :span="12">
            <el-form-item label="组件名称" prop="componentName">
              <el-input v-model="formData.componentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组件地址" prop="componentPath">
              <el-input v-model="formData.componentPath"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">

        </el-row>


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