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
        </el-table-column>
        <el-table-column
            align="center"
            label="权限图标"
            prop="menuIcon">
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
            <el-button type="primary" icon="el-icon-edit" circle @click=findById(obj.row.id)></el-button>
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
        title="管理员操作"
        :visible.sync="createDialog"
        width="30%">
      <!--      内容-->
      <el-form ref="form" :rules="rules" :model="formData" size="mini" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="adminAccount">
              <el-input v-model="formData.adminAccount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="adminName">
              <el-input v-model="formData.adminName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="formData.gender">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证" prop="adminCode">
              <el-input v-model="formData.adminCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="adminEmail">
              <el-input v-model="formData.adminEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工资" prop="adminSalary">
              <el-input v-model="formData.adminSalary"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="adminAddress">
              <el-input v-model="formData.adminAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="adminPhone">
              <el-input v-model="formData.adminPhone  "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否激活" prop="isActive">
              <el-switch
                  v-model="formData.isActive"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分配角色" prop="roleName">
              <el-select v-model="formData.roleIds" multiple placeholder="请选择身份">
                <el-option
                    v-for="role in roleList"
                    :key="role.id"
                    :label="role.roleName"
                    :value="role.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="头像" prop="adminAvatar">
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :http-request="choseImg"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload">
                <img v-if="formData.adminAvatar" :src="formData.adminAvatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
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