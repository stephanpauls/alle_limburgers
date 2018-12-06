<?php

namespace App\Http\Controllers;

use App\Vw_feit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Vw_feitcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$feiten = Feit::all();
        $feiten = DB::table('vw_feit')->select('feittype')->distinct()->get();
        $subtypes = DB::table('vw_feit')->select('trefwoord')->distinct()->get();
        
        //$feiten = DB::table('vw_feit')->where('feittype','Burgerlijk huwelijk aangifte')->limit(100)->get();
        //$aantal = DB::table('vw_feit')->where('feittype','Geboorte-aangifte')->count();
        
/*        
    DB::table('vw_feit')->where('feittype','Geboorte-aangifte')->orderBy('feit_id')->chunk(100, function ($facts) {
    $feiten = $facts;
    return false;
//    sleep(5);
    
});        
*/
/*      
        foreach ($feiten as $feit) {
            $feit = $feit;
            $bron = $feit->bron_id;
        }
 * 
 */
    return view('feiten.index',['feiten'=>$feiten,'subtypes'=>$subtypes]);

        
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    
            
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function store(Request $request)
    {
        $queryPers = false;
        $queryAuthority = false;

        $lijst = $request->input('lijst');
        if ($lijst == 'feittype') {
            $result = DB::table('vw_feit')->select('feittype')->distinct()->get();
        } else if ($lijst == 'subtype') {
            $result = DB::table('vw_feit')->select('trefwoord')->distinct()->get();
        } else if ($lijst == 'zoekFeit') {
            $query = DB::table('vw_feit');
            $filter = $request->input('filter');
            $query->where('feittype','like','%'.$filter.'%');
            $result = $query->select('vw_feit.feittype')->distinct()->limit(200)->get();
        } else if ($lijst == 'zoekSubtype') {
            $query = DB::table('vw_feit');
            $filter = $request->input('filter');
            $query->where('trefwoord','like','%'.$filter.'%');
            $result = $query->select('vw_feit.trefwoord')->distinct()->limit(200)->get();
        } else if ($lijst == 'detail') {
            $pers_id = $request->input('pers_id');
            $feit_id = $request->input('feit_id');
            $query = DB::table('vw_feit-pers');
            $query->join('vw_feit','vw_feit.feit_id', '=','vw_feit-pers.feit_id');            
            $query->join('vw_feit-persd','vw_feit.feit_id', '=','vw_feit-pers.feit_id');            
            $query->join('vw_feit-bron','vw_feit.bron_id', '=','vw_feit-bron.bron_id');            
            $query->where('vw_feit-pers.pers_id',$pers_id);
            $query->where('vw_feit-pers.feit_id',$feit_id);
            $query->where('vw_feit-persd.feit_id',$feit_id);
            $result = $query->select('vw_feit-bron.gemeente','vw_feit-bron.plaats','vw_feit-bron.omschrijving','vw_feit-pers.naam','vw_feit-pers.voornamen','vw_feit.*')->limit(1)->get();
        } else {
        
        $query = DB::table('vw_feit');
        $query->join('vw_feit-pers','vw_feit.feit_id', '=','vw_feit-pers.feit_id');

        //$input = $request->all();
        $types = $request->input('feit');
        $subtypes = $request->input('subtype');
        $others = $request->input('other');
        if ($others != null) {
            foreach ($others as $other) {
                if ((
                    ($other['term']) == 'naam') 
                    ||($other['term'] == 'voornamen') 
                    ||($other['term'] == 'datum') 
                    ||($other['term'] == 'rol')
                   ) {
                    if ($queryPers == false) {
                        $queryPers = true;
                    }
                } else if ($other['term'] == 'authority') {
                    if ($queryAuthority == false) {
                     $queryAuthority = true;
                     $query->join('vw_feit-persd','vw_feit.feit_id', '=','vw_feit-persd.feit_id');
                    }
                }
                if (($other['poort']) == 'AND') {
                    if (($other['operator']) == 'bevat') {
                        $query->where($other['term'],'like','%'.$other['filter'].'%');
                    } else if (($other['operator']) == 'bevat_exact') {
                        $query->where($other['term'],'like',$other['filter']);
                    } else if (($other['operator']) == 'begint') {
                        $query->where($other['term'],'like',$other['filter'].'%');
                    } else if (($other['operator']) == 'vanaf') {
                        $query->where($other['term'],'>',$other['filter']);
                    } else if (($other['operator']) == 'totmet') {
                        $query->where($other['term'],'<',$other['filter']);
                    } else {
                        $query->where($other['term'],'=',$other['filter']);
                    }
                }  else if (($other['poort']) == 'OR') {
                    if (($other['operator']) == 'bevat') {
                        $query->orWhere($other['term'],'like','%'.$other['filter'].'%');
                    } else if (($other['operator']) == 'bevat_exact') {
                        $query->orWhere($other['term'],'like',$other['filter']);
                    } else if (($other['operator']) == 'begint') {
                        $query->orWhere($other['term'],'like',$other['filter'].'%');
                    } else if (($other['operator']) == 'vanaf') {
                        $query->orWhere($other['term'],'>',$other['filter']);
                    } else if (($other['operator']) == 'totmet') {
                        $query->orWhere($other['term'],'<',$other['filter']);
                    } else {
                        $query->orWhere($other['term'],'!=',$other['filter'].'%');
                    }
                } else {
                    if (($other['operator']) == 'bevat') {
                        $query->where($other['term'],'not like','%'.$other['filter'].'%');
                    } else if (($other['operator']) == 'bevat_exact') {
                        $query->where($other['term'],'not like',$other['filter']);
                    } else if (($other['operator']) == 'begint') {
                        $query->where($other['term'],'not like',$other['filter'].'%');
                    } else if (($other['operator']) == 'vanaf') {
                        $query->where($other['term'],'<=',$other['filter']);
                    } else if (($other['operator']) == 'totmet') {
                        $query->where($other['term'],'>=',$other['filter']);
                    } else {
                        $query->where($other['term'],'!=',$other['filter'].'%');
                    }
                }
            }   
        }
        $index = 1; 
        $whereQuery = "";

        if ($types != null) {
            foreach ($types as $type){
                if ($index == 1){
                   $whereQuery.=  ' (feittype = \''.$type.'\'';
                } else {
                    $whereQuery.= ' or feittype = \''.$type.'\'';
                }
                $index++;
            }
            $whereQuery.= ')';
            $query->whereRaw($whereQuery);
        }
        $index = 1;
        $whereQuery = "";
        
        if($subtypes != null) {
            foreach ($subtypes as $type){
                if ($index == 1){
                    $whereQuery.=' (trefwoord = \''.$type.'\'';
                } else {
                    $whereQuery.=' or trefwoord = \''.$type.'\'';
                }
                $index++;            
            }
            $whereQuery.= ')';
            $query->whereRaw($whereQuery);
        }
        if ($queryAuthority == true) {
            $whereQuery = "";
            $whereQuery.='("vw_feit-persd"."pers_id" = "vw_feit-pers"."pers_id")';
            $query->whereRaw($whereQuery);
        }

        $result = $query->select('vw_feit-pers.*','vw_feit.feittype')->limit(200)->get();
        
/*        
        $result = DB::table('vw_feit')
            ->join('vw_feit-pers', 'vw_feit-pers.feit_id', '=', 'vw_feit.feit_id')
            ->where ('vw_feit-pers.rol','Moeder')
            ->select('vw_feit-pers.rol')
            ->get();
        
*/        
        }
        return $result;
    }  
 
    /**
     * Display the specified resource.
     *
     * @param  \App\Feit  $feit
     * @return \Illuminate\Http\Response
     */
    public function show(Vw_feit $feit)
    {
        $feiten = DB::table('vw_feit')->where('feit_id',$feit->feit_id)->limit(100)->get();
        foreach ($feiten as $value) {
               $naam =  $value;
        }
        return view('feiten.show',['feiten'=>$feiten]);        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Feit  $feit
     * @return \Illuminate\Http\Response
     */
    public function edit(Vw_feit $feit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Feit  $feit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vw_feit $feit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Feit  $feit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vw_feit $feit)
    {
        //
    }
}
