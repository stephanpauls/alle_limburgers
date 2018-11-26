
@extends('layouts.app')
@section('content')

<div class="container">
<div class="col-md-7 col-lg-7">
  <div class="row">
    <div class="col-sm">
    <div class="button-group">
        <input class="geotextbox feitenTextBox" name="feitenbox" placeholder="Zoek feit" onkeyup="limZoekFeit();" maxlength="20"/>
        <button id="feiten_btn" type="button" onclick="feitBtn()" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">Feiten<span class="caret"></span></button>
        <ul id=feitenbox class="dropdown-menu">
        @foreach($feiten as $feit)
            <li><a href="#" class="small" data-value="{{$feit->feittype}}" tabIndex="-1"><input type="checkbox" />{{$feit->feittype}}</a></li>              
        @endforeach                    
        </ul>
    </div>
    </div>
    <div class="col-sm">
    <div class="button-group">
        <input class="geotextbox subtypesTextBox" name="subtypesbox" placeholder="Zoek feit" onkeyup="limZoekSubtype();" maxlength="20"/>
        <button id="subtypes_btn" type="button" onclick="subtypeBtn()" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">Subtypes<span class="caret"></span></button>
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
                    <button type="button" id="liCreateQuery" class="btn btn-secondary">Zoeken</button>
                    <button type="button" id="liResetQuery" class="btn btn-secondary">Reset</button>
                </div>        
</div>
</div>
<div class="container">
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
<div class="container" >
    <div id="li_navbar">
<!--        
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
            <div class="col-lg-1">
                <a class="navbar-brand" href="#">Pag. 1</a>    
            </div>
            <div class ="col-lg-5">
                <span class="navbar-text">
                    165 resultaten
                </span>
            </div>
            <div class ="col-lg-auto">
                <span class="navbar-text">
                    Pag. 1/4 &nbsp;
                </span>
            </div>            
            <div class="col-lg-auto">
            <form class="form-inline">
                <input class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search">
            </form>        
            </div>
            
            <div class="col-lg-auto">
                <nav aria-label="Page navigation example" style="padding-top: 15px; padding-bottom: 5px">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav> 
                </div>
        </nav>
-->        
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
           $('.feitenTextBox').attr("placeholder","Alle feiten");
           if (selSubtype.length == 0) {
               createStartSearchBlock(0);
           }
           
       } else {
           $('.feitenTextBox').attr("placeholder","");
           if (selSubtype.length > 0) {
               createStartSearchBlock(0);
           }
       }
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
            $('.subtypesTextBox').attr("placeholder","Alle subtypes");
             if (selFeit.length == 0) {
                createStartSearchBlock(0);
            }
        } else {
            $('.subtypesTextBox').attr("placeholder","");
            if (selFeit.length > 0) {
                createStartSearchBlock(0);
            }
        }
    });
    
/*
    $(document).on('click','#al_resultList',function(event){    
      inhoud = $('#al_resultList').html();
      $('#al_resultList').tab('show');
    })
  */  
    $('#al_resultList').on('shown.bs.tab', function (e) {
  e.preventDefault();
  window.open(e.target.href, "_self");
  /*
   
   if (newwindow!=null)newwindow.close();
  newwindow=window.open(e.target.href,'detail record','height=500,width=600');
  */
/*  
  $('html').load(e.target.href, function() {
   alert('load complete callback');
   
});
  */
  //e.relatedTarget // previous active tab
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
                  alResultTable(result);
              }});
           });
           

        $('#liResetQuery').click(function(e){
            e.preventDefault();
           selSubtype.splice(0,selSubtype.length);           
           selFeit.splice(0,selFeit.length);
           $('#alSearchCriterium').html('');
           $('#al_resultList').html('');
           $('#li_navbar').html('');
           
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
                    $.ajax({
                       url: "{{url('/feit/post')}}",
                       method: 'post',
                       dataType: 'json',
                       data: {
                          lijst: 'subtype',
                       },              
                       success: function(result){
                           alSubtypesTable(result);
                       }});

                }});
           });
           
  /*         
function limZoekFeit(){
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
                lijst: 'zoekFeit',
                filter: $(".feitenTextBox").val(),
                feit: selFeit                  
              },
            success: function(result){
            result = result.trim();
            var poutput = [];
            var targetToPush = '';  
            i_count = 0;
            i_count2 = 0;
            while(i_count2<selGem.length)
            {            
                targetToPush += '<li><a href="#" class="small" data-value="';
                targetToPush += i_count;//id
                targetToPush += '" tabIndex="-1"><input type="checkbox" checked/>&nbsp;';
                targetToPush += selFeit[i_count2] ;//Item
                targetToPush += '</a></li>';                  

                i_count++;                
                i_count2++;                
            }
            if(result.length>0)
            {
                keyValueList = result.split("%%");

                for(i_count2=0;i_count2<keyValueList.length;i_count2++)
                {
                    keyvaluearray=keyValueList[i_count2].split("##");

                    targetToPush += '<li><a href="#" class="small" data-value="';
                    targetToPush += i_count;//id

                    targetToPush += '" tabIndex="-1"><input type="checkbox"/>&nbsp;';
                    targetToPush += keyvaluearray[1]  ;//Item
                    targetToPush += '</a></li>';      
                    i_count++;
                }
                poutput.push(targetToPush);

            }        
            $('#feitenbox').html('');
            $('#feitenbox').html(poutput.join(''));
        }
    });              
        
    }           
        */   
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
