<?php

namespace App\Http\Controllers;

use App\Subtype;
use Illuminate\Http\Request;

class SubtypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subtypes = Subtype::all();
        return view('subtypes.index',['subtypes'=>$subtypes]);
        
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subtype  $subtype
     * @return \Illuminate\Http\Response
     */
    public function show(Subtype $subtype)
    {
        $subtype = Subtype::where('feit_id',$subtype->feit());
        return view('subtypes.show',['feit'=>$subtype]);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Subtype  $subtype
     * @return \Illuminate\Http\Response
     */
    public function edit(Subtype $subtype)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Subtype  $subtype
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subtype $subtype)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subtype  $subtype
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subtype $subtype)
    {
        //
    }
}
