<?php namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\BaseApiController\Api\v1;
use Watson\Validating\ValidatingTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\User;
use Log;
use DB;
class UserController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */

    public function index()
    {
        try{
           $user = \Auth::user();
            if (!$user) {
                return $this->failResponse('User not logged in');
            }

            $userObj = new User;
            $query = $userObj->buildQuery();
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
             Log::error("error i user controller");
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
        //
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
            $user = \Auth::user();
            $userObj = User::find($id);
            if (count($userObj) == 0) {
                return $this->failResponse('user id not found');
            }
            $senddata = $userObj->first();
            return $this->successResponse($senddata);
        }catch(\Exception $e){
             Log::error("error in user controller");
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
            $user = \Auth::user();
            if (!$user) {
                return $this->failResponse('User not logged in');
            }
            //$user_id = $user->id;
            $userObj = User::find($id);

            if (count($userObj) == 0) {
                return $this->failResponse('user id not found');
            }

            /*if ($userObj->user_id != $user_id) {
                return $this->failResponse('You are not authorised to update this user');
            }*/

            $data = $this->getRequestBody();      
            $userObj->name = $data['name'];
            $userObj->email = $data['email'];
            $userObj->save();    
            if(!$userObj->save()){
                $errors = $userObj->getErrors();
                return $this->failResponse('Validation failed. Cannot save data.'.$errors);
            }
            else{
                return $this->successResponse('updated sucessfully');
            }
        }catch (\Exception $e){
            Log::error("error");
            return $this->failResponse($e->getErrors());
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
            $user = \Auth::user();
            if (!$user) { 
                return $this->failResponse('User not logged in');
            }
            $user_id = $user->id;
            $userObj = User::find($id);
            if (count($userObj) == 0) {
                return $this->failResponse('user id not found'); 
            }
            /*if ($userObj->user_id != $user_id) {
                return $this->failResponse("You are not authorised to delete this user");
            }*/
            $userObj->delete();  
            return $this->successResponse('User deleted successfully');
        }catch(\Exception $e){
             Log::error("error in user controller");
             return $this->failResponse($e->getMessage());
        }
    }
}
