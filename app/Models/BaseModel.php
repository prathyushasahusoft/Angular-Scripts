<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Watson\Validating\ValidatingTrait;
//use Illuminate\Database\Eloquent\SoftDeletes;

abstract class BaseModel extends Model
{

    use ValidatingTrait;
    //use SoftDeletes;
    
    protected $json_fields = [];
    protected $hash_fields = [];

    protected $defaults = [];

    public function __construct(array $attributes = [])
    {
        $this->setRawAttributes($this->defaults, true);
        parent::__construct($attributes);
    }

    public function getHashFields()
    {
        return $this->hash_fields;
    }

    public function getJsonFields()
    {
        return $this->json_fields;
    }

    public function scopeBuildQuery($query)
    {
        return $query;
    }
    
}
