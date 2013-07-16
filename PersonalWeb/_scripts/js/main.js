(function(){
	
	var _this,
		currentPage = 'porfile',
	    main = {
			init : function(){
				_this = this;
				$('#header > #nav > li > a').click(function(){
					if(currentPage !== $(this).attr('id')){
						currentPage = $(this).attr('id');
						$("#page-wrap").hide('slow',function(){
							_this.loadPage(currentPage , _this.renderPage);	
						});
					}
				});
			},
			loadPage:function(id , onLoad){
				var page = ['views/' ,id , '.html'].join('');
				$.get(page , function(html){
					onLoad(html);
				});
			},
			renderPage:function(html){
				$("#page-wrap").show('slow',function(){
					$(this).html(html);
				});
			}
	};
	$(document).ready(function(){
		main.init();
		main.loadPage(currentPage, main.renderPage);
	});
}());