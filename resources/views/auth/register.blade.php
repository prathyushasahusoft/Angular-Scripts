@extends('layouts.app')

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-6 col-md-offset-3 m-t-lg">
			<div class="panel panel-default">
				<div class="panel-heading"><h4 class="panel-title">Register</h4></div>
				<div class="panel-body">

					<form class="form-horizontal m-t validation-enabled" role="form" method="POST" action="/auth/register" id="register-form" novalidate>
						<input type="hidden" name="_token" value="{{ csrf_token() }}">

						<div class="form-group{{ $errors->has('first_name') ? ' has-error' : '' }}">
							<label class="col-md-4 control-label">First Name</label>
							<div class="col-md-7">
								<input type="text" class="form-control" name="first_name" value="{{ old('first_name') }}" required />
							</div>
						</div>
						<div class="form-group{{ $errors->has('last_name') ? ' has-error' : '' }}">
							<label class="col-md-4 control-label">Last Name</label>
							<div class="col-md-7">
								<input type="text" class="form-control" name="last_name" value="{{ old('last_name') }}" required />
							</div>
						</div>

						<div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
							<label class="col-md-4 control-label">E-Mail Address</label>
							<div class="col-md-7">
								<input type="email" class="form-control" name="email" value="{{ old('email') }}" required />
							</div>
						</div>
						<div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
							<label class="col-md-4 control-label">Phone (Optional)</label>
							<div class="col-md-7">
								<input type="text" class="form-control" name="phone" value="{{ old('phone') }}">
							</div>
						</div>

						<div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
							<label class="col-md-4 control-label">Password</label>
							<div class="col-md-7">
								<input type="password" class="form-control" name="password" required />
							</div>
						</div>

						<div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
							<label class="col-md-4 control-label">Confirm Password</label>
							<div class="col-md-7">
								<input type="password" class="form-control" name="password_confirmation" data-match="#register-form input[name=password]" required>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-7 col-md-offset-4">
								<button type="submit" class="btn btn-primary">Register</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection