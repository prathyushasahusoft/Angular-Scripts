<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends BaseModel {
    
    protected $table = 'customers';

    protected $rules = [
        'first_name' => 'required',
        'last_name' => 'required',
        'mobile' => 'required',
        'email' => 'required',
    ];

    protected $fillable = [
        'firstname',
        'lastname',
        'mobile', 
        'email',
    ];
    
    public function Invoice()
    {
        return $this->hasOne('App\Models\Invoice', 'customer_id');
    }

   /* public function Campaign()
    {
        return $this->hasMany('App\Models\Campaign', 'application_id');
    }

    public function Sender()
    {
        return $this->hasMany('App\Models\Sender', 'application_id');
    }

    public function Email_template()
    {
        return $this->hasOne('App\Models\EmailTemplate', 'application_id'); 
    }*/
    
}
