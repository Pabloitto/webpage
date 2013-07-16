(function(){
	 var _this,
	 	 btnSign = $("#btnSign").button(),
	 	 btnClear = $("#btnClear").button(),
		 formGuest = $("#formGuest"),
		 cboComments = $("#cboComments"),
		 txtName = $("#txtName"),
		 txtLastName = $("#txtLastName"),
		 txtEmail = $("#txtEmail"),
		 txtCountry = $("#txtCountry"),
		 txtComments = $("#txtComments"),
		 guestbook = {
			init:function(){
				_this = this;
				btnSign.click(function(){
					var ob = _this.validForm();
					if(ob.valid){
						formGuest.ajaxSubmit({
							beforeSubmit : $.mask,
							success:function(){
								formGuest.find("input[type='text'],textarea").val("");
								_this.paintComments();
								$.unmask();
							}
						});
					}else{
						ob.component.focus();
						alert(ob.message);
					}
				});
				btnClear.click(function(){
					formGuest.find("input[type='text'],textarea").val("");
				});
				_this.paintComments();
				cboComments.change(_this.onChangeComment);
			},
			validForm : function(){
				var result = {
						message : "",
						component : null,
						valid : true
				},
				valid = true;
				formGuest.find("input[type='text'],textarea").each(function(){
					valid &= $(this).val() ? true : false;
					if(!valid){
						result.message = $(this).attr("title") + " is required =(";
						result.component = $(this);
						result.valid = false;
						return false;
					}
				});
				return result;
			},
			paintComments:function(){
				var action =  $.getAction("core/guestbook.php","getComments");
				$.sendAjaxAction(action, undefined , function(response){
					var data = $.parseJSON(response);
					$.each(data,function(index , item){
						cboComments.append("<option value='"+item.id+"'>"+item.name+"</option>");
					});
				});
			},
			onChangeComment : function(){
				var item = cboComments.find('option:selected').val(),
					action = $.getAction("core/guestbook.php","getCommentById");
				if(item){
					$.sendAjaxAction(action, {'id' :  item} ,function(response){
						var data = $.parseJSON(response);
							txtName.val(data.name);
							txtLastName.val(data.lastname);
							txtEmail.val(data.email);
							txtCountry.val(data.country);
							txtComments.val(data.comments);
					});
				}else{
					formGuest.find("input[type='text'],textarea").val("");
				}
			}
	};
	$(document).ready(function(){
		guestbook.init();
	});
}());