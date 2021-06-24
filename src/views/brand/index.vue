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
          <el-button type="primary" @click="searchPage">查询</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--          操作区域-->
    <div class="exec-box" style="margin: 10px 0px 10px 0px ">
      <el-button-group>
        <el-button size="mini" type="success" @click=addBtnClick>新建</el-button>
        <el-button size="mini" type="danger" :disabled="selectIds.length<=0" @click="batchDel">批量删除</el-button>
        <el-button size="mini" type="success">导入Excel</el-button>
        <el-button size="mini" type="warning">导出Excel</el-button>
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
            <el-button type="primary" icon="el-icon-edit" circle  @click=findById(obj.row.id)></el-button>
            <el-popconfirm
                style="margin-left: 5px"
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="delById(obj.row.id)"
            >
              <el-button type="danger" ></el-button>
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
      <el-form ref="form" :model="formData" size="mini" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="品牌名称">
              <el-input v-model="formData.brandName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌网址">
              <el-input v-model="formData.brandSite"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="品牌图标">
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
            <el-form-item label="品牌描述">
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

<script>
import brand from "@/api/brand";

export default {
  name: "index",
  data() {
    return {
      //修改表单
      editFormData: {
        brandLogo: '',
        brandDesc: '',
        brandName: '',
        brandSite: '',
      },
      //批量删除的id
      selectIds: [],
      //上传表单数据
      formData: {
        //上传logo
        brandLogo: '',
        brandDesc: '',
        brandName: '',
        brandSite: '',
      },
      //搜索表单数据
      searchForm: {
        currentPage: 1,
        pageSize: 8,
        brandName: '',
        brandDesc: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      //所选时间
      choseDate: '',
      tableData: [],
      total: 0,
      search: '',
      //开启关闭上传模态框
      createDialog: false,
      //开启关闭修改模态框
      editDialog: false,
    }

  },

  created() {
    this.searchPage();
  },

  methods: {
    //条件分页查询
    async searchPage() {
      let response = await brand.searchPage(this.searchForm);
      // console.log(response)
      this.total = response.total;
      this.tableData = response.data;
    },
    //---------------------------------页面事件------------------------------------------------
    //分页点击事件
    pageChange(page) {
      this.searchForm.currentPage = page;
      this.searchPage();
    },
    //当用户选择查询时间
    choseDateChange(val) {
      console.log(val)
      this.searchForm.startTime = val[0];
      this.searchForm.endTime = val[1];
    },
    //秦空搜索表单
    resetForm() {
      this.searchForm.brandName = '';
      this.searchForm.brandDesc = '';
      this.searchForm.startTime = '';
      this.searchForm.endTime = '';
      this.searchForm.currentPage = 1;
      this.searchForm.pageSize = 8;
      this.choseDate = "";
      // this.searchPage();
    },
    //删除单个
    async delById(id) {
      // console.log(id)
      await brand.delById(id);
      this.searchPage();
    },
    //删除多个
    selectChange(e) {
      this.selectIds = e.map(item => item.id);
    },
    async batchDel() {
      await brand.batchDel(this.selectIds);
      this.searchPage();
    },
    //点击新建按钮
    addBtnClick() {
      this.createDialog = true;
      //清空表单
      this.formData.brandLogo = '';
      this.formData.brandDesc = '';
      this.formData.brandName = '';
      this.formData.brandSite = '';
    },
    //新建品牌方法
    async addOrEditBtn() {
      if (this.formData.id) {
        //修改
        await brand.updateBrand(this.formData);
      } else {
        //添加
        await brand.addBrand(this.formData);
      }
      this.searchPage();
    },
    // findById
    async findById(id){
      this.createDialog = true;
      this.formData = await brand.findById(id);
    },

    //-----------------------------上传模态框---------------------------------
    //选择图片
    choseImg(e) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(e.file)
      fileReader.onloadend = (response) => {
        // this.imageUrl = response.target.result;
        this.formData.brandLogo = response.target.result;
      }
    },


  }


}
</script>

<style lang="scss">
.el-scrollbar {
  height: 88%;
}

.brand-wrapper {
  height: 100%;
}

/*隐藏地步滚动条*/
.el-scrollbar__wrap {
  overflow-x: hidden;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 40px;
  display: block;
}

</style>