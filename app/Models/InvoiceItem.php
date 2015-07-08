<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends BaseModel {
    
    protected $table = 'invoice_items';

    protected $rules = [
        //'invoice_id' => 'required',
        'item' => 'required',
        'description' => 'required',
        'quantity' => 'required',
        'unitcost' => 'required',
    ];

    protected $fillable = [
        'inovice_id',
        'item',
        'description',
        'quantity',
        'unitcost',
    ];
    public function Invoice()
    {
        return $this->hasOne('App\Models\Invoice', 'id');
    }
    
}
