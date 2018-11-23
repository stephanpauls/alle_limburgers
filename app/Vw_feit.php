<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vw_feit extends Model
{
    //
    protected $fillable = [
        'feit_id',
        'bron_id',
         'feittype',
         'plaats',
         'trefwoord'
    ];
    
    protected $primaryKey = 'feit_id';
             
public function getTable()
{
    return 'vw_feit';
}
public function bron()
{
        return $this->hasOne('App\Vw_feit_bron');
}
}