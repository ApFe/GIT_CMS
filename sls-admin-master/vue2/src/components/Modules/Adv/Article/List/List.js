import {
    ListData,
    DialogInfo
} from 'common/';


module.exports = {
    name: 'article-list',
    components: {
        ListData,
        DialogInfo
    },
    data() {
        return {
            list: [],
            fields: [{
                key: 'create_time',
                label: '创建时间'
            }, {
                key: 'title',
                label: '标题'
            }, {
                key: 'status',
                label: '状态',
                formatter: function(item) {
                    return item.status == 1 ? '启用' : '禁用';
                },
                filter_list: [{
                    text: '启用',
                    value: 1
                }, {
                    text: '禁用',
                    value: 2
                }],
                filter_method: function(value, item) {
                    return item.status == value;
                },
                filter_multiple: false,
            }],
            btn_info: {
                // show: false,
                label: '操作',
                width: 300,
                // delete: false,
                // select: false,

                //配置点击修改按钮时跳转的路径
                //只有传了path才会自动跳转，否则将执行onGetInfo方法
                //path=>路径
                //query_keys=>跳转时需要携带的字段
                update: {
                    path: '/adv/article/edit',
                    // param_keys: ['id', 'status'],
                    query_keys: ['id', 'status']
                },

                // list: [{
                //     text: '设置权限',
                //     fn_type: 'access'
                // }, {
                //     text: '修改状态',
                //     fn_type: 'status'
                // }]
            },

            pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },


            apis: {
                method: {
                    get_list: '$$selectArticle',
                    delete_data: '$$deleteArticle'
                },
                route: {
                    update_path: '/adv/article/edit'
                }
            }

        }
    },
    methods: {
        init() {
            this.getDataList();
        }
    },
    mounted() {
        this.init();

  var url = 'http://10.48.154.203:8080/loyaltyApp/cms/productmanage/getProductTotalInfo';  
			  
			  fetch(url).then(function(response) {
				  return response.json();
				}).then(function(data) {
				  console.log(data);
				}).catch(function(e) {
				  console.log("Oops, error");
				});

$.ajax(url, { 
      	crossOrigin: true,
        data: {  
          'cityname': '',  
          'dtype': 'jsonp',  
          'key': '',  
          '_': new Date().getTime()  
        },  
        type : "GET",
        dataType: 'jsonp', 
        jsonp:"callback",
          jsonpCallback:"success_jsonpCallback",
          success:function(data){
//          $(".user").html("用户信息："+json.username+","+json.age+","+json.gender);
				console.log(JSON.parse(data));
          },
        
         
          error:function(err){
            alert("请求出错！");
            console.log(err);
          },
        
        crossDomain: true
//      success: function(data) {  
//        if(data && data.resultcode == '200'){  
//          console.log(JSON.parse(data.result.today));  
//        }  
//      }  
      });  


    },
    '$route' (to, from) {

    }
}