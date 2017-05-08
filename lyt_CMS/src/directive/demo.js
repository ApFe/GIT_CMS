export  default function( Vue ){
	
	
	
	
	Vue.directive( 'demo',  {
			inserted: function( el ){
	
			
				
				
			},
			update:function( el, e ){
//				console.log('指令  update' ,$( '.el-table_1_column_3  .cell').length)
				var imgs = $('.el-table_1_column_3  .cell');
				imgs.css({"padding-top":"7px"})
				imgs.each(function( index, el ){
						console.log('this is imghttp=',  $(el).html().substr(0, 4));
						if( index > 0 &&   $(el).html().substr(0, 4) != '<img'  ){
							if ( $(el).html().substr(0, 4) != 'http' ) {
								$(el).html('<img src="http://10.48.2.57:8080/loyaltyApp'+ $(el).html() +'"style="height:60px;width:60px;"/>  ')
							} else{
								$(el).html('<img src="'+ $(el).html() +'"style="height:60px;width:60px;"/>  ')
							}
						}	
					})

				

		},
		componentUpdated: function(el){

		}
	})
	
	
}
