<?php

namespace App\Http\Controllers;

use App\Vw_bron;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class Vw_feit_bronController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bronnen = DB::table('vw_feit_bron')->limit(100)->get();
        return view('bronnen.index',['bronnen'=>$bronnen]);
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
     * @param  \App\Bron  $bron
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $feiten = DB::table('vw_feit')->where('bron_id',$id)->limit(100)->get();
        return view('feiten.show',['feiten'=>$feiten]);              
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Bron  $bron
     * @return \Illuminate\Http\Response
     */
    public function edit(Vw_feit_bron $bron)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Bron  $bron
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vw_feit_bron $bron)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Bron  $bron
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vw_feit_bron $bron)
    {
        //
    }
}
