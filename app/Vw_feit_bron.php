<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vw_feit_bron extends Model
{
    //
    protected $fillable = [
        'bron_id',
         'rubriek',
         'categorie',
         'bronklasse',
        'omschrijving'
    ];
             
public function getTable()
{
    return 'bron';
}
    
    public function feit(){
        return $this->belongsToMany('App\Vw_feit');
    }

}