@if (Session::has('flash_notification.message'))
    @if (Session::has('flash_notification.overlay'))
        @include('flash::modal', ['modalClass' => 'flash-modal', 'title' => Session::get('flash_notification.title'), 'body' => Session::get('flash_notification.message')])
    @else
        <div class="alert alert-{{ Session::get('flash_notification.level') }}">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            @if(is_object(Session::get('flash_notification.message')) && get_class(Session::get('flash_notification.message')) == 'Illuminate\Support\MessageBag')
            <ul>
            	@foreach(Session::get('flash_notification.message')->getMessages() as $messages)
            		@foreach($messages as $message)
            			<li>{{$message}}</li>
            		@endforeach
            	@endforeach
            </ul>
            @else
            {{ Session::get('flash_notification.message') }}
            @endif
        </div>
    @endif
@elseif($errors->has())
<div class="alert alert-danger">
	<ul>
		@foreach($errors->getMessages() as $messages)
			@foreach($messages as $message)
				<li>{{$message}}</li>
			@endforeach
		@endforeach
	</ul>
</div>
@endif