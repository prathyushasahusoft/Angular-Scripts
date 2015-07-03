<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
	<meta charset="utf-8"/>
	<title>Angular Scripts</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1" name="viewport"/>
	<meta content="" name="description"/>
	<meta content="" name="author"/>

	<link rel="stylesheet" href="{{ asset("/css/styles.css") }}" />
	<link rel="stylesheet" href="{{ asset("/css/app.css") }}" />
</head>
<body>

	@yield('body')
	
	<script src="{{ asset("/js/app.js") }}" type="text/javascript"></script>
	<script src="{{ asset("/js/login.js") }}" type="text/javascript"></script>
	<script type="text/javascript">

		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
			$('.validation-enabled').validator(); // Form validation
		})

		$(function() {

		    $('#login-form-link').click(function(e) {
				$("#login-form").delay(100).fadeIn(100);
		 		$("#register-form").fadeOut(100);
				$('#register-form-link').removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			});
			$('#register-form-link').click(function(e) {
				$("#register-form").delay(100).fadeIn(100);
		 		$("#login-form").fadeOut(100);
				$('#login-form-link').removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
		});

});
	</script>

	@yield('js')
	
</body>
</html>