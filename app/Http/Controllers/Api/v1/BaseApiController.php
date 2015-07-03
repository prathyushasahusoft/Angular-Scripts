<?php namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;

class BaseApiController extends Controller {

/*
	public function __construct()
	{
		App::error(function($exception, $code) {
			if($exception->getCode() == 403){
				return $this->failResponse($exception->getMessage(), $code);	
			}else{
				return $this->failResponse($exception->getMessage(), $code, $exception->getTrace());
			}
		});
		$token = '';
		if(isset($_REQUEST['access_token'])){
			$token = $_REQUEST['access_token'];
		}else{
			$data = $this->getRequestBody();
			if(isset($data['access_token'])){
				$token = $data['access_token'];
			}
		}
		if($token != ''){
			$obj = AccessToken::getByToken($token);
			if($obj){
				$this->application_id = $obj->application_id;
				$this->type = $obj->type;
				$this->type_id = $obj->type_id;
			}
		}

		if($this->application_id == null || $this->type == null || $this->type_id == null){
			throw new exception("Invalid Access Token", 403);
		}
	}
*/
	protected function getRequestBody()
	{

		$request = \Request::instance();
		$content = $request->getContent();

		$data = json_decode($content, true);
		unset($data['jsData']);
		
		return $data;
		
	}

	public function successResponse($data, $meta=array(), $code = 200)
	{
		$returnData = array(
			'result' => $data,
			'meta' => $meta
		);

		return \Response::json($returnData, $code);

	}

	public function failResponse($message, $code = 400, $errors = NULL, $data = NULL)
	{

		$responseArray = [
				'errors'=>$errors,
				'message'=>$message,
				'result' => $data
			];

		// if(!empty(\App\Services\BaseApiService::$meta)){

		// 	$extraInfo = \App\Services\BaseApiService::$meta;
		// 	$responseArray['extra'] = $extraInfo;
		
		// }

		// if(!empty($stackTrace)){

		// 	$responseArray['stackTrace'] = $stackTrace;
		
		// }

		return \Response::json(
				
				$responseArray,
				 $code
		);
	}


	protected function preparePaginationData($total,$perPage,$currentPage,$items)
	{
		return array(
			'meta'	=> array(
				'total' => $total,
				'per_page' => $perPage,
				'current_page' => $currentPage,
				'page_param_name' => 'page'
			),
			'result' => $items
		);

	}

	protected function formatMetaData($total=0, $perPage=0 , $currentPage=0)
	{
		$meta = array();

		$meta = array(
			'total' => $total,
			'per_page' => $perPage,
			'current_page' => $currentPage,
			'page_param_name' => 'page'
		);

		return $meta;
	}

}

?>