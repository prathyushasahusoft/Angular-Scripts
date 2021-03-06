<?php namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\BaseApiController\Api\v1;
use Watson\Validating\ValidatingTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Customer;
use Log;
use DB;
class customerController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */

    public function index()
    {
        try{
           $admin = \Auth::User();
            if (!$admin) {
                return $this->failResponse('admin not logged in');
            }

            $customerObj = new Customer;
            $query = $customerObj->buildQuery();
            $total = $query->count();
            $paginate = 1;
            $meta = array();
            if($paginate == 0) {
                $query = $query->get();
                $senddata = $query;
            }
            else {
                $limit = 10;
                $offset = 0;
                if (isset($_GET["limit"])) {
                    $limit=$_GET["limit"];
                }
                if (isset($_GET["offset"])) {
                    $offset=$_GET["offset"];
                }
                $perpage = $limit;
                $query = $query->paginate($perpage);
                $data = $query->toArray();
                $senddata = $data['data'];
                $meta["total"] = $total;
                $meta["offset"] = $offset;
                $meta["limit"] = $limit;
            }

            return $this->successResponse($senddata, $meta);
        }catch(\Exception $e){
             Log::error("error i customer controller");
             return $this->failResponse($e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        try{
           $admin = \Auth::User();
            if (!$admin) {
                return $this->failResponse('admin not logged in');
            }
            $customerObj = new Customer;
            $data = $this->getRequestBody();  
            $customerObj->first_name = $data['first_name'];
            $customerObj->last_name = $data['last_name'];
            $customerObj->business_name = $data['business_name'];
            $customerObj->mobile = $data['mobile'];  
            $customerObj->email = $data['email'];
            $customerObj->address = $data['address'];
            $customerObj->save(); 
            if(!$customerObj->save()){
                Log::error("error in saving"); 
                $errors = $customerObj->getErrors();
                return $this->failResponse('Validation failed. Cannot save data.'.$errors);
            }
            else{
                return $this->successResponse('updated sucessfully');
            }
        }catch (\Exception $e){
            Log::error($customerObj->getErrors());
            return $this->failResponse($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        try{
            Log::error("show");
            $admin = \Auth::User();
            if (!$admin) {
                return $this->failResponse('admin not logged in');
            }
            $customerObj = Customer::find($id);
            if (count($customerObj) == 0) {
                return $this->failResponse('customer id not found');
            }
            $senddata = $customerObj->first();
            return $this->successResponse($senddata);
        }catch(\Exception $e){
             Log::error("error in customer controller");
             return $this->failResponse($e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
    //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {   
        try{
           $admin = \Auth::User();
            if (!$admin) {
                return $this->failResponse('admin not logged in');
            }
            $customerObj = Customer::find($id);

            if (count($customerObj) == 0) {
                return $this->failResponse('customer id not found');
            }
            $data = $this->getRequestBody();      
            $customerObj->first_name = $data['first_name'];
            $customerObj->last_name = $data['last_name'];
            $customerObj->business_name = $data['business_name'];
            $customerObj->mobile = $data['mobile'];  
            $customerObj->email = $data['email'];
            $customerObj->address = $data['address'];
            $customerObj->save();    
            if(!$customerObj->save()){
                $errors = $customerObj->getErrors();
                return $this->failResponse('Validation failed. Cannot save data.'.$errors);
            }
            else{
                return $this->successResponse('updated sucessfully');
            }
        }catch (\Exception $e){
            Log::error("error");
            return $this->failResponse($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        try{
            $admin = \Auth::User();
            if (!$admin) {
                return $this->failResponse('admin not logged in');
            }
            $customerObj = Customer::find($id);
            if (count($customerObj) == 0) {
                return $this->failResponse('customer id not found'); 
            }
            $customerObj->delete();  
            return $this->successResponse('customer deleted successfully');
        }catch(\Exception $e){
             Log::error("error in customer controller");
             return $this->failResponse($e->getMessage());
        }
    }
}
