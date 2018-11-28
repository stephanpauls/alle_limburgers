
@extends('layouts.app')
@section('content')

<div class="container">
<div class="col-md-7 col-lg-7">
  <div class="row">
    <div class="col-sm">
    <div class="button-group">
        <input class="geotextbox feitenTextBox" name="feitenbox" placeholder="{{__('app.search_fact')}}" onkeyup="limZoekFeit();" maxlength="20"/>
        <button id="feiten_btn" type="button" onclick="feitBtn()" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">{{__('app.fact')}}<span class="caret"></span></button>
        <ul id=feitenbox class="dropdown-menu">
        @foreach($feiten as $feit)
            <li><a href="#" class="small" data-value="{{$feit->feittype}}" tabIndex="-1"><input type="checkbox" />{{$feit->feittype}}</a></li>              
        @endforeach                    
        </ul>
    </div>
    </div>
    <div class="col-sm">
    <div class="button-group">
        <input class="geotextbox subtypesTextBox" name="subtypesbox" placeholder="{{__('app.search_subtype')}}" onkeyup="limZoekSubtype();" maxlength="20"/>
        <button id="subtypes_btn" type="button" onclick="subtypeBtn()" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">{{__('app.subtype')}}<span class="caret"></span></button>
        <ul id=subtypesbox class="dropdown-menu">
        @foreach($subtypes as $subtype)
            <li><a href="#" class="small" data-value="{{$subtype->trefwoord}}" tabIndex="-1"><input type="checkbox" />{{$subtype->trefwoord}}</a></li>              
        @endforeach                    
        </ul>
    </div>
  </div>
</div>
<h1 class="spacer"></h1>    
</div>
</div>

<div class="container">
    <div id="alSearchCriterium" class="col-md-8 col-lg-8">

    </div>
<div class="col-lg-auto">

<!--    <input id="adv_start_search" type="button" onclick="createSearchBlock(0); return false;" size="12" readonly value="{{__('app.new_line')}}" >
-->
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" id="liCreateSearchBlock" class="btn btn-secondary">{{__('app.new_line')}}</button>
                    <button type="button" id="liCreateQuery"  class="btn btn-secondary">{{__('app.search')}}</button>
                    <button type="button" id="liResetQuery" class="btn btn-secondary">Reset</button>
                </div>        
    <div class="query">
        <div class="row">
            <div class="col-sm">
                <div>
                    <p>Query:</p>
                </div>
                <div id= alQuery>
                </div>
            </div>
            
            <div class="col-sm">    
            </div>
        </div>
    </div>
</div>
</div>

<div class="container" >
    <div id="li_navbar">
      
    </div>
    <div class="list-group" role="tablist" id="alResultList">
        <div class="list-group" id="al_resultList">
        </div>
    </div>        

</div>

<script>
$(document).ready(function(){
    firstOpenFeit = true;
    firstOpenSubtype = true;
    newwindow = null;

    transtab = [];
    transtab['name']='{{__('app.name')}}';
    transtab['first_name']='{{__('app.first_name')}}';
    transtab['role']='{{__('app.role')}}';
    transtab['results']='{{__('app.results')}}';
    transtab['dig_available']='{{__('app.dig_available')}}';
    transtab['date']='{{__('app.date')}}';
    transtab['contains']='{{__('app.contains')}}';
    transtab['contains_exact']='{{__('app.contains_exact')}}';
    transtab['starts_with']='{{__('app.starts_with')}}';
    transtab['from']='{{__('app.from')}}';
    transtab['until_with']='{{__('app.until_with')}}';
    transtab['is_exactly']='{{__('app.is_exactly')}}';
    transtab['authority_list']='{{__('app.authority_list')}}';
    transtab['fact']='{{__('app.authority_list')}}';
    transtab['subtype']='{{__('app.authority_list')}}';
    transtab['fill_out']='{{__('app.fill_out')}}';
    
        
    $('#liCreateQuery').hide();
    
    $(document).on('click','#feitenbox a',function(event){

       var $target = $( event.currentTarget ),
           val = $target.attr( 'data-value' ),
           href = $target.text(),
           $inp = $target.find( 'input' ),
           idx;

       if (( idx = selFeit.indexOf( href.trim()))  > -1 ) {
          selFeit.splice( idx, 1 );
          setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
       } else {
          selFeit.push(href.trim());
          setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
       }

       $( event.target ).blur();
       if (selFeit.length == 0) {
            $('.feitenTextBox').attr("placeholder",'{{__('app.all_facts')}}');
       } else {
            $('.feitenTextBox').attr("placeholder","");
            if ((selFeit.length + selSubtype.length) < 2) {
                $('#liCreateQuery').hide();
            }
        }
        composeQuery();
        return false;
    });        

    $(document).on('click','#subtypesbox a',function(event){

        var $target = $( event.currentTarget ),
            val = $target.attr( 'data-value' ),
            href = $target.text(),
            $inp = $target.find( 'input' ),
            idx;

        if (( idx = selSubtype.indexOf( href.trim()))  > -1 ) {
           selSubtype.splice( idx, 1 );
           setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
        } else {
           selSubtype.push(href.trim());
           setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
        }

        $( event.target ).blur();
        if (selSubtype.length == 0) {
            $('.subtypesTextBox').attr("placeholder",'{{__('app.all_subtypes')}}');
        } else {
            $('.subtypesTextBox').attr("placeholder","");
            if ((selFeit.length + selSubtype.length) < 2) {
                $('#liCreateQuery').hide();
            }
        }
        composeQuery();
    });
    

    $('#al_resultList').on('shown.bs.tab', function (e) {
  e.preventDefault();
  window.open(e.target.href, "_self");
})

    $(document).on('click','.feitenTextBox',function(event){
        $('#feitenbox').slideToggle();
        firstOpenFeit = false;
    });

    $(document).on('click','.subtypesTextBox',function(event){
        $('#subtypesbox').slideToggle();
        firstOpenSubtype = false;
    });
    
    $('#liCreateSearchBlock').click(function(e){
       $('#feitenbox').slideUp();
        firstOpenFeit = false;        
        $('#subtypesbox').slideUp();
        firstOpenSubtype = false;
        createSearchBlock(0);
    });
    
        $('#liCreateQuery').click(function(e){
           e.preventDefault();
           $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
          });
          
           $.ajax({
              url: "{{ url('/feit/post') }}",
              method: 'post',
              dataType: 'json',
              data: {
                  lijst: 'none',
                 feit: selFeit,
                 subtype: selSubtype,
                 other: advSQLFieldsArray
              },
              success: function(result){
                  alResultTable(result,transtab);
              }});
           });
           

        $('#liResetQuery').click(function(e){
            e.preventDefault();
           selSubtype.splice(0,selSubtype.length);           
           selFeit.splice(0,selFeit.length);
           searchItemNr = 1;
           $('#alSearchCriterium').html('');
           $('#al_resultList').html('');
           $('#li_navbar').html('');
           $('#liCreateQuery').hide();
           $('.feitenTextBox').attr("placeholder",'{{__('app.wait')}}');
           $('.subtypesTextBox').attr("placeholder",'{{__('app.wait')}}');
            $.ajaxSetup({
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               }
           });
           $.ajax({
              url: "{{ url('/feit/post') }}",
              method: 'post',
              dataType: 'json',
              data: {
                 lijst: 'feittype',
              },              
              success: function(result){
                    alFeitenTable(result);
                    $('.feitenTextBox').attr("placeholder",'{{__('app.search_fact')}}');
                    $.ajax({
                       url: "{{url('/feit/post')}}",
                       method: 'post',
                       dataType: 'json',
                       data: {
                          lijst: 'subtype',
                       },              
                       success: function(result){
                           alSubtypesTable(result);
                           $('.subtypesTextBox').attr("placeholder",'{{__('app.search_subtype')}}');
                       }});

                }});
           });
           
});


function feitBtn() {
    if (firstOpenFeit == false) {
        $('#feitenbox').slideToggle();
    }
};

function subtypeBtn(){
    if (firstOpenSubtype == false) {
        $('#subtypesbox').slideToggle();
    }
};


function criterialijst_change_1() {
        var val1 = $('#criterialijst_1 option:selected').val();
        if (val1 == 'datum') {
            createStartDatumSearchBlock(1);
        } else {
            createStartSearchBlock(1,val1);
        }
    }

function criterialijst_change_2() {
        var val1 = $('#criterialijst_2 option:selected').val();
        if (val1 == 'datum') {
            createDatumSearchBlock(2);
        } else {
            createSearchBlock(2,val1);
        }
    }

function criterialijst_change_3() {
        var val1 = $('#criterialijst_3 option:selected').val();
        if (val1 == 'datum') {
            createDatumSearchBlock(3);
        } else {
            createSearchBlock(3,val1);
        }
    }

function criterialijst_change_4() {
        var val1 = $('#criterialijst_4 option:selected').val();
        if (val1 == 'datum') {
            createDatumSearchBlock(4);
        } else {
            createSearchBlock(4,val1);
        }
    }

function criterialijst_change_5() {
        var val1 = $('#criterialijst_5 option:selected').val();
        if (val1 == 'datum') {
            createDatumSearchBlock(5);
        } else {
            createSearchBlock(5,val1);
        }
    }
</script>
   
@endsection
