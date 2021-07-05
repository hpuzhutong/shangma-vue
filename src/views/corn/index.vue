<template>
  <div class="brand-wrapper" style="margin: 0px 20px 0px 10px">
    <!--          操作区域-->
    <div class="exec-box" style="margin: 10px 0px 10px 0px ">
      <el-button-group>
        <el-button size="mini" type="primary" @click=addBtnClick >新建</el-button>
      </el-button-group>
    </div>

    <!--      数据表格-->
    <el-scrollbar>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            align="center"
            label="定时ID"
            width="100px"
            prop="cornId">
        </el-table-column>
        <el-table-column
            align="center"
            label="Corn表达式"
            prop="cornExpress">
        </el-table-column>
        <el-table-column
            align="center"
            label="定时描述"
            prop="cornDesc">
        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
          <template v-slot="obj">
            <el-button type="warning"  title="暂停" size="mini"  @click=pause(obj.row.cornId)>暂停</el-button>
            <el-button type="primary"  title="启动" size="mini"  @click=play(obj.row.cornId)>启动</el-button>
            <el-button type="success" title="修改" size="mini"  @click=findById(obj.row.cornId)>修改并启动</el-button>
            <el-popconfirm
                style="margin-left: 10px"
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="delById(obj.row.cornId)"
            >
              <!--删除按钮-->
              <el-button slot="reference" type="danger" icon="el-icon-delete" title="删除" size="mini" circle></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>

    <!--    上传表单-->
    <el-dialog
        title="实体操作"
        :visible.sync="createDialog"
        width="30%">
      <!--      内容-->
      <el-form ref="form" :model="formData" size="mini" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Corn">
              <el-input v-model="formData.cornExpress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="定时描述">
          <el-input type="textarea" v-model="formData.cornDesc"></el-input>
        </el-form-item>
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