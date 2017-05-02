<template>
	<section >
		<el-col :span="24" class="breadcrumb-container">
			<span class="left" style="float: left;">
				<!--<strong class="title">{{$route.name}}</strong>-->
				<strong class="title">商品总数：{{this.Total.sum}}</strong>
				<strong class="title">虚拟类：{{this.Total.virtual}}</strong>
				<strong class="title">爆款：{{this.Total.Vexp}}</strong>
				<strong class="title">实物类：{{this.Total.physical}}</strong>
				<strong class="title">爆款：{{this.Total.Pexp}}</strong>
			</span>
			<span class="right" style="float: right;">
				<strong class="title">在售商品:{{this.Total.insale}}</strong>
				<strong class="title">未上架:{{this.Total.noshel}}</strong>		
				
			<!--<el-breadcrumb separator="/" class="breadcrumb-inner">
				<el-breadcrumb-item v-for="item in $route.matched">
					{{ item.name }}
				</el-breadcrumb-item>
			</el-breadcrumb>-->
			
			</span>
		</el-col>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
			<el-form :inline="true" :model="filters">
				商品类型 &nbsp; <el-select v-model="value" filterable placeholder="请选择" @change="isInvented" size="small" class="filtrate" style="width: 100px;">
						    <el-option
						      v-for="(item,index) in options"
						      :label="item.label"
						      :value="index"
						      
						      :disabled="item.disabled">
						    </el-option>
						  </el-select>
						 &nbsp; 状态 &nbsp; <el-select v-model="value2" filterable placeholder="请选择"  @change="splx" size="small" style="width: 100px;">
						    <el-option
						      v-for="(item,index) in optionsTow"
						      :label="item.label"
						      :value="index">
						    </el-option>
						  </el-select>
						  <!-- `checked` 为 true 或 false单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍 -->
						   <el-checkbox v-model="checked" @change="boll" size="small" style="padding: 0 10px;font-size: 12px !important;color: #999;">爆款</el-checkbox>
						<!--筛选信息-->
						<!--日期选择-->
							<div class="block" style="display: inline-block;">
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
						
							<el-input v-model="filters.name1  " size="small" placeholder="请输入商品名" icon="search" :on-icon-click="getUsers" style="width:260px;margin-left: 10px;"></el-input>
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
		<el-table :data="users"    highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="140">
			</el-table-column>
			<el-table-column prop="masterImg" v-demo  label="商品图" width="80" class="qqqq">
			</el-table-column>
			<el-table-column prop="name1" label="商品名称" width="200">
			</el-table-column>
			<el-table-column prop="isInventedProduct" label="类型" width="60" :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="mallIntegralPrice" label="售价" width="80">
			</el-table-column>
			<el-table-column prop="isHomeUp" label="爆款" :formatter="formatExp" width="80"><!-- :formatter="formatSex"Burst sort-->
			</el-table-column>
			<el-table-column prop="homeUpOrderno" label="爆款排序"  width="80">
			</el-table-column>
			<el-table-column prop="productStock" label="库存" width="60">
			</el-table-column>
			<el-table-column prop="actualSales" label="销量" width="60">
			</el-table-column>
			<el-table-column prop="upTimeFormat" label="发布时间" width="80">
			</el-table-column>
			<el-table-column prop="state" label="状态"  :formatter="formatBurst" width="80"><!-- sortable-->
			</el-table-column>
			<!--<el-table-column prop="addr" label="地址" min-width="80" sortable>
			</el-table-column>-->
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleHomeUp(scope.$index, scope.row)">爆款设置</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination
				layout="total, sizes, prev, pager, next, jumper" 
				:page-sizes="[10]" 
				@size-change="handleSizeChange" 
				@current-change="handleCurrentChange" 
				
				:current-page="currentPage"
				:total="total" style="float:right;">
			</el-pagination><!--sizes  :page-sizes="[20, 30, 40, 50]"更改见mock.js:page-size="page"   -->
		</el-col>
<!--设置爆款页面-->
		<el-dialog :title="updateBoll" size="tiny" v-model="updateFormVisible" :close-on-click-modal="false">
			<div class="hidde">
				<el-form :model="updateForm" label-width="80px" ref="updateForm">
					<div class="showBoll">
						<el-form-item label="爆款价:" prop="homeUpPrice" >
							<el-input v-model="updateForm.homeUpPrice"  size="small" style="width: 80px;padding-right:10px ;"></el-input>积分
						</el-form-item>
						<el-form-item label="爆款排序:" prop="orderNo">
							<el-input v-model="updateForm.orderNo"  size="small" style="width: 80px;"></el-input>
						</el-form-item>
					</div>
					<div class="noBoll">
						<el-form-item label="商品原价:" prop="homeUpPrice">
							<el-input v-model="updateForm.homeUpPrice"  size="small" style="width: 80px;"></el-input>
						</el-form-item>
					</div>
					
				</el-form>
			</div>
					<div slot="footer" class="dialog-footer">
						<el-button @click.native="editFlase">取消</el-button>
						<el-button type="primary" @click.native="updateSubmit" :loading="updateLoading">确定</el-button>
					</div>
		</el-dialog>

<!--编辑界面-->
		<el-dialog title="查看/编辑" size="large" v-model="editFormVisible" :close-on-click-modal="false">
			<div class="hidde">
				<el-tabs type="border-card" v-model="activeName">
							<el-tab-pane label="基本信息" name="first" class="le"><!-- :disabled="nextTba=true"-->
											  	
							<el-form :model="editForm" label-width="100px" ref="editForm">
								<el-form-item label="商品名称" prop="name1">
									<el-input v-model="editForm.name1" :maxlength="30" autosize type="textarea" :disabled="true"></el-input>
								</el-form-item>
								<!--开始-->
								
									<!--ID-->
									<div class="isIDname" style="width: 100%;overflow: hidden;">
										<el-form-item label="商品编号:" prop="id">
											<el-input v-model="editForm.id" autosize :maxlength="40" style="width: 340px;" :disabled="true"></el-input>
										</el-form-item>
										<el-form-item label="接口ID:" prop="inventedProductOutsiderId">
											<el-input v-model="editForm.inventedProductOutsiderId" autosize :maxlength="40" style="width: 340px;" :disabled="true"></el-input>
										</el-form-item>
									</div>
								
								<!---->
								
								<div class="type_sel" style="width: 100%;overflow: hidden;">
									<el-form-item label="分类:" prop="isInventedProduct" style="float: left;">
										<el-input v-model="this.isInventedProduct"  size="small"  style="width: 100px;" :disabled="true"></el-input>
									</el-form-item>
									
									<el-form-item label="提供商:" prop="inventedProductOutsiderBusiness" style="float: left;">
										<el-input v-model="this.updateBus"  size="small"  style="width: 120px;" :disabled="true"></el-input>
									</el-form-item>
									
									<el-form-item label="类型:" prop="productTypeId" style="float: left;">
										<el-input v-model="this.productId"  size="small"  style="width: 150px;" :disabled="true"></el-input>
									</el-form-item>
									<div class="sta">{{this.upState}}</div>
								</div>
																	<!--价格设定-->
									<div class="price_set" style="width: 100%;overflow: hidden;">
										<el-form-item label="市场价:" prop="marketPrice" style="float: left;">
											<el-input v-model="editForm.marketPrice"  size="small" style="width: 8rem;padding-right: .5rem;z-index: 22;" :disabled="true"></el-input>
										</el-form-item>
									
										<el-form-item label="售价:" prop="mallIntegralPrice" style="float: left;">
											<el-input v-model="editForm.mallIntegralPrice"  size="small" style="width: 8rem;padding-right: .5rem;z-index: 22;" :disabled="true"></el-input>积分
										</el-form-item>
										<el-form-item label="数量:" prop="productStock"  style="float: left;">
											<el-input v-model="editForm.productStock"  size="small" style="width: 8rem;padding-right:  .5rem;z-index: 22;" :disabled="true"></el-input>件
										</el-form-item>
										<!--<el-form-item  prop="isHomeUp"  style="float: left;">
										  <el-input v-model="editForm.isHomeUp" size="small" style="width: 8rem;" :disabled="true"></el-input>
										</el-form-item>-->
										<div class="isHomeUp"  style="float: left;z-index: 22;height: 3.6rem;line-height: 3.6rem;width: 8rem;text-align: center;margin-left: 2rem;">
											{{this.isHomeUpTow}}
										</div>
										<el-form-item label="爆款排序:" prop="homeUpOrderno">
											<el-input v-model="editForm.homeUpOrderno"  size="small" style="width: 8rem;padding-right: .5rem;" :disabled="true"></el-input>
										</el-form-item>
									</div>
								<!--开始二-->
								
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
								<el-form-item label="已售:" prop="actualSales"  style="float: left;">
									<el-input v-model="editForm.actualSales"  size="small" style="width: 80px;padding-right: 10px;z-index: 22;" :disabled="true"></el-input>件
								</el-form-item>
								<el-form-item label="发布时间:" prop="upTimeFormat"  style="float: left;">
									<el-input v-model="editForm.upTimeFormat"  size="small" :disabled="true"></el-input>
								</el-form-item>
							</el-form>
						  </el-tab-pane>
								<!--结束二-->
							<el-tab-pane label="商品详情" name="second"><!-- :disabled="nextTba=true"-->
											  
							  		<div class="crad" style="width: 70%;float: left;height: 36.4rem;border: 1px solid #DCDCDC;overflow-y: scroll;">
							  			{{this.editForm.description}}
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
					 		<div slot="footer" class="dialog-footer">
								<el-button @click.native="editFlase">取消</el-button>
								<el-button @click.native="handleETow">编辑</el-button>
							</div>
			</div>
			<div class="show" style="display: none;">
				
			
			<el-tabs type="border-card" v-model="activeName">
							  <el-tab-pane label="基本信息" name="first" class="le">
							  	<el-form :model="editForm" label-width="100px" ref="editForm">
									<el-form-item label="商品名称:" prop="name1">
										<el-input v-model="editForm.name1" :maxlength="40" autosize></el-input>
									</el-form-item>
									
									<!--ID-->
									<div class="isIDname" style="width: 100%;overflow: hidden;">
										<el-form-item label="商品编号:" prop="id">
											<el-input v-model="editForm.id" autosize :maxlength="40" style="width: 340px;"></el-input>
										</el-form-item>
										<el-form-item label="接口ID:" prop="inventedProductOutsiderId">
											<el-input v-model="editForm.inventedProductOutsiderId" autosize :maxlength="10" style="width: 340px;"></el-input>
										</el-form-item>
									</div>
									
									<!--分类-->
									<div class="type_sel" style="width: 100%;overflow: hidden;">
										<el-form-item label="分类:" prop="isInventedProduct" style="float: left;">
											 <el-select v-model="valueSex" filterable :placeholder="this.isInventedProduct"  @change="isInventedSex" size="small" class="filtrate" style="width: 100px;">
											    <el-option
											      v-for="(item,index)  in optionSex"
											      :label="item.label"
											      :value="index"
											      :disabled="item.disabled">
											    </el-option>
										  </el-select>
										</el-form-item>
									
										<el-form-item label="提供商:" prop="inventedProductOutsiderBusiness" style="float: left;">
											 <el-select v-model="valueCompany" filterable :placeholder="this.updateBus" @change="isInventedCompany" size="small" class="filtrate" style="width: 120px;">
											    <el-option
											      v-for="(item,index)  in optionCompany"
											      :label="item.label"
											      :value="index"
											      :disabled="item.disabled">
											    </el-option>
										  </el-select>
										</el-form-item>
									
										<el-form-item label="类型:" prop="inventedProductOutsiderBusiness" style="float: left;">
											 <el-select v-model="valueType" filterable :placeholder="this.productId" size="small" class="filtrate" style="width: 150px;">
											    <el-option
											      v-for="(item,index)  in optionType"
											      :label="item.label"
											      :value="index"
											      :disabled="item.disabled">
											    </el-option>
										  </el-select>
										</el-form-item>
									</div>
									<!--价格设定-->
									<div class="price_set" style="width: 100%;overflow: hidden;">
										<el-form-item label="市场价:" prop="marketPrice" style="float: left;">
											<el-input v-model="editForm.marketPrice"  size="small" style="width: 8rem;padding-right: .5rem;z-index: 22;"></el-input>
										</el-form-item>
									
										<el-form-item label="售价:" prop="mallIntegralPrice" style="float: left;">
											<el-input v-model="editForm.mallIntegralPrice" :maxlength="8"  size="small" style="width: 8rem;padding-right: .5rem;z-index: 22;"></el-input>积分
										</el-form-item>
										<el-form-item label="数量:" prop="productStock"  style="float: left;">
											<el-input v-model="editForm.productStock"  size="small" :maxlength="8" style="width: 8rem;padding-right:  .5rem;z-index: 22;"></el-input>件
										</el-form-item>
										<el-form-item  prop="isHomeUp2"  style="float: left;">
										  <el-checkbox v-model="checkedNew" @change="bollNew" style="padding: 0 .5rem;">设为爆款</el-checkbox>
										</el-form-item>
										<el-form-item label="爆款排序:" prop="homeUpOrderno">
											<el-input v-model="editForm.homeUpOrderno"  size="small" :maxlength="6" style="width: 8rem;padding-right: .5rem;"></el-input>
										</el-form-item>
									</div>
									
									<el-form-item label="立即上架:">
										<el-radio-group v-model="editForm.state">
											<el-radio class="radio" :label="6">是</el-radio>
											<el-radio class="radio" :label="7">否</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="商品图:">
										<el-upload
										  action="http://10.48.154.203/loyaltyApp/cms/productmanage/uploadFile"
										  list-type="picture-card"
										  :file-list="fileList"
										  :on-preview="handlePictureCardPreview"
										  :on-success="handleSuccess"
										  name="file"
										  :on-remove="handleRemove">
										  <i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog v-model="dialogVisible" size="tiny">
										  <img width="100%" :src="dialogImageUrl" alt="">
										</el-dialog>
									</el-form-item>
								</el-form>
							  </el-tab-pane>
							  <el-tab-pane label="商品详情" name="second">
							  		<div class="crad" style="width: 70%;float: left;">
								  		 <quill-editor ref="myTextEditor"
								                		class="qu"
								                      :options="editorOption"
								                      @blur="onEditorBlur($event)"
								                      @focus="onEditorFocus($event)"
								                      @ready="onEditorReady($event)"
								                      @change="onEditorChange($event)">
								        </quill-editor>
							  			 <div slot="tip" class="el-upload__tip" style="padding-left:20px ;">还可上传{{this.imgCount}}KB图片；{{this.btCont}}文字</div>
							  		</div>
							  		<div class="imgrc" style="width: 30%;height:364px;float: right;border: 1px solid #DCDCDC;border-left:none;margin-left:-2px ;overflow-y: scroll;">
							  			<el-upload
										  class="upload-demo"
										  action="http://10.48.154.203/loyaltyApp/cms/productmanage/uploadFile"
										  :on-preview="handlePreview"
										  :on-remove="handleRemove"
										  :on-success="handleSuccessTow"
										  :file-list="fileList2"
										  list-type="picture">
										  
											  <el-button size="small" type="primary" style="margin-top: 20px;margin-left: 20px;">添加图片</el-button>
											  
										</el-upload>
							  		</div>
							  </el-tab-pane>
						</el-tabs>
							<div slot="footer" class="dialog-footer" style="padding: 2rem;float: right;">
								<el-button @click.native="editFlase">取消</el-button>
								<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
							</div>
			</div>
					
		</el-dialog>
<!--编辑页面结束-->
		<!--新增界面-->
		  
					<el-dialog title="添加商品" size="large" v-model="addFormVisible" :close-on-click-modal="false">
						
						<el-tabs type="border-card" v-model="activeName">
							  <el-tab-pane label="基本信息" :disabled="nextTba=true" name="first" class="le">
							  	<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
									<el-form-item label="商品名称:" prop="name1">
										<el-input v-model="addForm.name1" :maxlength="40" autosize></el-input>
									</el-form-item>
									
									<!--ID-->
									<div class="isIDname" style="width: 100%;overflow: hidden;">
										<el-form-item label="商品编号:" prop="productCode">
											<el-input v-model="addForm.productCode" autosize :maxlength="40" style="width: 340px;"></el-input>
										</el-form-item>
										<el-form-item label="接口ID:" prop="inventedProductOutsiderId">
											<el-input v-model="addForm.inventedProductOutsiderId" autosize :maxlength="10" style="width: 340px;"></el-input>
										</el-form-item>
									</div>
									
									<!--分类-->
									<div class="type_sel" style="width: 100%;overflow: hidden;">
										<el-form-item label="分类:" prop="isInventedProduct" style="float: left;">
											 <el-select v-model="valueSex" filterable placeholder="请选择"  @change="isInventedSex" size="small" class="filtrate" style="width: 100px;">
											    <el-option
											      v-for="(item,index)  in optionSex"
											      :label="item.label"
											      :value="index"
											      :disabled="item.disabled">
											    </el-option>
										  </el-select>
										</el-form-item>
									
										<el-form-item label="提供商:" prop="inventedProductOutsiderBusiness" style="float: left;">
											 <el-select v-model="valueCompany" filterable placeholder="请选择" @change="isInventedCompany" size="small" class="filtrate" style="width: 120px;">
											    <el-option
											      v-for="(item,index)  in optionCompany"
											      :label="item.label"
											      :value="index"
											      :disabled="item.disabled">
											    </el-option>
										  </el-select>
										</el-form-item>
									
										<el-form-item label="类型:" prop="productTypeId" style="float: left;">
											 <el-select v-model="valueType" filterable placeholder="请选择" @change="proTypeId"  size="small" class="filtrate" style="width: 150px;">
											    <el-option
											      v-for="(item,index)  in optionType"
											      :label="item.label"
											      :value="index"
											      :disabled="item.disabled">
											    </el-option>
										  </el-select>
										</el-form-item>
									</div>
									<!--价格设定-->
									<div class="price_set" style="width: 100%;overflow: hidden;">
										<el-form-item label="市场价:" prop="marketPrice" style="float: left;">
											<el-input v-model="addForm.marketPrice"  size="small" :maxlength="8" style="width: 8rem;padding-right: .5rem;z-index: 22;"></el-input>
										</el-form-item>
									
										<el-form-item label="售价:" prop="mallIntegralPrice" style="float: left;">
											<el-input v-model="addForm.mallIntegralPrice"  size="small" :maxlength="8" style="width: 8rem;padding-right: .5rem;z-index: 22;"></el-input>积分
										</el-form-item>
										<el-form-item label="数量:" prop="productStock"  style="float: left;">
											<el-input v-model="addForm.productStock"  size="small" :maxlength="8" style="width: 8rem;padding-right:  .5rem;z-index: 22;"></el-input>件
										</el-form-item>
										<el-form-item  prop="isHomeUp2"  style="float: left;">
										  <el-checkbox v-model="checkedNew" @change="bollNew" style="padding: 0 .5rem;">设为爆款</el-checkbox>
										</el-form-item>
										<el-form-item label="爆款排序:" prop="homeUpOrderno">
											<el-input v-model="addForm.homeUpOrderno"  size="small" :maxlength="6" style="width: 8rem;padding-right: .5rem;"></el-input>
										</el-form-item>
									</div>
									
									<el-form-item label="立即上架:">
										<el-radio-group v-model="addForm.state">
											<el-radio class="radio" :label="6">是</el-radio>
											<el-radio class="radio" :label="7">否</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="商品图:">
										<el-upload
										  action="http://10.48.154.203/loyaltyApp/cms/productmanage/uploadFile"
										  list-type="picture-card"
										  :file-list="fileList"
										  :on-preview="handlePictureCardPreview"
										  :on-success="handleSuccess"
										  name="file"
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
							  		<div class="crad" style="width: 70%;float: left;">
								  		 <quill-editor ref="myTextEditor"
								                		class="qu"
								                      :options="editorOption"
								                      @blur="onEditorBlur($event)"
								                      @focus="onEditorFocus($event)"
								                      @ready="onEditorReady($event)"
								                      @change="onEditorChange($event)">
								        </quill-editor>
							  			 <div slot="tip" class="el-upload__tip" style="padding-left:20px ;">还可上传{{this.imgCount}}KB图片；{{this.btCont}}文字</div>
							  		</div>
							  		<div class="imgrc" style="width: 30%;height:364px;float: right;border: 1px solid #DCDCDC;border-left:none;margin-left:-2px ;overflow-y: scroll;">
							  			<el-upload
										  class="upload-demo"
										  action="http://10.48.154.203/loyaltyApp/cms/productmanage/uploadFile"
										  :on-preview="handlePreview"
										  :on-remove="handleRemove"
										  :on-success="handleSuccessTow"
										  :file-list="fileList2"
										  list-type="picture">
										  
											  <el-button size="small" type="primary" style="margin-top: 20px;margin-left: 20px;">添加图片</el-button>
											  
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
	import host from '../../common/js/configurl'
	//import NProgress from 'nprogress'
//	import {getTotal, getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	export default {
		data() {
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
				fileList:[],
				//批量上传图片 [{name: '', url: ''}, {name: '', url: ''}]
				fileList2:[],
				btCont:5000,//文字可传数量
				imgSize:[],//图片可传大小
				imgCount:2560,
				//====编辑器设置
				editorOption: {
					
				},
				updateBoll:'',//设为爆款或者取消爆款
				description:'',//新增编辑器商品描述
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
			              console.log(start, end)
			            }
		          	}, {
			            text: '最近一个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			              picker.$emit('pick', [start, end]);
			              console.log(start, end)
			            }
		          	}, {
			            text: '最近三个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			              picker.$emit('pick', [start, end]);
			              console.log(start, end)
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
		        optionSex:[{
		          value: '选项1',
		          label: '实物类',
		          disabled: true
		        }, {
		          value: '选项2',
		          label: '虚拟类'
		        }],
		        optionCompany:[{
		          value: '选项1',
		          label: '京东e卡'
		        }, {
		          value: '选项2',
		          label: '电信E联盟'
		        }
		        ],
		        optionType:[{
		          value: '选项1',
		          label: '视频类',
		          disabled:false
		        },{
		          value: '选项2',
		          label: '出行类',
		          disabled:false
		        }, {
		          value: '选项3',
		          label: '生活类',
		          disabled:false
		        }, {
		          value: '选项4',
		          label: '京东E卡',
		          disabled:false
		        }],
		        value: '',
		        value2:'',
		        value3:'',
		        valueSex:'',
		        valueCompany:'',
		        valueType:'',
		        checked: false,
		        checkedNew:false,//新增爆款状态啊
		        //测试===结束
				filters: {
					isInventedProduct:'',//商品类型
					state:'',//商品状态
					isHomeUp:'',// 爆款标志
					upTimeFormat:'',//
					name1: '',//商品名
					startTime:'',//开始时间
					endTime:''//结束时间
				},
				IDs:'',
				operateType:'',
				users: [],
				total: 0,
				page: 1,
				currentPage:1,//=====================首先显示第几页======================
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				updateFormVisible:false,//爆款界面是否显示
				editLoading: false,
				updateLoading: false,
//				editFormRules: {
//					name: [
//						{ required: true, message: '请输入姓名', trigger: 'blur' }
//					]
//				},
				//爆款界面数据
				updateForm:{
					homeUpPrice:'',//爆款价
					orderNo:'',//爆款排序
				},
					productId:'',//商品ID
				optType:'',
				//编辑界面数据
				editForm: {
					id:'',
					name1:'',//商品名称
					inventedProductOutsiderId:'',//虚拟商品第三方接口对应专属商品id
					marketPrice:'',//市场价
					mallIntegralPrice:'',//售价（积分）
					productStock:'',//商品库存
					isInventedProduct:'',//是否虚拟商品
					masterImg:'',//商品图片路径
					isHomeUp2:'',//是否爆款
					productCode:'',//商品编号
					homeUpOrderno:'',//爆款顺序号
					state:'',//商品上下架状态
					actualSales:'',//实际销量
					imgPaths:'',
					upTimeFormat:'',//上架时间
					detailImg:'',
					inventedProductOutsiderBusiness:'',//商家
					productTypeId:'',//最后一级分类
					description:''//商品描述
				},
				isHomeUpTow:'',//是否爆款
				isInventedProduct:'',//是否虚拟商品
				upState:'',//商品是否上架
				updateBus:'',//商家 京东E卡、电信E联盟
				productId:'',//京东e卡、生活类、出行类、视频类
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
				moreImageUrl:'',
				imageUrl:[],
				dialogImageName:'',
        		dialogVisible: false,
				//新增界面数据
				addForm: {
					name1:'',//商品名称
					inventedProductOutsiderId:'',//虚拟商品第三方接口对应专属商品id
					marketPrice:'',//市场价
					mallIntegralPrice:'',//售价（积分）
					productStock:'',//商品库存
					isInventedProduct:'',//是否虚拟商品
					masterImg:'',//商品图片路径
					isHomeUp2:'',//是否爆款
					productCode:'',//商品编号
					homeUpOrderno:'',//爆款顺序号
					state:'',//商品上下架状态
					imgPaths:'',
					detailImg:'',
					inventedProductOutsiderBusiness:'',//商家
					productTypeId:''//商品第三级分类：生活类、京东e卡、视频类、出行类
				}
			}
		},
		methods: {
			//编辑器使用
			onEditorBlur({ editor, html, text }) {
		        console.log('editor blur=1  !',editor)
		        console.log('editor blur=2 !',html)
		        console.log('editor blur=3 !',text)
		     },
		    onEditorFocus(editor) {
		        console.log('editor focus!', editor)
		     },
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
		    onEditorChange({ editor, html, text }) {
		      // console.log('editor change!', editor, html, text)
		     	console.log('onEditorChange blur=1  !',editor)
		        console.log('onEditorChange blur=2 !',html)
		        console.log('onEditorChange blur=3 !',text)
		        this.description=text;
		        console.log('this is option ',this.editorOption)
				 console.log('this is my editor', this.editor)
				console.log(this.description)
				var des=this.description;
				 //判断字符串所占的字节数
//		        function GetCharLength(str){
//		            var iLength = 0;  //记录字符的字节数
//		            for(var i = 0;i<str.length;i++) {//遍历字符串中的每个字符
//		                if(str.charCodeAt(i) >255) {  //如果当前字符的编码大于255(strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)
//		                    iLength += 2;    //所占字节数加2
//		                } else{
//		                    iLength += 1;   //否则所占字节数加1
//		                }
//		            }
//		            return iLength;   //返回字符所占字节数
//		        }
				var btNum=5000;
				var byteCount=des.length-1;//占用字节数
				console.log('字符串占用字节数===',byteCount)
				var that=this;
				this.btCont=btNum-byteCount;
				if(this.btCont<0){///============================---------------------------------------=============================
					this.$confirm('已超出文字最大容量', '提示', {
						type: 'error'
					}).then(() => {
						
					}).catch(() => {
	
					});   
					return;
				}
		    },
			//类型显示转换
			formatSex: function (row, column) {
				return row.isInventedProduct == 1 ? '实物类' : row.isInventedProduct == 2 ? '虚拟类' : '未知';
			},
			//爆款显示转换
			formatExp: function (row, column) {
				return row.isHomeUp == 2 ? '是' : row.isHomeUp ==1 ? ' ' : '';
			},
			//商品状态
			formatBurst: function (row, column) {
				return row.state == 6 ?"正常": row.state == 7 ? "未上架": "未上架";
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
//==========获取商品列表=====
			getUsers() {
				console.log('this is host',host.host)
				var url =host.host+'/cms/productmanage/getListBySearch';
//				var url ='http://10.48.154.203/loyaltyApp/cms/productmanage/getListBySearch';	
				var _this = this;
			    $.ajax(url, {
			      	xhrFields: {
			           withCredentials: true
			       	},
       				crossDomain: true,
			        data: {  
	//		          'cityname': '',  
	//		          'dtype': 'jsonp',
					isInventedProduct:_this.filters.isInventedProduct,
					state:_this.filters.state,
					isHomeUp:_this.filters.isHomeUp,
					upTimeStart :_this.filters.startTime,
					upTimeEnd:_this.filters.endTime,
					searchInfo:_this.filters.name1,
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
			          	_this.listLoading = false;
			         },
			        error:function(err){
			            alert("请求出错！");
			            console.log(err);
			         }
			    }); 
			},
//==========上下架接口和处理==========
			putInUp(){
				var url = host.host+'/cms/productmanage/updateStateUpByIds';
				var _this = this;
			    $.ajax(url, { 
			      	xhrFields: {
			           withCredentials: true
			       	},
       				crossDomain: true,
			        data: { 
						ids:_this.IDs,
						operateType:_this.operateType
			        },  
			        type : "POST",
			        dataType:"json",
			        success:function(data1){
	//		          	_this.page++;
			          	console.log('data1=',data1)
			          	_this.getUsers();
			         },
			        error:function(err){
			            alert("请求出错！");
			            console.log(err);
			         }
			    }); 
			},
//			get_Total(){
//				getTotal(para).then((res) => {
//					console.log(res)
//				})
//			},
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
				console.log('是否为空=1',this.filters.upTimeFormat)
				var time=this.filters.upTimeFormat;
				function isBigEnough(element, index, array) {
					console.log('什么什么',element)
					if(element != null){
						var startDate = that.filters.upTimeFormat[0].toLocaleDateString().replace(/\//g, '-');
						var endDate = that.filters.upTimeFormat[1].toLocaleDateString().replace(/\//g, '-');
						that.filters.startTime=startDate;
						that.filters.endTime=endDate;
						that.getUsers();
						console.log( 'daystart:',startDate);
						console.log( 'dayend:',endDate);
					}else{
						that.filters.upTimeFormat='';
						that.filters.startTime='';
						that.filters.endTime='';
						that.getUsers();
					}
				}
				var Timedate=time.filter(isBigEnough);
			},
			//商品类型
			isInvented:function(){
				var data = this.options[ this.value ];
				console.log(this.value)
				this.value==0?this.filters.isInventedProduct='':this.filters.isInventedProduct=2;
				this.getUsers();
			},
			//新增商品类型匹配
			isInventedSex:function(){//-=============================================================================================
				var data = this.optionSex[ this.valueSex];
				console.log(this.valueSex)
				this.valueSex==0?this.addForm.isInventedProduct=1:this.addForm.isInventedProduct=2;
//				this.getUsers();
			},
			
			//提供商类型匹配8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
			isInventedCompany:function(){
				var data = this.optionCompany[ this.valueCompany];
				console.log('提供商分类：',this.valueCompany)
				this.valueCompany==0?this.addForm.inventedProductOutsiderBusiness=2:this.addForm.inventedProductOutsiderBusiness=3;	
					
				if(this.valueCompany==0){
					this.addForm.inventedProductOutsiderBusiness=2;
					if(this.addForm.inventedProductOutsiderBusiness=2){
						console.log(this.optionType)//disabled
						this.optionType[0].disabled=true;
						this.optionType[1].disabled=true;
						this.optionType[2].disabled=true;
						this.optionType[3].disabled=false;
					}
				}else if(this.valueCompany==1){
					this.addForm.inventedProductOutsiderBusiness=3;
					this.optionType[3].disabled=true;
					this.optionType[0].disabled=false;
					this.optionType[1].disabled=false;
					this.optionType[2].disabled=false;
				}else{
					this.optionType[3].disabled=true;
					this.optionType[0].disabled=true;
					this.optionType[1].disabled=true;
					this.optionType[2].disabled=true;
				}
				
			},
			proTypeId:function(){
				var data = this.optionCompany[ this.valueType];
				console.log(this.valueType)
				this.valueType==0?this.addForm.productTypeId=1:this.valueType==1?this.addForm.productTypeId=2:this.valueType==2?this.addForm.productTypeId=3:this.addForm.productTypeId=4;	
			},
			//状态匹配
			splx:function(){
					var dataTow = this.optionsTow[ this.value2 ];
					if(this.value2==0){
						this.filters.state='';
						console.log('全部=',this.filters.state)
						this.getUsers();
						return;
					}
					this.value2==1?this.filters.state=6:this.filters.state=7;
					this.getUsers();
					console.log('类型4=',dataTow)
			},
			boll:function(){
				console.log("+++++",this.checked)
				this.checked==false?this.filters.isHomeUp='':this.filters.isHomeUp=2;
				this.getUsers();
			},
			bollNew:function(){
				this.checkedNew==false?this.addForm.isHomeUp2='':this.addForm.isHomeUp2=2;
				this.checkedNew==false?this.editForm.isHomeUp2='':this.editForm.isHomeUp2=2;
			},
//			splxTow:function(){
//				var dataTow = this.optionsTow[ this.value2 ];
//				console.log(dataTow)
//			},
			//删除
			handleDel: function (index, row) {
				console.log('this is rowwww',row)
				var idsCont=row.id;
				console.log('IDSSS',idsCont)
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					var that=this;
		    		var url = host.host+'/cms/productmanage/updateStateDeleteByIds';  
					 $.ajax(url, { 
				      	xhrFields: {
				           withCredentials: true
				       	},
	       				crossDomain: true,
				        data: {
				        		ids:idsCont
				        },  
				        type : "POST",
				        dataType:"json",
				        success:function(data1){
				          	//JSON.stringify()
				          console.log("成功")
				          that.listLoading = false;
							that.getUsers();
		          		},
				         error:function(err){
				            alert("请求出错！");
				            console.log(err);
				         },
		        		crossDomain: true
		         	});  
					//NProgress.start();
//					let para = { id: row.id };
//					removeUser(para).then((res) => {
//						this.listLoading = false;
//						//NProgress.done();
//						this.$message({
//							message: '删除成功',
//							type: 'success'
//						});
//						this.getUsers();
//					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleETow:function(){
				console.log("this is block")
				$('.show').css({"display":"block"})
				$('.hidde').css({"display":"none"})
			},
			handleEdit: function (index, row) {//=========+++++++++++++++++---------%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%55
				console.log('这是编辑时得到的数据===',index)
				console.log('这是编辑时得到的数据==002：',row)
//				row.isHomeUp == 2?this.isHomeUpTow='爆款':this.isHomeUpTow='';
				if (row.isHomeUp == 2) {
					this.isHomeUpTow='爆款';
					this.checkedNew=true;
				} else{
					this.isHomeUpTow='';
					this.checkedNew=false;
				}
				if (row.isInventedProduct == 2) {//====设置三级分类查看界面的显示====
					this.isInventedProduct='虚拟类';
					this.valueSex=1;
					var data = this.optionSex[ this.valueSex]
					if(row.inventedProductOutsiderBusiness==2){
						this.updateBus='京东e卡';
						this.productId='京东e卡';
						this.valueCompany=0;
						var data = this.optionCompany[ this.valueCompany];
						this.valueType=3;
						var data = this.optionType[ this.valueType]
					}else if(row.inventedProductOutsiderBusiness==3){
						this.updateBus='电信E联盟';
						this.valueCompany=1;
						var data = this.optionCompany[ this.valueCompany]
						if(row.productTypeId==1){
							this.productId='视频类';
							this.valueType=0;
							var data = this.optionType[ this.valueType]
						}else if(row.productTypeId==2){
							this.productId='出行类';
							this.valueType=1;
							var data = this.optionType[ this.valueType]
						}else if(row.productTypeId==3){
							this.productId='生活类';
							this.valueType=2;
							var data = this.optionType[ this.valueType]	
						}
					}
					
				} else{
					this.isInventedProduct=''
				}
				row.state==6?this.upState='已上架':this.upState='未上架';
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示设为爆款页面
			handleHomeUp:function (index, row) {
				this.updateFormVisible = true;
				this.productId=row.id;
				row.isHomeUp==2?this.updateBoll='取消爆款':this.updateBoll='设为爆款'	;
				row.isHomeUp==2?this.optType=2:this.optType=1;
				setTimeout(function(){
					if(row.isHomeUp==2){
						///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
						this.checkedNew=true;
						$(".noBoll").show();
						$(".showBoll").hide();
					}else{
						$(".noBoll").hide();
						$(".showBoll").show();
					}
				},10)
				console.log('this is row',row.isHomeUp);
				
				console.log('updte/////',this.productId)
				this.updateForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {//=======================================================++++++++++++++++++++================
//				this.getUsers();
				$(".dialog-footer").css({"display":"none"});	
				this.addFormVisible = true;
				this.activeName='first';
				this.addForm = {
					name1:'',//商品名称
					inventedProductOutsiderId:'',//虚拟商品第三方接口对应专属商品id
					marketPrice:'',//市场价
					mallIntegralPrice:'',//售价（积分）
					productStock:'',//商品库存
					isInventedProduct:'',//是否虚拟商品
					masterImg:'',//商品图片路径
					isHomeUp2:'',//是否爆款
					productCode:'',//商品编号
					homeUpOrderno:'',//爆款顺序号
					state:'',//商品上下架状态
					imgPaths:'',
					detailImg:'',
					inventedProductOutsiderBusiness:'',//商家
					productTypeId:''
				};
				this.description='';
				this.dialogImageUrl='';
				this.imageUrl=[];
				this.fileList=[];
				this.fileList2=[];
				this.moreImageUrl='',
				this.description='',
				this.valueSex='',
		        this.valueCompany='',
		        this.valueType='',
				console.log('this is image===',this.dialogImageUrl)
				console.log('this is inventedProductOutsiderBusiness===',this.addForm.inventedProductOutsiderBusiness)
				
				$(".el-dialog--large").css({"top":"5%"})
			},
			//编辑
			editFlase:function(){
				this.editFormVisible = false;
				this.updateFormVisible = false;
				$('.show').css({"display":"none"})
				$('.hidde').css({"display":"block"})
			},
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
						if (valid) {
							this.$confirm('确认提交吗？', '提示', {}).then(() => {
								this.editLoading = true;
								console.log('ishomeout++',this.editForm.isHomeUp2)
									var that=this;
						    		var url = host.host+'/cms/productmanage/updateProductInfo';  
									 $.ajax(url, { 
								      	xhrFields: {
								           withCredentials: true
								       	},
					       				crossDomain: true,
								        data: {
								        		name1:that.editForm.name1,//商品名称
								        		id:that.editForm.id,
												inventedProductOutsiderId:that.editForm.inventedProductOutsiderId,//虚拟商品第三方接口对应专属商品id
												marketPrice:that.editForm.marketPrice,//市场价
												mallIntegralPrice:that.editForm.mallIntegralPrice,//售价（积分）
												productStock:that.editForm.productStock,//商品库存
												isInventedProduct:that.editForm.isInventedProduct,//是否虚拟商品时间
												masterImg:that.editForm.masterImg,//商品图片路径
												description:that.description,//商品描述==================
												isHomeUp:that.editForm.isHomeUp2,//是否爆款
												productCode:that.editForm.productCode,//商品编号
												homeUpOrderno:that.editForm.homeUpOrderno,//爆款顺序号
												state:that.editForm.state,//商品上下架状态
												imgPaths:that.editForm.imgPaths,//图片路径========================description
												detailImg:that.editForm.detailImg,
												inventedProductOutsiderBusiness:that.editForm.inventedProductOutsiderBusiness,//商家
												productTypeId:that.editForm.productTypeId//商品第三级分类：京东e卡、视频类、生活类、出行类
								        },  
								        type : "POST",
								        dataType:"json",
								        success:function(data1){
								          	//JSON.stringify()
								          console.log("成功")
									          that.editLoading = false;
									          that.$refs['editForm'].resetFields();
											$('.show').css({"display":"none"})
											$('.hidde').css({"display":"block"})
											that.editFormVisible = false;
											
											that.getUsers();
											
						          		},
								         error:function(err){
								            alert("请求出错！");
								            console.log(err);
								         },
						        		crossDomain: true
						         });  
							});
						}
					});
			},
			//爆款设置=================================================------------------------------------------------------------------》》》》》》》》》》》》》
			updateSubmit: function () {
				console.log('爆款排序++',this.updateForm.orderNo);
				console.log('productId===',this.productId)
				this.$refs.updateForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.updateLoading = true;			
							var that=this;
				    		var url =host.host+'/cms/productmanage/updateHomeUp';  
							$.ajax(url, { 
						      	xhrFields: {
						           withCredentials: true
						       	},
			       				crossDomain: true,
						        data: {
						        		orderNo:that.updateForm.orderNo,//爆款排序
										homeUpPrice:that.updateForm.homeUpPrice,//是否是爆款
										optType:that.optType,
										productId:that.productId//爆款ID
						        },  
						        type : "POST",
						        dataType:"json",
						        success:function(data1){
						          	//JSON.stringify()
						          console.log("成功")
						          that.addLoading = false;
						          that.$refs['updateForm'].resetFields();
								  that.updateFormVisible = false;
								  that.updateLoading=false;
									that.getUsers();
				          		},
						         error:function(err){
						            alert("请求出错！");
						            console.log(err);
						         },
				        		crossDomain: true
				        	});  
							//NProgress.start();
//							let para = Object.assign({}, this.editForm);
//							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
//							editUser(para).then((res) => {
//								//====着手点======
//								this.editLoading = false;
//								//NProgress.done();
//								this.$message({
//									message: '提交成功',
//									type: 'success'
//								});
//								this.$refs['editForm'].resetFields();
//								this.editFormVisible = false;
//								this.getUsers();
//							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
//				console.log('this is option ',this.editorOption)
//				 console.log('this is my editor', this.editor)
//				console.log(this.description)
				if(this.btCont<0){
					this.$confirm('信息过大，请简化', '提示', {}).then(() => {
							this.addLoading = false;
					});
					return;
				}else{
					this.$refs.addForm.validate((valid) => {
						if (valid) {
							this.$confirm('确认提交吗？', '提示', {}).then(() => {
								this.addLoading = true;
									var that=this;
						    		var url = host.host+'/cms/productmanage/saveProductInfo';  
									 $.ajax(url, { 
								      	xhrFields: {
								           withCredentials: true
								       	},
					       				crossDomain: true,
								        data: {
								        		name1:that.addForm.name1,//商品名称
												inventedProductOutsiderId:that.addForm.inventedProductOutsiderId,//虚拟商品第三方接口对应专属商品id
												marketPrice:that.addForm.marketPrice,//市场价
												mallIntegralPrice:that.addForm.mallIntegralPrice,//售价（积分）
												productStock:that.addForm.productStock,//商品库存
												isInventedProduct:that.addForm.isInventedProduct,//是否虚拟商品时间
												masterImg:that.addForm.masterImg,//商品图片路径
												description:that.description,//商品描述==================
												isHomeUp:that.addForm.isHomeUp2,//是否爆款
												productCode:that.addForm.productCode,//商品编号
												homeUpOrderno:that.addForm.homeUpOrderno,//爆款顺序号
												state:that.addForm.state,//商品上下架状态
												imgPaths:that.addForm.imgPaths,//图片路径========================description
												detailImg:that.addForm.detailImg,
												inventedProductOutsiderBusiness:that.addForm.inventedProductOutsiderBusiness,//商家
												productTypeId:that.addForm.productTypeId//商品第三级分类：京东e卡、视频类、生活类、出行类
								        },  
								        type : "POST",
								        dataType:"json",
								        success:function(data1){
								          	//JSON.stringify()
								          console.log("成功")
								          that.addLoading = false;
								          that.$refs['addForm'].resetFields();
										  that.addFormVisible = false;
											that.getUsers();
						          		},
								         error:function(err){
								            alert("请求出错！");
								            console.log(err);
								         },
						        		crossDomain: true
						         });  
							});
						}
					});
				}
			},
			//更改状态
			selsChange: function (sels) {
						this.sels = sels;
//						var state = this.sels.map(item => item.state).toString();
//						console.log('更改=',state)
			},
			//上下架============
			putup:function(){
				var self=this;
				var state = this.sels.map(item => item.state);
				console.log('上架=',state)
				//=========数组的处理===========
				function isBigEnough(element, index, array) {
					if(element !=7){
						console.log("不能操作");
						self.$confirm('存在已上架商品，请取消操作！', '提示', {
						type: 'error'
						}).then(() => {
							self.sels ='';
						}).catch(() => {
		
						});
					    return ;
					}else if(element ==7){
						var ids = self.sels.map(item => item.id).toString();
						console.log('ID=',ids)
						self.IDs=ids;
						self.operateType=1;
						console.log('this is ID=',self.IDs);
						self.$confirm('确认上架吗？', '提示', {
							type: 'warning'
						}).then(() => {
							self.putInUp();
						}).catch(() => {
		
						});
					}else if(element ==6){
						self.$confirm('该商品已上架,请取消操作！', '提示', {
						type: 'warning'
						}).then(() => {
							
						}).catch(() => {
		
						});
					}
				}
				var filtered =state.filter(isBigEnough);
				console.log('大于6=',filtered)
			},
			putdown:function(){
				var self=this;
				var state = this.sels.map(item => item.state);
				console.log('下架=',state)
				//=========数组的处理===========
				function isBigEnough(element, index, array) {
					if(element !=6){
						console.log("不能操作");
						self.$confirm('存在已下架商品，请取消操作！', '提示', {
						type: 'error'
						}).then(() => {
							self.sels ='';
						}).catch(() => {
		
						});
					    return ;
					}else if(element ==6){
						var ids = self.sels.map(item => item.id).toString();
						console.log('ID=',ids)
						self.IDs=ids;
						self.operateType=2;
						console.log('this is ID=',self.IDs);
						self.$confirm('确认下架吗？', '提示', {
							type: 'warning'
						}).then(() => {
							self.putInUp();
						}).catch(() => {
		
						});
					}else if(element ==7){
						self.$confirm('该商品已下架,请取消操作！', '提示', {
						type: 'warning'
						}).then(() => {
							
						}).catch(() => {
		
						});
					}
				}
				var filtered =state.filter(isBigEnough);
				console.log('大于6=',filtered)
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
//		        alert(file)
		        console.log('单个图片=',file)
		        this.dialogVisible = true;
		     },
		     handleSuccess(file){
			    //响应成功
			    var that=this;
//			    alert(JSON.stringify(file));
//			    alert(file.status);
//			    alert(file.url);
			    if(file.status =="1"){
			        //保存后端返回来的数据
			        var reg = new RegExp(/\\/g);
//			        that.dialogImageUrl= file.url.substr(50).replace(reg, "\\").replace(/\\/g,"/");
//			        that.dialogImageUrl= file.url.substr(92).replace(reg, "\\").replace(/\\/g,"/");
			        that.dialogImageUrl= file.url.replace(reg, "\\").replace(/\\/g,"/");
			       that.imageUrl.push(that.dialogImageUrl);
			        var imgPat=that.imageUrl;
			       that.addForm.masterImg=that.imageUrl[0];
			        that.addForm.imgPaths=imgPat.toString();
			        console.log('数组=',that.addForm.imgPaths);
			     	console.log(that.imageUrl)
			     	console.log('商品主图++=',that.imageUrl[0])
			        console.log(that.dialogImageUrl)//D:\tools\Tomcat\apacae-tomcat-7\webapps\loyaltyApp\sys_static\sys_upload\Example1\2017-04-14\cc3bd469004343ab85e43037cb5f4be8.png
			       
					that.$confirm('上传成功', '提示', {
						type: 'success'
					}).then(() => {
						
					}).catch(() => {
	
					});  
			   }else{
			    	that.$confirm('上传失败，请稍后重试', '提示', {
					type: 'error'
					}).then(() => {
						
					}).catch(() => {
	
					});   
			      
			    }
			},
		     //批量上传图片
		     handleRemove(file, fileList2) {
		        console.log(file, fileList2);
		      },
		      handlePreview(file) {
		      	this.dialogImageUrl = file.url;
		        console.log('单个图片=',file)
		        this.dialogVisible = true;
		       console.log(file);
		      },
  		     handleSuccessTow(file){
			    //响应成功
			    var that=this;
//			    alert(JSON.stringify(file));
//			    alert(file.status);
//			    alert(file.url);
				this.imgSize.push(file.imgSize);//===================================-----------涉及图片取消上传逻辑未做-----------------------==========================
				var sizeImg=this.imgSize;
				console.log('图片集合：',sizeImg)
				var result = 0;
				var imgsrcSum=2621440;
				for(var i = 0; i < sizeImg.length; i++) {
				       result += sizeImg[i];
				}//
				var Icong=(imgsrcSum-result)/1024;
				this.imgCount=Icong.toFixed(2);
				console.log('图片传的大小++',result);
				if(result<imgsrcSum){
				    if(file.status =="1"){
				        //保存后端返回来的数据
				        var reg = new RegExp(/\\/g);
				        that.moreImageUrl= file.url.substr(50).replace(reg, "\\").replace(/\\/g,"/");
				       that.imageUrl.push(that.moreImageUrl);
				        var imgPat=that.imageUrl;
				        that.addForm.detailImg=imgPat.toString();//批量上传图片参数=====================================================================
				        console.log('数组=',that.addForm.imgPaths)
				     	console.log(that.imageUrl)
				     	console.log('商品主图++=',that.imageUrl[0])
				        console.log(that.moreImageUrl)//D:\tools\Tomcat\apacae-tomcat-7\webapps\loyaltyApp\sys_static\sys_upload\Example1\2017-04-14\cc3bd469004343ab85e43037cb5f4be8.png
				       
						that.$confirm('上传成功', '提示', {
							type: 'success'
						}).then(() => {
							
						}).catch(() => {
		
						});
				    }else{
				       	that.$confirm('上传失败，请稍后重试', '提示', {
							type: 'error'
						}).then(() => {
							
						}).catch(() => {
		
						});   
				   }
				}else{
			       	that.$confirm('上传失败，图片集合过大', '提示', {
						type: 'error'
					}).then(() => {
						
					}).catch(() => {
	
					});   
			    }
				
			},
		     //添加商品跳转到下一步
		     nextClick:function(){
		     	///=============================数据发送===================
//		     	addForm: {
//					name1:'',//商品名称
//					inventedProductOutsiderId:'',//虚拟商品第三方接口对应专属商品id
//					marketPrice:'',//市场价
//					mallIntegralPrice:'',//售价（积分）
//					productStock:'',//商品库存
//					isInventedProduct:'',//是否虚拟商品
//					masterImg:'',//商品图片路径
//					isHomeUp2:'',//是否爆款
//					productCode:'',//商品编号
//					homeUpOrderno:'',//爆款顺序号
//					state:'',//商品上下架状态
//					imgPaths:'',
//					detailImg:'',
//					inventedProductOutsiderBusiness:''//商家
//				}
				if(this.addForm==''||this.addForm.name1==''||this.addForm.masterImg==''||this.addForm.marketPrice==''||this.addForm.mallIntegralPrice==''||this.addForm.productStock==''||this.addForm.state==''){
					alert("请填写必要信息")
					return;
				}else{
					if(this.checkedNew==true&&this.addForm.homeUpOrderno ==''||this.checkedNew==false&&this.addForm.homeUpOrderno !=''){
						alert("信息未全");
						return;
					}else{
				     	console.log('图片===',this.dialogImageUrl);
				     	console.log(this.activeName)
				     	this.activeName='second';
				     	var dialog=document.getElementsByClassName("dialog-footer")[0];
				     	$(".dialog-footer").css({"display":"block"});
					}
					
				}
		     },
		     firstClick:function(){
		     	this.activeName='first';
		     	$(".dialog-footer").css({"display":"none"});
		     },
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
//				console.log('idsssss',ids)
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					console.log('idsssss',ids)
					var that=this;
		    		var url = host.host+'/cms/productmanage/updateStateDeleteByIds';  
					$.ajax(url, { 
					    xhrFields: {
				           withCredentials: true
				       	},
	       				crossDomain: true,
				        data: {
				        	ids:ids
				        },  
				        type : "POST",
				        dataType:"json",
				        success:function(data1){
				          	//JSON.stringify()
				          	console.log("删除成功")
				          	that.listLoading = false;
							that.getUsers();
		          		},
				         error:function(err){
				            alert("请求出错！");
				            console.log(err);
				         },
		        		crossDomain: true
		        });
					//NProgress.start();
//					let para = { ids: ids };
//					batchRemoveUser(para).then((res) => {
//						this.listLoading = false;
//						//NProgress.done();
//						this.$message({
//							message: '删除成功',
//							type: 'success'
//						});
//						this.getUsers();
//					});
				}).catch(() => {

				});
			}
		},
		//是否设为爆款=================
		//编辑器使用
		computed: {
//			    value: {
//			      get: function(){
//			        console.log(  this.value);
//			        return this.value;
//			      },
//			      set:function(newValue){
//			        this.value = newValue;
//			        console.log( this.value);
//			      }
//			    },
	      editor() {
	        return this.$refs.myTextEditor.quillEditor
	      }
	    },
	    beforeCreate: function () {
//                this.getUsers();
       },
	    created: function () {
            this.getUsers();
        },
	    beforeMount: function () {
			var that=this;
    		var url = host.host+'/cms/productmanage/getProductTotalInfo';  
			 $.ajax(url, { 
				xhrFields: {
				           withCredentials: true
		       	},
   				crossDomain: true,
		        data: {  
		          'cityname': '',  
		          'dtype': 'jsonp',  
		          'key': '',  
		          '_': new Date().getTime()  
		        },  
		        type : "POST",
		        dataType:"json",
		        success:function(data1){
		          	//JSON.stringify()
		          	that.Total.sum=data1.resultBody[0];
					that.Total.virtual=data1.resultBody[3]; 
					that.Total.Vexp=data1.resultBody[4];
					that.Total.physical=data1.resultBody[1];
					that.Total.Pexp=data1.resultBody[2];
					that.Total.insale=data1.resultBody[5];
					that.Total.noshel=data1.resultBody[6];
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
		mounted() {
			console.log('time=',this.time)
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
//             setTimeout(function(){
//             	 console.log( $('.el-table_1_column_3  .cell').length)
//             },0)
//             console.log('组件  update', $('.el-table_1_column_16  .cell').length)
              
               //获取选中日期 console.log(this.filters.birth)
//            console.log($("..el-input__inner").value())
       }
	}

</script>

<style scoped lang="scss">
	.breadcrumb-container {
		//margin-bottom: 15px;
		.left,.right{
			    background: #f2f2f2;
			    padding: 1.5rem;
			    strong:last-child{
			    	border: none;
			    }
		}
		.left{
			width: 58.6%;
			strong:nth-child(2),
			strong:nth-child(4){
				border: none;
				padding-right: 3rem;
			}
		}
		.right{
			width: 23.8%;
		}
		.title {
			width: auto;
			float: left;
			color: #475669;
			font-style: normal;
			font-weight: normal;
			font-size: 1.4rem;
			padding:0 1.5rem;
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
		.sta{
			height: 3.6rem;
			line-height: 3.6rem;
			margin-left: 1rem;
			text-align: center;
			width: 20rem;
			float: left;
		}
</style>