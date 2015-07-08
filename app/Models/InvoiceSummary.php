<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceSummary extends BaseModel {
    
    protected $table = 'invoice_summary';

    protected $rules = [
        //'invoice_id' => 'required',
        'sub_total' => 'required',
        'service_tax' => 'required',
        'education_cess' => 'required',
        'secondary_cess' => 'required',
        'grand_total' => 'required',
    ];

    protected $fillable = [
        'inovice_id',
        'sub_total',
        'education_cess',
        'secondary_cess',
        'grand_total',
    ];
    public function Invoice()
    {
        return $this->hasOne('App\Models\Invoice', 'id');
    }
    
}
