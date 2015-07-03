<?php namespace App\Http\Controllers;

use App\Services\EmailService;

class ChangePasswordController extends Controller
{

    public function index()
    {
        $userObject = \Auth::user();
        return view('pages.dashboard.change-password.index', ['record' => $userObject]);
    }

    public function update($id)
    {
        try {
            \DB::beginTransaction();

            $userObject = \App\Models\User::find($id);

            if (empty($userObject)) {
                return \Redirect::back()->withErrors('Unable to update the password');
            }

            $data = \Input::all();

            if(!empty($userObject->password)) {
                
                if (empty($data['old_password']) || empty($data['new_password']) || empty($data['re_type_password'])) {
                    return \Redirect::back()->withErrors('All Three Fields are required');
                }
                $old_password = $data['old_password'];

            } else {

                if (empty($data['new_password']) || empty($data['re_type_password'])) {
                    return \Redirect::back()->withErrors('Both Fields are required');
                }
            }

            $new_password = $data['new_password'];
            $re_type_password = $data['re_type_password'];

            if ($new_password != $re_type_password) {
                return \Redirect::back()->withErrors('Passwords do not match');
            }

            if(!empty($old_password)){

                if ($old_password == $re_type_password) {
                    return \Redirect::back()->withErrors('New password and current password are same');
                }

                if (!\Hash::check($old_password, $userObject->password)) {
                    return \Redirect::back()->withErrors('Incorrect Old Password');
                }
                
            }

            
            $userObject->password = bcrypt($new_password);
            if (!$userObject->save()) {
                $errors = $userObject->getErrors();
                return Redirect::back()->withErrors($errors);
            }
            \DB::commit();
            \Flash::success('Login password updated successfully');
            return redirect(url('/account/password'));
        
        } catch (\Exception $e) {
            abort(500);
        }
    }
}
