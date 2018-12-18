
@extends('layouts.app')
@section('content')

<div class="container" style="background-color:#ffffff; border-color: rgb(65,169,73); border-style: groove; border-width: 2px;" >
    
<div class="container">
<div  style="background-color:#eaecef; border-style: groove; border-width: 1px; margin-top: 20px;">
    <div class="row li_align_center" >
    <div class="col-sm">
        <p class="li_bold_info">{{__('app.search_on')}}</p>
    </div>
    <div class="col-sm">
    <div class="button-group"  style="margin: 10px">
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
    <div class="button-group" style="margin: 10px">
        <input class="geotextbox subtypesTextBox" name="subtypesbox" placeholder="{{__('app.search_subtype')}}" onkeyup="limZoekSubtype();" maxlength="20"/>
        <button id="subtypes_btn" type="button" onclick="subtypeBtn()" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">{{__('app.subtype')}}<span class="caret"></span></button>
        <ul id=subtypesbox class="dropdown-menu">
        @foreach($subtypes as $subtype)
            <li><a href="#" class="small" data-value="{{$subtype->trefwoord}}" tabIndex="-1"><input type="checkbox" />{{$subtype->trefwoord}}</a></li>              
        @endforeach                    
        </ul>
    </div
  </div>
</div>
</div>
    </div>
</div>
<div class="container">
    <div id="alSearchCriterium" style="margin-left:20px;margin-top:10px;margin-bottom:10px;margin-right:200px;">

    </div>
</div>
<div class="container" >
    <div class="btn-group" style="margin-bottom: 20px;" role="group" aria-label="Basic example">
        <button type="button" id="liCreateSearchBlock" class="btn btn-secondary">{{__('app.new_line')}}</button>
    </div>
    <div class="btn-group" style="margin-left:5px;margin-bottom: 20px;" role="group" aria-label="Basic example">
        <button type="button" id="liResetQuery" class="btn btn-secondary">{{__('app.reset')}}</button>
    </div>
    <div class="btn-group" style="margin-left:5px;margin-bottom: 20px;" role="group" aria-label="Basic example">
        <button type="button" id="liShowQuery"  class="btn btn-secondary">{{__('app.query')}}</button>                    
    </div>                     
    <div class="btn-group" style="margin-left:5px;margin-bottom: 20px;" role="group" aria-label="Basic example">
        <button type="button" id="liCreateQuery"  style="display: none;" class="btn btn-secondary">{{__('app.search')}} </button>                    
    </div>   
        
</div>
<div class="container" id=al_loading style="display: none;margin-top:10px;margin-bottom: 20px;">
    <p class="li_bold_info">{{__('app.wait')}}</p>
</div>

<div class="container" id=alQueryBox style="display: none;margin-top:10px;margin-bottom: 20px;">
<div style="background-color:#eaecef; border-style: groove; border-width: 1px;">

    <div id=alQueryBox class="query">
        <div class="row">
            <div class="col-sm">
                <p  style="margin:10px">query: </p>
                <div id= alQuery>
                </div>
            </div>
            
        </div>
    </div>
</div>
</div>
</div>

<div id="al_resultlist_cont" class="container" style="margin-top: 2px">
    <div id="li_navbar">
    </div>
    <div class="list-group" role="tablist" id="alResultList">
        <div class="list-group" id="al_resultList">
        </div>
    </div>        
</div>

<div id="al_resultlist_detail_cont" class="container" style="margin-top: 2px">
    <div id="li_navbar_detail" style="display: none;">
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #9fd7a3; margin-top:2px">
            <div class ="col-lg-10">
                <span class="navbar-text">
                    {{__('app.detail')}}
                </span>
            </div>            
            <div class="col-lg-auto">
                <nav aria-label="Page navigation example" style="padding-top: 15px; padding-bottom: 5px">
                <ul class="pagination">
                <li id="li_prev" class="page-item"><a class="page-link" href="javascript:jumpToPreviousDetailPage();"  aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>
                <li id="li_next" class="page-item"><a class="page-link" href="javascript:jumpToNextDetailPage();" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>
                </ul>
                </nav>
            </div>            
            <div class="col-lg-auto">
                <input id="liToMainPage" type="button" onclick="liToMainPage(); return false;" size="12" readonly value="{{__('app.back')}}" >
            </div>            
        </nav>        
    </div>
    <div id="alDetailResultList" style="overflow: auto;">
        <div id="al_detailResultList">
        </div>
    </div>        
</div>

<script>
$(document).ready(function(){
    
    firstOpenFeit = true;
    firstOpenSubtype = true;
    newwindow = null;

    transtab = [];
    transtab['url']='{{ url('') }}';
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
    transtab['text']='{{__('app.text')}}';
    transtab['date']='{{__('app.date')}}';
    transtab['place']='{{__('app.place')}}';
    transtab['keyword']='{{__('app.keyword')}}';
    transtab['source_class']='{{__('app.source_class')}}';
    transtab['archive_law']='{{__('app.archive_law')}}';
    transtab['detail']='{{__('app.detail')}}';
    transtab['fill_out']='{{__('app.fill_out')}}';
    transtab['municipality']='{{__('app.municipality')}}';
    transtab['description']='{{__('app.description')}}';
    transtab['fact']='{{__('app.fact')}}';
    transtab['authority']='{{__('app.authority')}}';
    transtab['add']='{{__('app.add')}}';
    transtab['remove']='{{__('app.remove')}}';
    transtab['bracket']='{{__('app.bracket')}}';
    
    $( document ).ajaxStart(function() {
          $( "#al_loading" ).show();
    });
    $( document ).ajaxStop(function() {
          $( "#al_loading" ).hide();
    });
        
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
        composeQuery(0);
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
        composeQuery(0);
    });
    

    $('#al_resultList').on('shown.bs.tab', function (e) {
        e.preventDefault();
        //window.open(e.target.href, "_blank");
        var persId = e.target.href.substring(e.target.href.lastIndexOf('/')+1);
        currentIndex = e.target.type;
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
               lijst: 'detail',
               feit_id: e.target.id,
               pers_id: persId
           },
           success: function(resultaat){
               alResultDetailTable(resultaat,transtab);
           }
       });
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
        $('#al_resultList').empty();
        $('#al_detailResultList').empty();
        $('#li_navbar').empty();
        $('#li_navbar_detail').hide();
        addSearchBlock(0);
    });
    
    $('#liToMainPage').click(function(e){
        $('#li_navbar_detail').hide();
        $('#al_detailResultList').hide();
        $('#al_resultList').show();
        $('#li_navbar').show();
    });

        $('#liShowQuery').click(function(e){
           e.preventDefault();    
           if ($('#alQueryBox').css('display') == 'none') {
                $('#alQueryBox').show();
            } else {
                $('#alQueryBox').hide();
            }
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
           searchArr.splice(0,searchArr.length);
           searchItemNr = 1;
           $('#al_resultList').html('');
           $('#li_navbar').html('');
            $('#li_navbar_detail').hide('');
            $('#alSearchCriterium').html('');
            $('#al_detailResultList').empty();
            $('#alQueryBox').hide();
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


function limZoekFeit()
{
    var filter = $(".feitenTextBox").val();
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
           filter: filter,
        },
        success: function(result){
            alResultFeiten(result);
        }
    });
}


function limZoekSubtype() {
    
   var filter = $(".subtypesTextBox").val();
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
           lijst: 'zoekSubtype',
           filter: filter,
        },
        success: function(result){
            alResultSubtypes(result);
        }
    });
}







function jumpToPreviousDetailPage()
{
        if (currentIndex != 0) {
            currentIndex--;
        }
        if (currentIndex == 0) $('#li_prev').prop('disabled', true);
        if (currentIndex == (resultlijst.length-2)) $('#li_next').prop('disabled', false);
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
               lijst: 'detail',
               feit_id: resultlijst[currentIndex].feit_id,
               pers_id: resultlijst[currentIndex].pers_id,
           },
           success: function(result){
               alResultDetailTable(result,transtab);
           }
       });
}

function jumpToNextDetailPage()
{
        if (currentIndex != (resultlijst.length-1)) {
            currentIndex++;
        }
        if (currentIndex == (resultlijst.length-1)) $('#li_next').prop('disabled', true);
        if (currentIndex == 1) $('#li_prev').prop('disabled', false);
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
               lijst: 'detail',
               feit_id: resultlijst[currentIndex].feit_id,
               pers_id: resultlijst[currentIndex].pers_id,
           },
           success: function(result){
               alResultDetailTable(result,transtab);
           }
       });    
}

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
        var andOrNot = $('#andOrNotlijst_1 option:selected').val();
        if (val1 == 'datum') {
            createStartDatumSearchBlock(1,andOrNot);
        } else {
            updateSearchBlock(1,val1,andOrNot);
        }
    }

function criterialijst_change_2() {
        var val1 = $('#criterialijst_2 option:selected').val();
        var andOrNot = $('#andOrNotlijst_2 option:selected').val();
        if (val1 == 'datum') {
            createDatumSearchBlock(2,andOrNot);
        } else {
            updateSearchBlock(2,val1,andOrNot);
        }
    }

function criterialijst_change_3() {
        var val1 = $('#criterialijst_3 option:selected').val();
        var andOrNot = $('#andOrNotlijst_3 option:selected').val();
        
        if (val1 == 'datum') {
            createDatumSearchBlock(3,andOrNot);
        } else {
            updateSearchBlock(3,val1,andOrNot);
        }
    }

function criterialijst_change_4() {
        var val1 = $('#criterialijst_4 option:selected').val();
        var andOrNot = $('#andOrNotlijst_4 option:selected').val();
        
        if (val1 == 'datum') {
            createDatumSearchBlock(4,andOrNot);
        } else {
            updateSearchBlock(4,val1,andOrNot);
        }
    }

function criterialijst_change_5() {
        var val1 = $('#criterialijst_5 option:selected').val();
        var andOrNot = $('#andOrNotlijst_5 option:selected').val();
        
        if (val1 == 'datum') {
            createDatumSearchBlock(5,andOrNot);
        } else {
            updateSearchBlock(5,val1,andOrNot);
        }
    }
</script>
   
@endsection
