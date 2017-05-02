<template>
	<section>
		<el-col :span="24" class="breadcrumb-container">
			
				<!--<strong class="title">{{$route.name}}</strong>-->
				<strong class="title">今日成交总额：{{this.Total.sum}}</strong>
				<strong class="title">今日订单：{{this.Total.virtual}}</strong>
				<strong class="title">虚拟类：{{this.Total.Vexp}}</strong>
				<strong class="title">实物类：{{this.Total.physical}}</strong>
				<strong class="title">待发货：{{this.Total.Pexp}}</strong>
				<strong class="title">待退款:{{this.Total.insale}}</strong>
				
			
			
		</el-col>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
			<el-form :inline="true" :model="filters">
				订单类型 &nbsp; <el-select v-model="value" filterable placeholder="请选择" @change="isInvented" size="small" class="filtrate" style="width: 100px;">
						    <el-option
						      v-for="(item,index) in options"
						      :label="item.label"
						      :value="index"
						      :disabled="item.disabled">
						    </el-option>
						  </el-select>
						 &nbsp; 状态 &nbsp; <el-select v-model="value2" filterable placeholder="请选择" size="small" @change="splx" style="width: 100px;">
						    <el-option
						      v-for="(item,index) in optionsTow"
						      :label="item.label"
						      :value="index">
						    </el-option>
						 </el-select>
						<!--筛选信息-->
						<!--日期选择-->
							<div class="block" style="display: inline-block;margin-left: 45px;">
							    <el-date-picker
							      v-model="filters.upTimeFormat"
							      type="daterange"
							      align="right"
							      size="small"
							      placeholder="选择日期范围"
							       @change="aoni"
							      :picker-options="pickerOptions">
							    </el-date-picker>
							  </div>							
						<!--日期选择结束-->
						
						<!--查询新增-->
						
							<el-input v-model="filters.searchInfo" size="small" placeholder="请输入商品名" icon="search" :on-icon-click="getUsers" style="width:260px;margin-left: 10px;"></el-input>
							<!--<el-button type="primary" size="small" icon="search" v-on:click="getUsers" style="margin-left:-3px ;">搜索</el-button>-->
						
						
			</el-form>
		</el-col>
		<el-col :span="24" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" style="padding-left: 0px;">
					<el-form-item>
							<el-button type="primary"  size="small"  @click="putAll" :disabled="this.sels.length===1">全部导出</el-button>
							<el-button type="primary"  size="small"  @click="putup" :disabled="this.sels.length===0">导出</el-button>
							
						</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<template>
			<el-table :data="users"    highlight-current-row v-loading="listLoading" @selection-change="selsChange" @row-click="oncli"  style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="orderSn" label="订单号" width="140">
			</el-table-column>
			<el-table-column prop="product.name1" label="商品名称" width="230">
			</el-table-column>
			<el-table-column prop="product.isHomeUp" label="爆款" :formatter="formatExp" width="60"><!-- :formatter="formatSex"Burst sort-->
			</el-table-column>
			<el-table-column prop="productNumber" label="数量"  width="80">
			</el-table-column>
			<el-table-column prop="orderType2" label="类型" width="80" :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="createTimeFormat" label="下单时间" width="80">
			</el-table-column>
			<el-table-column prop="orderState" label="订单状态"  :formatter="eBurst" width="120"><!-- sortable-->
			</el-table-column>
			<el-table-column prop="integralOrder" label="实付款" width="80">
			</el-table-column>
			<!--<el-table-column prop="addr" label="地址" min-width="80" sortable>
			</el-table-column>-->
		</el-table>
		<!--订单详情页面-->
		<el-dialog title="订单详情" size="small" v-model="updateFormVisible" :close-on-click-modal="false">
			<div class="hidde">
				<el-form :model="updateForm" label-width="80px" ref="updateForm">
					
					<!--<el-form-item label="爆款价:" prop="orderState" >-->
							<div class="detilsTop">{{updateForm.orderState}}</div>
							<div class="suss">
								<p>当前订单状态：{{updateForm.orderState}}！</p>
								<p>· {{updateForm.orderTxtOne}}</p>
								<p>· {{updateForm.orderTxtTwo}}</p>
							</div>
							<div class="infoe">
								<p>订单信息</p>
								<ul class="inTop">
									<li>订单编号：{{updateForm.orderSn}}</li>
									<li>交易单号：{{updateForm.tradeSn}}</li>
									<li>收货手机：{{updateForm.mobile}}</li>
								</ul>
								<el-table :data="infore" border highlight-current-row  style="width: 100%;font-size: 12px;color: #333;margin-bottom: 1rem;">
									<el-table-column prop="product.name1" label="商品名称" width="173">
									</el-table-column>
									<el-table-column prop="orderType2" label="类型" width="80">
									</el-table-column>
									<el-table-column prop="productNumber" label="数量" width="60">
									</el-table-column>
									<el-table-column prop="createTime" label="下单时间" width="140">
									</el-table-column>
									<el-table-column prop="integralOrder" label="实付款" width="80">
									</el-table-column>
								</el-table>
							</div>
						<!--</el-form-item>-->
					<!--<div class="detilsTop" v-model="updateForm.orderState"></div>-->
					
					
				</el-form>
			</div>
		</el-dialog>
		<!--订单详情-->
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
		data:function(){
			return {
				Total:{
					sum:0,
					virtual:0, 
					Vexp:0,
					physical:0,
					Pexp:0,
					insale:0,
					noshel:0
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
		          label: '交易成功'
		        }, {
		          value: '选项3',
		          label: '交易失败'
		        }],
		        value: '',
		        value2:'',
		        value3:'',
		        updateFormVisible:false,//订单详情不显示
				filters: {
					orderType2:'',//订单类型
					orderState:'',//订单状态
					dateStart:'',
					dateEnd:'',
					upTimeFormat:'',
					searchInfo:''//搜索
				},
				updateForm:{
					orderState:'',//订单详情状态
					orderTxtOne:'',//状态说明
					orderTxtTwo:'',//状态说明
					orderSn:'',//订单编号
					tradeSn:'',//交易单号
					mobile:''//收货手机
				},
				listLoading: false,
				users: [],
				infore:[],//订单详情列表
				total: 0,
				page: 1,
				currentPage:1,//=====================首先显示第几页======================
				sels: [],//列表选中列
			}
		},
		methods: {
			oncli:function(row, column){//点击出现订单详情
				console.log("被点击")
				this.infore=[];
				this.updateFormVisible = true;
				var pro=row.product;
				var deta= JSON.parse(JSON.stringify(pro))
				var str=JSON.parse(JSON.stringify(row))
				console.log('this is row##',str);
				console.log('this is pro++',deta);
				this.updateForm.orderState=str.orderState;
				this.updateForm.orderSn=str.orderSn;
				this.updateForm.tradeSn=str.tradeSn;
				this.updateForm.mobile=str.mobile;
				this.infore.push(str);
				str.orderState == 1 ?this.updateForm.orderState='未付款的订单': str.orderState == 2 ?this.updateForm.orderState= '待确认的订单' : str.orderState == 3 ?this.updateForm.orderState='待发货的订单' : str.orderState == 4 ?this.updateForm.orderState='已发货的订单' : str.orderState == 5 ?this.updateForm.orderState='交易成功' : str.orderState == 6 ?this.updateForm.orderState='取消的订单':this.updateForm.orderState= '交易失败';
		
				 if(str.orderState == 5){
				 	this.updateForm.orderTxtOne='交易成功，已将兑换码发送至买家。' 
				 	this.updateForm.orderTxtTwo='如果买家提出售后要求，请积极与买家协商，做好售后服务。'
				 }else if(str.orderState == 7){
				 	this.updateForm.orderTxtOne='服务器异常，若买家发起退款申请请及时处理。'
				 	this.updateForm.orderTxtTwo='如果买家提出退款要求，请积极与买家配合，完成售后流程。'
				 };
				console.log('///',this.infore)
			},
		    //商品类型
			isInvented:function(){
				var data = this.options[ this.value ];
				console.log(this.value)
				this.value==0?this.filters.orderType2='':this.filters.orderType2=1;
				console.log("商品类型");
				this.getUsers();
			},
			//类型显示转换
			formatSex: function (row, column) {

				return row.orderType2 == 2 ? '实物' : row.orderType2 == 1 ? '虚拟' : '未知';
			},
			//爆款显示转换product
			formatExp: function (row, column) {
			
				var pro=row.product;
//				var str=JSON.toString(pro);
//				console.log('this is ishomeup+===',str.isHomeUp);
//				console.log('this is name1+===',pro.name1);
				var deta= JSON.parse(JSON.stringify(pro))
//				deta.isHomeUp
//				console.log(deta)
				return deta.isHomeUp == 2 ? '是' : deta.isHomeUp ==1 ? ' ' : '';
			},
			//爆款排序
			eBurst: function (row, column) {
				
				return row.orderState == 1 ?'未付款的订单': row.orderState == 2 ? '待确认的订单' : row.orderState == 3 ? '待发货的订单' : row.orderState == 4 ? '已发货的订单' : row.orderState == 5 ? '已完成的订单' : row.orderState == 6 ? '已完成的订单': '交易失败（退款）';
			},
			getTotal:function(){//头部数据信息
				var that=this;
	    		var url = host.host+'/cms/ordersManage/getOrderTotalInfo';  
				 $.ajax(url, { 
			      	xhrFields: {
			           withCredentials: true
			       	},
       				crossDomain: true,
			        data: {  
//			          'cityname': '',  
//			          'dtype': 'jsonp',  
//			          'key': '',  
//			          '_': new Date().getTime()  
			        },  
			        type : "POST",
			        dataType:"json",
			        success:function(data1){
			          	//JSON.stringify()
			          	that.Total.sum=data1.resultBody[0];
						that.Total.virtual=data1.resultBody[1]; 
						that.Total.Vexp=data1.resultBody[2];
						that.Total.physical=data1.resultBody[3];
						that.Total.Pexp=data1.resultBody[4];
						that.Total.insale=data1.resultBody[5];
	          		},
			         error:function(err){
			         	that.$confirm('请求出错，请稍后重试', '提示', {
							type: 'error'
						}).then(() => {
							
						}).catch(() => {
		
						});   
			            console.log(err);
			         },
	        		crossDomain: true
	          	});  
	   		 },
			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		        console.log("++++++")
//		        this.currentPage =Math.ceil(this.total/val);//====================
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
				console.log('this is fil',this.filters);
				var url = host.host+'/cms/ordersManage/getListBySeachInfo';
				var _this = this;
			    $.ajax(url, { 
			      	xhrFields: {
			           withCredentials: true
			       	},
       				crossDomain: true,
			        data: {  
	//		          'cityname': '',  
	//		          'dtype': 'jsonp',
						searchInfo:_this.filters.searchInfo,
						orderType2:_this.filters.orderType2,
						dateStart :_this.filters.dateStart,
						dateEnd:_this.filters.dateEnd,
						orderState:_this.filters.orderState,
				        pageNum:  _this.page
	//		          'key': '',  
	//		          '_': new Date().getTime()  
			        },  
			        type : "POST",
			        dataType:"json",
			        success:function(data1){
	//		          	_this.page++;
			          	console.log('data1=',data1)
			          	_this.total=data1.recordCount;
			          	console.log('数据',data1.resultBody);
			          	_this.users=data1.resultBody;
//			          	_this.uSproduct=data1.resultBody.product;
			          	this.listLoading = false;
			         },
			        error:function(err){
			            alert("请求出错！");
			            console.log(err);
			         }
			    }); 
			},
			aoni:function(){//日期选择区间
//				console.log('1+',this.filters.upTimeFormat[0])//Thu Mar 30 2017 00:00:00 GMT+0800 (中国标准时间)
//				console.log('2+',(this.filters.upTimeFormat[0]).toISOString())//2017-03-29T16:00:00.000Z
//				console.log('3+',(this.filters.upTimeFormat[0]).toISOString().slice(0,10))//2017-03-29
//				console.log('4=',(this.filters.upTimeFormat[0]).toLocaleString())//2017/3/30 上午12:00:00
//				console.log('5=',(this.filters.upTimeFormat[0]).toLocaleString().slice(0,10))//2017/3/30
//				console.log('6=',(this.filters.upTimeFormat[1]).toLocaleString().slice(0,10))//2017/3/30
//				console.log('7=',(this.filters.upTimeFormat[0]).toUTCString())//Sun, 02 Apr 2017 16:00:00 GMT
//				console.log('8=',(this.filters.upTimeFormat[0]).toLocaleDateString())//2017/4/3 
//				var fff=this.filters.upTimeFormat[0];
//				var ddd=this.filters.upTimeFormat[1];
//				
//				function daysBetween(DateOne,DateTwo)  
//				{   
//				    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
//				    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
//				    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
//				  
//				    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
//				    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
//				    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
//				  
//				   console.log(TwoDay)
//				   console.log(OneDay)
//				}  
//				daysBetween(fff,ddd)
				
				
				
				var that=this;
				console.log('是否为空=1',this.filters.upTimeFormat)
				var time=this.filters.upTimeFormat;
				function isBigEnough(element, index, array) {
					console.log('什么什么',element)
					if(element != null){
						var startDate = that.filters.upTimeFormat[0].toLocaleDateString().replace(/\//g, '-');
						var endDate = that.filters.upTimeFormat[1].toLocaleDateString().replace(/\//g, '-');
						that.filters.dateStart=startDate;
						that.filters.dateEnd=endDate;
						that.getUsers();
						console.log( 'daystart:',startDate);
						console.log( 'dayend:',endDate);
					}else{
						that.filters.upTimeFormat='';
						that.filters.dateStart='';
						that.filters.dateEnd='';
						console.log("what----");
						that.getUsers();
					}
				}
				var Timedate=time.filter(isBigEnough);
			},
			//类型匹配
			splx:function(){
				var dataTow = this.optionsTow[ this.value2 ];
					if(this.value2==0){
						this.filters.orderState='';
						console.log('全部=',this.filters.orderState)
						this.getUsers();
						return;
					}
					this.value2==1?this.filters.orderState=5:this.filters.orderState=7;
					this.getUsers();
					console.log('类型4=',dataTow)
			},
			//选中
			selsChange: function (sels) {
						this.sels = sels;
			},
			//导出、全部导出============
			putup:function(){
				var ids = this.sels.map(item => item.id).toString();
				var that=this;
				this.$confirm('确认导出吗？', '提示', {
					type: 'warning'
				}).then(() => {
			        	window.location.href=host.host+'/cms/ordersManage/exportOrderInfo?ids='+ids;
//					     that.sels=[];       
			    }).catch(() => {
					
				});;
			},
			putAll:function(){
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认全部导出吗？', '提示', {
					type: 'warning'
				}).then(() => {
					window.location.href=host.host+'/cms/ordersManage/exportOrderInfo?ids=';
				}).catch(() => {

				});
			}
		},
		beforeMount:function(){
			this.getTotal();
		},
		mounted() {
			this.getUsers();
			$(".cell").css({"color":" #0066CC"})
		    $(".el-dialog__headerbtn").click(function(){
		  		$('.show').css({"display":"none"})
				$('.hidde').css({"display":"block"})
		    })
//		 console.log(com_map)
		    $(".el-checkbox__label").css({"font-size":"12px"})
		},
		beforeUpdate: function () {
			console.log('组件  update before');
        },
		updated: function () {
	       $(".cell").css({"padding":"0","text-align":"center"})
	      
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
	    	padding-left:12px ;
	    }
		strong:nth-child(2),
		strong:nth-child(3){
			border: none;
			padding-right: 30px;
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
		font-size: 14px;
		padding:0 30px;
		margin: 15px 0 15px 15px;
		border-right:1px solid #505458;
	}
	.breadcrumb-inner {
		float: right;
	}
}
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
		.cell{
			background-color: #0066CC;
		}
		.infoe{
			border: 1px solid #dcdcdc;
			padding: 1rem;
			p{
				padding: 0;
				margin: 0;
				border-bottom: 1px solid #dcdcdc;
				padding-bottom: 1rem;
			}
		}
		.inTop{
			height: 2rem;
			width: 100%;
			padding-left: 1rem;
			>li{
				float: left;
				font-size: 1.2rem;
				line-height: 2rem;
			}
			li:first-child{
					width:35% ;
				}
				li:nth-child(2){
					width: 35%;
				}
				li:nth-child(3){
					width: 30%;
				}
		}
		.suss{
			border: 1px solid #dcdcdc;
			margin: 1rem 0;
			padding-bottom: 2rem;
			p{
				margin: 0;
				padding: 0;
				padding: .5rem;
				font-size: 1.2rem;
			}
			p:first-child{
				padding-top: 1rem;
			}
		}
		.detilsTop{
			margin-top: -2rem;
			padding: 1rem;
			background-color: #dcdcdc;
		}
</style>