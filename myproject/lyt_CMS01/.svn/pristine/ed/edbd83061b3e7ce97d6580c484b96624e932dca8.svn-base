<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
			<el-form :inline="true" :model="filters">
				商品类型 &nbsp; <el-select v-model="value" filterable placeholder="请选择" size="small" class="filtrate" style="width: 100px;">
						    <el-option
						      v-for="item in options"
						      :label="item.label"
						      :value="item.value"
						      :disabled="item.disabled">
						    </el-option>
						  </el-select>
						 &nbsp; 状态 &nbsp; <el-select v-model="value2" filterable placeholder="请选择" size="small" style="width: 100px;">
						    <el-option
						      v-for="item in optionsTow"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						  <!-- `checked` 为 true 或 false单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍 -->
						   <el-checkbox v-model="checked" style="padding: 0 10px;">爆款</el-checkbox>
						<!--筛选信息-->
						<!--日期选择-->
							<div class="block" style="display: inline-block;">
							    <el-date-picker
							      v-model="value"
							      type="daterange"
							      align="right"
							      size="small"
							      placeholder="选择日期范围"
							      :picker-options="pickerOptions">
							    </el-date-picker>
							  </div>							
						<!--日期选择结束-->
						
						<!--查询新增-->
						
							<el-input v-model="filters.name" size="small" placeholder="请输入商品名" icon="search" :on-icon-click="getUsers" style="width:260px;margin-left: 10px;"></el-input>
							<!--<el-button type="primary" size="small" icon="search" v-on:click="getUsers" style="margin-left:-3px ;">搜索</el-button>-->
						
						
			</el-form>
		</el-col>
		<el-col :span="24" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" style="padding-left: 0px;">
					<el-form-item>
							<el-button type="primary"  size="small"  icon="plus" @click="handleAdd">添加商品</el-button>
							<el-button type="primary"  size="small"  @click="putup" :disabled="this.sels.length===0">上架</el-button>
							<el-button type="primary"  size="small"  @click="putdown"  :disabled="this.sels.length===0">下架</el-button>
						</el-form-item>
			</el-form>
		</el-col>
		<!--查询新增结束-->
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="com_map" label="商品图" width="120">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="sex" label="类型" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="age" label="售价" width="100" sortable>
			</el-table-column>
			<el-table-column prop="explosion" label="爆款" width="100" sortable><!-- :formatter="formatSex"Burst sort-->
			</el-table-column>
			<el-table-column prop="burst_sort" label="爆款排序" width="120" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="发布时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="com_stock" label="库存" width="100" sortable>
			</el-table-column>
			<el-table-column prop="com_sales" label="销量" width="100" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		  
					<el-dialog title="添加商品" size="large" v-model="addFormVisible" :close-on-click-modal="false">
						
						<el-tabs type="border-card" v-model="activeName">
							  <el-tab-pane label="基本信息" :disabled="nextTba=true" name="first" class="le">
							  	<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
									<el-form-item label="商品名称:" prop="name">
										<el-input v-model="addForm.name" :maxlength="30" autosize type="textarea"></el-input>
									</el-form-item>
									<el-form-item label="商品编号:" prop="title_number">
										<el-input v-model="addForm.title_number" autosize type="textarea"  style="width: 200px;"></el-input>
									</el-form-item>
									<el-form-item label="商品分类:" prop="title_number">
										 <el-select v-model="value3" filterable placeholder="请选择" size="small" class="filtrate" style="width: 100px;">
										    <el-option
										      v-for="item in options"
										      :label="item.label"
										      :value="item.value"
										      :disabled="item.disabled">
										    </el-option>
									  </el-select>
									</el-form-item>
									
										<el-form-item label="售价:" prop="pirce" style="float: left;position: relative;">
											<el-input v-model="addForm.pirce"  size="small" style="width: 80px;padding-right: 10px;z-index: 22;"></el-input>积分
										</el-form-item>
										<el-form-item label="数量:" prop="pirce_num"  style="float: left;">
											<el-input v-model="addForm.pirce_num"  size="small" style="width: 80px;padding-right: 10px;z-index: 22;"></el-input>件
										</el-form-item>
										<el-form-item  prop="baokuan"  style="float: left;">
										  <el-checkbox v-model="checked" style="padding: 0 5px;">设为爆款</el-checkbox>
										</el-form-item>
										<el-form-item label="爆款排序:" prop="paixu">
											<el-input v-model="addForm.paixu"  size="small" style="width: 80px;padding-right: 10px;"></el-input>件
										</el-form-item>
									<el-form-item label="立即上架:">
										<el-radio-group v-model="addForm.sex">
											<el-radio class="radio" :label="1">是</el-radio>
											<el-radio class="radio" :label="0">否</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="商品图:">
										<el-upload
										  action="https://jsonplaceholder.typicode.com/posts/"
										  list-type="picture-card"
										  :on-preview="handlePictureCardPreview"
										  :on-remove="handleRemove">
										  <i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog v-model="dialogVisible" size="tiny">
										  <img width="100%" :src="dialogImageUrl" alt="">
										</el-dialog>
									</el-form-item>
									<div class="oneleft" style="float: right;">
										<el-button @click.native="addFormVisible = false">取消</el-button>
										<el-button type="primary" @click.native="nextClick">下一步</el-button>
									</div>
								</el-form>
							  </el-tab-pane>
							  <el-tab-pane label="商品详情" :disabled="nextTba=true" name="second">
							  	<!--<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
									<el-form-item label="商品名称" prop="name">
										<el-input v-model="addForm.name"  autosize type="textarea"></el-input>
									</el-form-item>
									<el-form-item label="性别">
										<el-radio-group v-model="addForm.sex">
											<el-radio class="radio" :label="1">男</el-radio>
											<el-radio class="radio" :label="0">女</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="年龄">
										<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
									</el-form-item>
									<el-form-item label="生日">
										<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
									</el-form-item>
									<el-form-item label="地址">
										<el-input type="textarea" v-model="addForm.addr"></el-input>
									</el-form-item>
								</el-form>-->
							  		<div class="crad" style="width: 70%;float: left;">
								  		 <quill-editor ref="myTextEditor"
								                		class="qu"
								                      :options="editorOption"
								                      @blur="onEditorBlur($event)"
								                      @focus="onEditorFocus($event)"
								                      @ready="onEditorReady($event)">
								        </quill-editor>
							  			
							  		</div>
							  		<div class="imgrc" style="width: 30%;height:364px;float: right;border: 1px solid #DCDCDC;border-left:none;margin-left:-2px ;overflow-y: scroll;">
							  			<el-upload
										  class="upload-demo"
										  action="https://jsonplaceholder.typicode.com/posts/"
										  :on-preview="handlePreview"
										  :on-remove="handleRemove"
										  :file-list="fileList2"
										  list-type="picture">
									
										 	
											  <el-button size="small" type="primary" style="margin-top: 20px;margin-left: 20px;">添加图片</el-button>
											  <div slot="tip" class="el-upload__tip" style="padding-left:20px ;">只能上传jpg/png文件，且不超过500kb</div>
										 
										
										</el-upload>
							  		</div>
							  </el-tab-pane>
							
						</el-tabs>
						
						
						
						<div slot="footer" class="dialog-footer" style="display: none;">
							<el-button @click.native="addFormVisible = false">取消</el-button>
							<el-button type="primary" @click.native="firstClick">上一步</el-button>
							<el-button type="primary" @click.native="addSubmit" :loading="addLoading">完成</el-button>
						</div>
					</el-dialog>
				
		
		
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				//批量上传图片 [{name: '', url: ''}, {name: '', url: ''}]
				fileList2:[],
				//====编辑器设置
				editorOption: {},
				//====结束
				activeName: 'first',//控制切换添加商品时的步骤
				//ceshi
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
		        options: [{
		          value: '选项1',
		          label: '全部'
		        }, {
		          value: '选项2',
		          label: '实物类',
		          disabled: true
		        }, {
		          value: '选项3',
		          label: '虚拟类'
		        }],
		         optionsTow: [{
		          value: '选项1',
		          label: '全部'
		        }, {
		          value: '选项2',
		          label: '正常'
		        }, {
		          value: '选项3',
		          label: '未上架'
		        }],
		        value: '',
		        value2:'',
		        value3:'',
		        checked: false,
		        //测试===结束
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					com_map:'',//商品图
					name: '',//商品名称
					explosion:-1,//爆款
					age: 0,//售价	com_price:'',
					sex: -1,//类型
					com_stock:'',//库存
					com_sales:'',//销量 
					birth: '',//发布时间
					com_state:'',//状态
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				nextTba: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//商品图
				dialogImageUrl: '',
        		dialogVisible: false,
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//编辑器使用
			onEditorBlur(editor) {
		        console.log('editor blur!', editor)
		     },
		    onEditorFocus(editor) {
		        console.log('editor focus!', editor)
		     },
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '实物类' : row.sex == 0 ? '虚拟类' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					console.log(res)
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//商品图上传
			selsChange: function (sels) {
						this.sels = sels;
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		     },
		     //批量上传图片
		     handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      handlePreview(file) {
		        console.log(file);
		      },
		     //添加商品跳转到下一步
		     nextClick:function(){
		     	console.log(this.activeName)
		     	this.activeName='second';
		     	var dialog=document.getElementsByClassName("dialog-footer")[0];
		     	$(".dialog-footer").css({"display":"block"});
		     
		     	
		     },
		     firstClick:function(){
		     	this.activeName='first';
		     	
		     },
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//上下架============
			putup:function(){
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认上架吗？', '提示', {
					type: 'warning'
				}).then(() => {
					
				}).catch(() => {

				});
			},
			putdown:function(){
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认下架吗？', '提示', {
					type: 'warning'
				}).then(() => {
					
				}).catch(() => {

				});
			}
		},
		//编辑器使用
		computed: {
	      editor() {
	        return this.$refs.myTextEditor.quillEditor
	      }
	    },
		mounted() {
			this.getUsers();
			
		   
		}
	}

</script>

<style scoped lang="scss">
	.el-form--inline{
		font-size: 12px;
		color: #999;
		padding: 0 0 0 20px;
		.el-form-item__content{
			background-color:#000000;
		}
	}
		.qu{
			min-height: 300px;
			
		}
</style>