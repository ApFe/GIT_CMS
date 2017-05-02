<template>
	<section>
	</section>
</template>
<script>
	
//import axios from 'axios'
//import {getListBySearch } from '../../api/api';
import axios from 'axios'
	export default {
		data () {
			return{
				page: 1,
				add: true,
				jian: false,
				list:[]
			}
		},
		mounted: function () {
	    	
//	    	axios.get('http://10.48.2.63:8080/loyaltyApp/cms/productmanage/getListBySearch')
//			  .then(function (response) {
//			    console.log(response);
//			  })
//			  .catch(function (error) {
//			    console.log(error);
//			  });

    var url = 'http://10.48.154.203/loyaltyApp/cms/productmanage/getListBySearch';  
			  

//			axios({
//                  method:'POST',
//                  url:'http://10.48.154.203:8080/loyaltyApp/cms/productmanage/getProductTotalInfo',
//                  
//                  headers: {"X-Requested-With": "XMLHttpRequest"},
//                  responseType: 'json',
//                  emulateJSON: true
//                 }).then(function(data){//es5写法
//                   console.log(data)
//                 });
//							  
//

//getListBySearch( {  
//        'cityname': '',  
//        'dtype': 'jsonp',  
//        'key': '',  
//        '_': new Date().getTime()  
//      }).then( res => res.json() )
//      .then(data => {
//      	console.log( data);
//      }).catch( err => {
//      	console.log( err);
//      })  
  
//    var url2 = 'http://10.48.2.63:8080/loyaltyApp/cms/productmanage/getListBySearch';  
//    $.getJSON(url2, {  
//      'cityname': '',  
//      'dtype': 'jsonp',  
//      'key': '',  
//      '_': new Date().getTime()  
//    }, function(data){  
//      if(data && data.resultcode == '200'){  
//        console.log(data.result.today);  
//      }  
//    });  
//
//    var url3 = 'http://10.48.2.63:8080/loyaltyApp/cms/productmanage/getListBySearch';  
//    $.get(url3, {  
//      'cityname': '',  
//      'dtype': 'jsonp',  
//      'key': '',  
//      '_': new Date().getTime()  
//    }, function(data){  
//      if(data && data.resultcode == '200'){  
//        console.log(data.result.today);  
//      }  
//    }, 'json');  
  
			  
			  
  },
   	methods: {
   		getAjax: function(  isleft  ){
// 			page 0  -5

   			if(   typeof isleft == 'boolean'  ){
   				if(( !isleft  &&  !_this.add)   || (isleft &&  !_this.jian)    ){
   					return;
   				}
   				var page = this.page;	
   			}else{
   				var page = isleft;
   			}

   			var _this = this;
   			var url = 'http://10.48.154.203:8080/loyaltyApp/cms/productmanage/getListBySearch?pageNum='+ (page + 1);  
   			 $.ajax(url, { 
	      	crossOrigin: true,
	        data: {  
	          'cityname': '',  
	          'dtype': 'jsonp',  
	          pageNum: page + 1,
	          'key': '',  
	          '_': new Date().getTime()  
	        },  
	        type : "POST",
	        dataType:"json",
	          success:function(data1){
//	          	if(1<page&&page<=5){
//	          	_this.page = isleft typeof != 'boolean' ?    page :   isleft ?    _this.page-1  :    _thsi.page+1; 
	          this.add  = _this.page < 6;
	          this.jian = _thih.page > 0;
	       
	          	//JSON.stringify()
//	          	}
	          		console.log(data1)
	          		console.log(data1.resultBody);
	          		
	          },
	        
	         
	          error:function(err){
	            alert("请求出错！");
	            console.log(err);
	          },
	        
	        crossDomain: true
	      });  
   		}
   	}
	}
</script>
