<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends BaseModel {
    
    protected $table = 'invoice';

    protected $rules = [
        'customer_id' => 'required',
        'attn' => 'required',
        'invoice_number' => 'required',
        'description' => 'required',
        // 'due_date' => 'required',
        // 'paid_date' => 'required',
    ];

    protected $fillable = [
        'customer_id',
        'attn',
        'invoice_number',
        'service_tax',
        'secondary_cess',
        'education_cess',
        'description',
        'due_date',
        'paid_date',
    ];

    public function Customer()
    {
        return $this->hasOne('App\Models\Customer', 'id');
    }

    public function Invoice_items()
    {
        return $this->hasMany('App\Models\InvoiceItems', 'invoice_id');
    }
    
}
