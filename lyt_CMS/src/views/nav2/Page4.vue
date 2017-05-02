<template>
	<section>
	<el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
			<el-form :inline="true" :model="filters">
						<!--筛选信息-->
						<!--日期选择-->
							<div class="block" style="display: inline-block;">
							    <el-date-picker
							      v-model="filters.createTimeStr"
							      type="daterange"
							      align="right"
							      size="small"
							      placeholder="选择日期范围"
							      @change="aoni"
							      :picker-options="pickerOptions">
							    </el-date-picker>
							  </div>											
						<!--日期选择结束-->
						&nbsp;  操作人 &nbsp; <el-select v-model="value2" filterable placeholder="请选择"  @change="splx" size="small" style="width: 100px;">
						    <el-option
						       v-for="(item,index) in optionsTow"
						      :label="item.label"
						      :value="index">
						    </el-option>
						</el-select>
						
						<el-input v-model="filters.optObjectName  " size="small" placeholder="请输入商品名" icon="search" :on-icon-click="getUsers" style="width:260px;margin-left: 10px;"></el-input>
						
			</el-form>
	</el-col>
		<!--列表-->
		<template>
			<el-table :data="users"    highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
		
			<el-table-column prop="logId" label="日志序列" width="220">
			</el-table-column>
		
			<el-table-column prop="operator" label="操作员" width="100">
			</el-table-column>
			<el-table-column prop="content" label="操作内容" width="200"><!-- :formatter="formatSex"-->
			</el-table-column>
			<el-table-column prop="optObjectName" label="" width="140"><!-- :formatter="formatSex"-->
			</el-table-column>
			<el-table-column prop="optObjectId" label="" width="140"><!-- :formatter="formatSex"-->
			</el-table-column>
			<el-table-column prop="createTimeStr" label="创建时间" width="180">
			</el-table-column>
		
			<!--<el-table-column prop="addr" label="地址" min-width="80" sortable>
			</el-table-column>-->
			
		</el-table>
		<el-col :span="24" class="toolbar">
			<el-pagination
				layout="total, sizes, prev, pager, next, jumper" 
				:page-sizes="[10]" 
				@size-change="handleSizeChange" 
				@current-change="handleCurrentChange" 
				:current-page="currentPage"
				:total="total" style="float:right;">
			</el-pagination><!--sizes  :page-sizes="[20, 30, 40, 50]"更改见mock.js  -->
		</el-col>
		</template>

	</section>
</template>
<script>
	import util from '../../common/js/util'
	import host from '../../common/js/configurl'
	//import NProgress from 'nprogress'
//	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
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
		         optionsTow: [{
		          value: '选项1',
		          label: 'name1'
		        }, {
		          value: '选项2',
		          label: 'name2'
		        }, {
		          value: '选项3',
		          label: 'name3'
		        }],
		        value: '',
		        value2:'',
		        value3:'',
		        checked: false,
				filters: {
					isInventedProduct:'',//商品类型
					state:'',//商品状态
					isHomeUp:'',// 爆款标志
					createTimeStr:'',//
					optObjectName: '',//商品名
					startTime:'',//开始时间
					endTime:''//结束时间
				},
				listLoading: false,
				users: [],
				total: 0,
				page: 1,
				currentPage:1,//=====================首先显示第几页======================
				listLoading: false,
				sels: [],//列表选中列
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
			//类型显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '实物类' : row.sex == 0 ? '虚拟类' : '未知';
			},
			//爆款显示转换
			formatExp: function (row, column) {
				return row.sex == 1 ? '爆款' : row.sex == 0 ? ' ' : '未知';
			},
			//爆款排序
			formatBurst: function (row, column) {
				return row.sex == 1 ?"1": row.sex == 0 ? ' ' : '未知';
			},
			
			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		        console.log("++++++")
		        
//		        this.currentPage =Math.ceil(this.total/val);//、====================
				this.getUsers();//==========================
		      },
			handleCurrentChange(val) {
				this.page = val;
				console.log(this.page)
				this.getUsers();
				console.log('总数：',this.total)
				console.log(`当前页: ${val}`)
			},
			//获取用户列表
			getUsers() {
				var url = host.host+'/cms/operationLog/getoptLoginfo';
				var _this = this;
			    $.ajax(url, { 
			      	xhrFields: {
			           withCredentials: true
			       	},
       				crossDomain: true,
			        data: {  
	//		          'cityname': '',  
	//		          'dtype': 'jsonp',
//					isInventedProduct:_this.filters.isInventedProduct,
//					state:_this.filters.state,
//					isHomeUp:_this.filters.isHomeUp,
						dateStart:_this.filters.startTime,
						dateEnd:_this.filters.endTime,
						optObjectName:_this.filters.optObjectName,
				        pageNum:  _this.page,
				        createTimeStr:_this.filters.createTimeStr
	
			        },  
			        type : "POST",
			        dataType:"json",
			        success:function(data1){
	//		          	_this.page++;
			          	console.log('data1=',data1)
			          	_this.total=data1.recordCount;
			          	console.log(data1.resultBody);
			          	_this.users=data1.resultBody;
//			          	console.log('拼接=',data1.resultBody[9].content,data1.resultBody[9].optObjectName,data1.resultBody[9].optObjectId)
			          	this.listLoading = false;
			         },
			        error:function(err){
			            alert("请求出错！");
			            console.log(err);
			         }
			    }); 
			},
			aoni:function(){//日期选择区间
				/*console.log(this.filters.birth[0])//Thu Mar 30 2017 00:00:00 GMT+0800 (中国标准时间)
				console.log((this.filters.birth[0]).toISOString())//2017-03-29T16:00:00.000Z
				console.log((this.filters.birth[0]).toISOString().slice(0,10))//2017-03-29
				console.log((this.filters.birth[0]).toLocaleString())//2017/3/30 上午12:00:00
				console.log((this.filters.birth[0]).toLocaleString().slice(0,10))//2017/3/30
				console.log((this.filters.birth[1]).toLocaleString().slice(0,10))//2017/3/30
				console.log((this.filters.birth[0]).toUTCString())//Sun, 02 Apr 2017 16:00:00 GMT
				console.log((this.filters.birth[0]).toLocaleDateString())//2017/4/3 
				*/
				var that=this;
				console.log('是否为空=1',this.filters.createTimeStr)
				var time=this.filters.createTimeStr;
				function isBigEnough(element, index, array) {
					console.log('什么什么',element)
					if(element != null){
						var startDate = that.filters.createTimeStr[0].toLocaleDateString().replace(/\//g, '-');
						var endDate = that.filters.createTimeStr[1].toLocaleDateString().replace(/\//g, '-');
						that.filters.startTime=startDate;
						that.filters.endTime=endDate;
						that.getUsers();
						console.log( 'daystart:',startDate);
						console.log( 'dayend:',endDate);
					}else{
						that.filters.createTimeStr='';
						that.filters.startTime='';
						that.filters.endTime='';
						that.getUsers();
						
					}
					
				}
				
				var Timedate=time.filter(isBigEnough);
				
				
				
//				console.log( 'daystart:',startDate.toLocaleDateString().replace(/\//g, '-'));
			},
			//类型匹配
			splx:function(){
				var dataTow = this.optionsTow[ this.value2 ];
//				console.log(data)
				console.log(this.value2)
				console.log('类型4=',dataTow)
			},
			
//			splxTow:function(){
//				var dataTow = this.optionsTow[ this.value2 ];
//				console.log(dataTow)
//			},
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
			handleETow:function(){
				console.log("this is block")
				$('.show').css({"display":"block"})
				$('.hidde').css({"display":"none"})
			},
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.activeName='first';
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
				$(".el-dialog--large").css({"top":"5%"})
			},
			//编辑
			editFlase:function(){
				this.editFormVisible = false;
				$('.show').css({"display":"none"})
				$('.hidde').css({"display":"block"})
			},
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
		     	$(".dialog-footer").css({"display":"none"});
		     },
			
		},
		mounted() {
			this.getUsers();
			$(".cell").css({"color":" #0066CC"})
		    $(".el-dialog__headerbtn").click(function(){
		  		$('.show').css({"display":"none"})
				$('.hidde').css({"display":"block"})
		    })
//		 console.log(com_map)
		    $(".el-checkbox__label").css({"font-size":"1.2rem"})
		},
		beforeUpdate: function () {
			console.log('组件  update before');
        },
		updated: function () {
	       $(".cell").css({"padding":"0","text-align":"center"})
	       console.log(this.users)
//             setTimeout(function(){
//             	 console.log( $('.el-table_1_column_3  .cell').length)
//             },0)
//             console.log('组件  update', $('.el-table_1_column_3  .cell').length)
//			获取选中日期 console.log(this.filters.birth)
//            console.log($("..el-input__inner").value())
        }
	};

</script>

<style scoped lang="scss">
.breadcrumb-container {
	//margin-bottom: 15px;
	background: #f2f2f2;
	    strong:last-child{
	    	border: none;
	    }
	    strong:first-child{
	    	padding-left:1.2rem ;
	    }
		strong:nth-child(2),
		strong:nth-child(3){
			border: none;
			padding-right: 3rem;
			margin-left: 0;
		}
		strong:nth-child(5){
			border: none;
		}
	.title {
		width: auto;
		float: left;
		color: #475669;
		font-style: normal;
		font-weight: normal;
		font-size: 1.4rem;
		padding:0 3rem;
		margin: 1.5rem 0 1.5rem 1.5rem;
		border-right:1px solid #505458;
	}
	.breadcrumb-inner {
		float: right;
	}
}
.el-form--inline{
		font-size: 1.2rem;
		color: #999;
		padding: 0 0 0 2rem;
		.el-form-item__content{
			background-color:#000000;
		}
	}
		.qu{
			min-height: 30rem;
			
		}
		.cell{
			background-color: #0066CC;
		}
</style>