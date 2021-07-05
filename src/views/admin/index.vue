<template>
  <div class="brand-wrapper" style="margin: 0px 20px 0px 10px">
    <!--  搜索区域-->
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.adminAccount" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.adminPhone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="searchForm.gender" placeholder="请选择" style="width: 90px">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="searchForm.adminAddress" placeholder="请输入联系地址"></el-input>
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
        <el-button size="mini" type="warning">导入Excel</el-button>
        <a class="el-button el-button--success el-button--mini" style="color: #FFFFFF;text-decoration: none"
           href="http://localhost:9999/admin/exportExcel">导出Excel</a>
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
      <template>
        <el-table
            @selection-change="selectChange"
            :data="tableData"
            style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户名：">
                  <span>{{ props.row.adminAccount }}</span>
                </el-form-item>
                <el-form-item label="姓名：">
                  <span>{{ props.row.adminName }}</span>
                </el-form-item>
                <el-form-item label="性别：">
                  <span v-if="props.row.gender==0">男</span>
                  <span v-if="props.row.gender==1">女</span>
                </el-form-item>
                <el-form-item label="邮箱：">
                  <span>{{ props.row.adminEmail }}</span>
                </el-form-item>
                <el-form-item label="身份证号：">
                  <span>{{ props.row.adminCode }}</span>
                </el-form-item>
                <el-form-item label="电话：">
                  <span>{{ props.row.adminPhone }}</span>
                </el-form-item>
                <el-form-item label="工资：">
                  <span>{{ props.row.adminSalary }}</span>
                </el-form-item>
                <el-form-item label="地址：">
                  <span>{{ props.row.adminAddress }}</span>
                </el-form-item>
                <el-form-item label="是否激活：">
                  <el-switch
                      v-model="props.row.isActive"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      disabled>
                  </el-switch>
                </el-form-item>
                <el-form-item label="是否超管：">
                  <el-switch
                      v-model="props.row.isAdmin"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      disabled>
                  </el-switch>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
              align="center"
              type="selection"
              width="60">
          </el-table-column>
          <el-table-column
              align="center"
              label="id"
              prop="id"
              width="60">
          </el-table-column>
          <el-table-column
              align="center"
              label="用户名"
              prop="adminAccount">
          </el-table-column>
          <el-table-column
              align="center"
              label="姓名"
              prop="adminName">
          </el-table-column>
          <el-table-column
              align="center"
              label="头像">
            <template v-slot="obj">
              <img :src="obj.row.adminAvatar" width="50px" height="50px"/>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              label="身份证"
              prop="adminCode">
          </el-table-column>
          <el-table-column
              align="center"
              label="手机号码"
              prop="adminPhone">
          </el-table-column>
          <el-table-column
              align="center"
              label="薪资"
              prop="adminSalary">
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
      </template>


      <!--      <el-table-column-->
      <!--          align="center"-->
      <!--          label="操作">-->
      <!--        <template v-slot="obj">-->
      <!--          &lt;!&ndash;修改按钮&ndash;&gt;-->
      <!--          <el-button type="primary" icon="el-icon-edit" circle @click=findById(obj.row.id)></el-button>-->
      <!--          <el-popconfirm-->
      <!--              style="margin-left: 5px"-->
      <!--              confirm-button-text='确定'-->
      <!--              cancel-button-text='不用了'-->
      <!--              icon="el-icon-info"-->
      <!--              icon-color="red"-->
      <!--              title="确定删除吗？"-->
      <!--              @confirm="delById(obj.row.id)"-->
      <!--          >-->
      <!--            &lt;!&ndash;删除按钮&ndash;&gt;-->
      <!--            <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button>-->
      <!--          </el-popconfirm>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

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

<style lang="scss">
/*<!--直接src引入报错-->*/
@import "./index.scss";
</style>