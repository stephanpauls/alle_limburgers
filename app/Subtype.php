<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subtype extends Model
{
    //
    protected $fillable = [
         'naam',
         'beschrijving',
         'feit_id'
    ];
             

    public function feit(){
        return $this->belongsToMany('App\Feit');
    }

}