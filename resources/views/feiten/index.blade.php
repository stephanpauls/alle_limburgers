
@extends('layouts.app')
@section('content')

<div class="container" style="background-color:#ffffff; border-color: rgb(65,169,73); border-style: groove; border-width: 2px;" >

    
<div class="container">

<div  style="background-color:#eaecef; border-style: groove; border-width: 1px; margin-top: 20px;">
    <div class="row li_align_center" >
        <div class="col-sm">
            <div style="float:left;border:1px;width:180px;">
                <p class="li_bold_info">{{__('app.search_on')}}</p>
            </div>            
        </div>
        <div class="col-sm">
            <div class="button-group"  style="margin: 10px">
                <input class="geotextbox feitenTextBox" name="feitenbox" placeholder="{{__('app.all_facts')}}" onkeyup="limZoekFeit();" maxlength="20"/>
                <button id="feiten_btn" type="button"  onclick="" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">{{__('app.fact')}}<span class="caret"></span></button>
                <ul id=feitenbox class="dropdown-menu">
                </ul>
            </div>
        </div>
        <div class="col-sm">
            <div class="button-group" style="margin: 10px">
                <input class="geotextbox subtypesTextBox" name="subtypesbox" placeholder="{{__('app.all_subtypes')}}" onkeyup="limZoekSubtype();" maxlength="20"/>
                <button id="subtypes_btn" type="button" onclick="" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">{{__('app.subtype')}}<span class="caret"></span></button>
                <ul id=subtypesbox class="dropdown-menu">
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
<div class="container">
    <div style="float:left;border:1px;width:180px;">
        <p class="li_bold_info">{{__('app.search_to')}}</p>
    </div>

    <div id="alSearchCriterium" style="margin-left:22%;margin-top:10px;margin-bottom:10px;margin-right:10px">
    </div>
</div>
<div class="container" >
<div id="alSearchCriterium" style="margin-left:20px;margin-top:10px;margin-bottom:10px;margin-right:180px;">
    <div class="btn-group" style="margin-bottom: 20px;" role="group" aria-label="Basic example">
        <button type="button" id="liCreateSearchBlock" class="btn btn-secondary">{{__('app.new_line')}}</button>
    </div>

    <div class="btn-group" style="margin-bottom: 20px;margin-right:2%" role="group" aria-label="Basic example">
        <button type="button" id="liCreateQuery"  style="display: none;" class="btn btn-secondary"><span>{{__('app.search')}}</span></button>                    
    </div>       
<div id=al_two_choices class="btn-group" style="display: none;margin-right:1%;" role="group" aria-label="Basic example">
    <p class="li_info" style="color:black;font-size:16px;">{{__('app.two_choices')}}</p>
</div>

    <div class="btn-group" style="margin-left:20%;margin-bottom: 20px;" role="group" aria-label="Basic example">
        <button type="button" id="liResetQuery" class="btn btn-secondary">{{__('app.reset')}}</button>
    </div>
    
    <div class="btn-group" style="margin-bottom: 20px;" role="group" aria-label="Basic example">
        <button type="button" id="liShowQuery"  class="btn btn-secondary">{{__('app.show_query')}}</button>                    
    </div>                     
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
    <div id="alDetailResultList">
        <div id="al_detailResultList" class= "row">
        </div>
    </div>        
</div>
<script>
$(document).ready(function(){
    
    firstOpenFeit = true;
    firstOpenSubtype = true;
    newwindow = null;
    imageresult = null;
    rollen = [];
    authorities = [];
    feiten = [];
    subtypes = [];
    bronnen = [];
    oobjtypes = [];
    soorten = [];
    
    transtab = [];
    transtab['url']='{{ secure_url('') }}';
    transtab['name']='{{__('app.name')}}';
    transtab['first_name']='{{__('app.first_name')}}';
    transtab['role']='{{__('app.role')}}';
    transtab['two_choices']='{{__('app.two_choices')}}';
    transtab['search']='{{__('app.search')}}';
    transtab['details']='{{__('app.details')}}';
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
    transtab['archive_law']='{{__('app.archive_law')}}';
    transtab['detail']='{{__('app.detail')}}';
    transtab['fill_out']='{{__('app.fill_out')}}';
    transtab['fill_out_date']='{{__('app.fill_out_date')}}';
    transtab['description']='{{__('app.description')}}';
    transtab['fact']='{{__('app.fact')}}';
    transtab['authority']='{{__('app.authority')}}';
    transtab['add']='{{__('app.add')}}';
    transtab['remove']='{{__('app.remove')}}';
    transtab['bracket']='{{__('app.bracket')}}';
    transtab['and']='{{__('app.and')}}';
    transtab['or']='{{__('app.or')}}';
    transtab['not']='{{__('app.not')}}';
    transtab['objecttype']='{{__('app.objecttype')}}';
    transtab['type']='{{__('app.type')}}';
    transtab['toponym']='{{__('app.toponym')}}';
    transtab['subtype']='{{__('app.subtype')}}';
    
    transtab['person']='{{__('app.person')}}';
    transtab['firstnames']='{{__('app.firstnames')}}';
    transtab['remark']='{{__('app.remark')}}';
    transtab['perstype']='{{__('app.perstype')}}';
    transtab['characteristic']='{{__('app.chararacteristic')}}';
    
    transtab['value']='{{__('app.value')}}';
    transtab['authority']='{{__('app.authority')}}';
    
    transtab['source']='{{__('app.source')}}';
    transtab['province']='{{__('app.province')}}';
    transtab['status']='{{__('app.status')}}';
    transtab['country']='{{__('app.country')}}';
    transtab['category']='{{__('app.category')}}';
    transtab['source_class']='{{__('app.source_class')}}';
    transtab['language']='{{__('app.language')}}';
    transtab['placecode']='{{__('app.placecode')}}';
    transtab['keyword']='{{__('app.keyword')}}';
    transtab['adacode']='{{__('app.adacode')}}';
    transtab['section']='{{__('app.section')}}';
    transtab['description']='{{__('app.description')}}';
    transtab['municipality']='{{__('app.municipality')}}';
    transtab['place']='{{__('app.place')}}';
    transtab['startdate']='{{__('app.startdate')}}';
    transtab['enddate']='{{__('app.enddate')}}';
    transtab['column']='{{__('app.column')}}';
    transtab['provcode']='{{__('app.provcode')}}';
    transtab['landcode']='{{__('app.landcode')}}';


    transtab['archive_law']='{{__('app.archive_law')}}';
    transtab['facttype']='{{__('app.Type of fact')}}';    
    
    transtab['afkomstig uit']='{{__('app.afkomstig°uit')}}';
    transtab['doopplaats']='{{__('app.doopplaats')}}';
    transtab['wettigingsdatum']='{{__('app.wettigingsdatum')}}';
    transtab['tijdstip_omschrijving']='{{__('app.tijdstip_omschrijving')}}';
    transtab['toponiem']='{{__('app.toponiem')}}';
    transtab['begraafplaats']='{{__('app.begraafplaats')}}';
    transtab['plaats van huwelijk']='{{__('app.plaats°van°huwelijk')}}';
    transtab['geboortedatum']='{{__('app.geboortedatum')}}';
    transtab['woonplaats']='{{__('app.woonplaats')}}';
    transtab['ondertrouwdatum']='{{__('app.ondertrouwdatum')}}';
    transtab['plaats van ondertrouw']='{{__('app.plaats°van°ondertrouw')}}';
    transtab['geboorteplaats']='{{__('app.geboorteplaats')}}';
    transtab['burgerlijke staat']='{{__('app.burgerlijke°staat')}}';
    transtab['alias']='{{__('app.alias')}}';
    transtab['plaats van overlijden']='{{__('app.plaats°van°overlijden')}}';
    transtab['relatie']='{{__('app.relatie')}}';
    transtab['doodsoorzaak']='{{__('app.doodsoorzaak')}}';
    transtab['adres']='{{__('app.adres')}}';
    transtab['beroep']='{{__('app.beroep')}}';
    transtab['doopdatum']='{{__('app.doopdatum')}}';
    transtab['overlijdensdatum']='{{__('app.overlijdensdatum')}}';
    transtab['roepnaam']='{{__('app.roepnaam')}}';
    transtab['leeftijd']='{{__('app.leeftijd')}}';
    transtab['aangiftedatum']='{{__('app.aangiftedatum')}}';
    transtab['begraafdatum']='{{__('app.begraafdatum')}}';
    
    transtab['artikel_type']='{{__('app.artikel_type')}}';
    transtab['artikelnummer']='{{__('app.artikelnummer')}}';
    transtab['perceelnr']='{{__('app.perceelnr')}}';
    transtab['grootte']='{{__('app.grootte')}}';
    transtab['belastbaar_inkomen_ongebouwd']='{{__('app.belastbaar_inkomen_ongebouwd')}}';
    transtab['voorlopige_klassering']='{{__('app.voorlopige_klassering')}}';
    transtab['ongebouwde_grootte_1e_klasse']='{{__('app.ongebouwde_grootte_1e_klasse')}}';
    transtab['ongebouwde_grootte_2e_klasse']='{{__('app.ongebouwde_grootte_2e_klasse')}}';
    transtab['ongebouwde_grootte_3e_klasse']='{{__('app.ongebouwde_grootte_3e_klasse')}}';
    transtab['tarief_ongebouwde_1e_klasse']='{{__('app.tarief_ongebouwde_1e_klasse')}}';
    transtab['tarief_ongebouwde_2e_klasse']='{{__('app.tarief_ongebouwde_2e_klasse')}}';
    transtab['tarief_ongebouwde_3e_klasse']='{{__('app.tarief_ongebouwde_3e_klasse')}}';
    transtab['scan_oat']='{{__('app.scan_oat')}}';
    transtab['scan_kaart']='{{__('app.scan_kaart')}}';
    transtab['verwijzing_suppletoire_aanwijzende_tafel']='{{__('app.verwijzing_suppletoire_aanwijzende_tafel')}}';
    transtab['object_koppelveld']='{{__('app.object_koppelveld')}}';
    transtab['blad']='{{__('app.blad')}}';

    
    $( document ).ajaxStart(function() {
          $( "#al_loading" ).show();
    });
    $( document ).ajaxStop(function() {
          $( "#al_loading" ).hide();
    });
/*
    var feit_id  = getQueryVariable("feit_id");
    if (feit_id != null) {
        closeFactBoxes();
        $('#al_detailResultList').empty();
        $('#li_navbar_detail').hide('');
       
        $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });

       $.ajax({
          url: "{{ secure_url('/feit/post') }}",
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
    } else {
*/        
        createFirstSearchBlock();        
//    }
            
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
                fadeSearchButton();
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
                fadeSearchButton();
            }
        }
        composeQuery(0);
    });
    
    $('#al_resultList').on('show.bs.tab', function (e){
        e.preventDefault();
        //window.open(e.target.href, "_blank");
       
        //$('#'+e.target.id).css("background-color","#3490dc");
        var persId = e.target.href.substring(e.target.href.lastIndexOf('/')+1);
        currentIndex = e.target.type;
        $.ajaxSetup({
           headers: {
               'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
           }
        });

        $.ajax({
           url: "{{ secure_url('/feit/post') }}",
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
    });
    $('#al_resultList').on('hide.bs.tab', function (e){
        e.preventDefault();
        
    });
    $('#al_resultList').on('hidden.bs.tab', function (e){
        e.preventDefault();
    });

    $('#al_resultList').on('shown.bs.tab', function (e) {
        e.preventDefault();
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
        addBronSearchBlock(0);
    });

    $('#liShowQuery').click(function(e){
       e.preventDefault();    
        closeFactBoxes();
       if ($('#alQueryBox').css('display') == 'none') {
            $('#alQueryBox').show();
            $('#liShowQuery').text('{{__('app.hide_query')}}');
        } else {
            $('#alQueryBox').hide();
            $('#liShowQuery').text('{{__('app.show_query')}}');
        }
    });

    $('#liCreateQuery').click(function(e){
       e.preventDefault();
       closeFactBoxes();
        $('#al_detailResultList').empty();
        $('#li_navbar_detail').hide('');
       
       $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
      });

       $.ajax({
          url: "{{ secure_url('/feit/post') }}",
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
        closeFactBoxes();
        selSubtype.splice(0,selSubtype.length);           
        selFeit.splice(0,selFeit.length);
        searchArr.splice(0,searchArr.length);
        advSQLFieldsArray.splice(0,searchArr.length);
        searchItemNr = 1;
        $('#al_resultList').html('');
        $('#li_navbar').html('');
        $('#li_navbar_detail').hide('');
        $('#alSearchCriterium').html('');
        $('#al_detailResultList').empty();
        $('#alQueryBox').hide();
        fadeSearchButton();
        $('.feitenTextBox').attr("placeholder",'{{__('app.wait')}}');
        $('.subtypesTextBox').attr("placeholder",'{{__('app.wait')}}');
        alFeitenTable(feiten);
        $('.feitenTextBox').attr("placeholder",'{{__('app.all_facts')}}');
        alSubtypesTable(subtypes);
        $('.subtypesTextBox').attr("placeholder",'{{__('app.all_subtypes')}}');
        addSearchBlock(0);
 /*       
        $.ajaxSetup({
           headers: {
               'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
           }
        });
        $.ajax({
            url: "{{ secure_url('/feit/post') }}",
            method: 'post',
            dataType: 'json',
            data: {
               lijst: 'feittype',
            },              
            success: function(result){
                alFeitenTable(result);
                $('.feitenTextBox').attr("placeholder",'{{__('app.all_facts')}}');
                $.ajax({
                    url: "{{secure_url('/feit/post')}}",
                    method: 'post',
                    dataType: 'json',
                    data: {
                       lijst: 'subtype',
                    },              
                    success: function(result){
                        alSubtypesTable(result);
                        $('.subtypesTextBox').attr("placeholder",'{{__('app.all_subtypes')}}');
                    }
                });
            }
        });
*/        
    });
    
    $('#alSearchCriterium').click(function(){
     closeFactBoxes();
    });    
    
    
    $('#feiten_btn').click(function(e){
        e.preventDefault();
        if (firstOpenFeit == false) {
            $('#feitenbox').slideToggle();
        }
    });

    $('#subtypes_btn').click(function(e){
        e.preventDefault();
        if (firstOpenSubtype == false) {
        $('#subtypesbox').slideToggle();
    }
    });
    
    
    
});


function createFirstSearchBlock() {
        closeFactBoxes();
        $('#al_resultList').empty();
        $('#al_detailResultList').empty();
        $('#li_navbar').empty();
        $('#li_navbar_detail').hide();

       $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
       });
                    $.ajax({
                        url: "{{ secure_url('/feit/post') }}",
                        method: 'post',
                        dataType: 'json',
                        data: {
                           lijst: 'feittype',
                        },              
                        success: function(result){
                            var j=0;
                            for (var i=0;i<result.length;i++) {
                                if (result[i].feittype != null) {
                                   feiten[j++]=result[i].feittype;
                                }
                            }                            
                            alFeitenTable(feiten);
                            $('.feitenTextBox').attr("placeholder",'{{__('app.all_facts')}}');
                            $.ajax({
                                url: "{{secure_url('/feit/post')}}",
                                method: 'post',
                                dataType: 'json',
                                data: {
                                   lijst: 'subtype',
                                },              
                                success: function(result){
                                    var j=0;
                                    for (var i=0;i<result.length;i++) {
                                        if (result[i].feitsubtype != null) {
                                        subtypes[j++]=result[i].feitsubtype;
                                    }
                                    }
                                    alSubtypesTable(subtypes);
                                    $('.subtypesTextBox').attr("placeholder",'{{__('app.all_subtypes')}}');
                                    addAuthSearchBlock(0);
                                    addSoortSearchBlock(0);
                                    addOobjtypeSearchBlock(0);
                                    addRoleSearchBlock(0);
                                    addBronSearchBlock(0);
                                }
                            });
                        }
         });
       };        

function addDatumAuthSearchBlock(arrIndex) {
    if (authorities.length == 0) {
    
        $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
            url: "{{ secure_url('/feit/post') }}",
            method: 'post',
            dataType: 'json',
            data: {
                lijst: 'authorities'
            },
            success: function(result){
                for (var i=0;i<result.length;i++) {
                    authorities[i]=encodeURI(result[i].authority);
                }
            }
        });
    } else {
        addDatumAuthSearchBlockFinal(arrIndex);
    }
}
function addAuthSearchBlock(arrIndex) {
    if (authorities.length == 0) {
    
        $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
            url: "{{ secure_url('/feit/post') }}",
            method: 'post',
            dataType: 'json',
            data: {
                lijst: 'authorities'
            },
            success: function(result){
                for (var i=0;i<result.length;i++) {
                    if (result[i].authority != null){
                        authorities[i]=encodeURI(result[i].authority);
                    }
                }
            }
        });
    } else {
        addAuthSearchBlockFinal(arrIndex);
    }
}

function addRoleSearchBlock(arrIndex) {

if (rollen.length == 0) {
       $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
       });
       $.ajax({
           url: "{{ secure_url('/feit/post') }}",
           method: 'post',
           dataType: 'json',
           data: {
               lijst: 'rollen'
           },
           success: function(result){
                for (var i=0;i<result.length;i++) {
                    if (result[i].rol != null){
                        rollen[i]=encodeURI(result[i].rol);
                    }
                }
            }
        });
    } else {
        addRoleSearchBlockFinal(arrIndex);
    }
}
//nieuwe start search block
function addBronSearchBlock(arrIndex) {

if (bronnen.length == 0) {
       $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
       });
       $.ajax({
           url: "{{ secure_url('/feit/post') }}",
           method: 'post',
           dataType: 'json',
           data: {
               lijst: 'bron'
           },
           success: function(result){
                for (var i=0;i<result.length;i++) {
                    if (result[i].categorie != null){
                        bronnen[i]=encodeURI(result[i].categorie);
                    }
                }
                addBronSearchBlockFinal(arrIndex);
                composeQuery(1);
            }
        });
    } else {
        addBronSearchBlockFinal(arrIndex);
    }
}

function addSoortSearchBlock(arrIndex) {

if (soorten.length == 0) {
       $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
       });
       $.ajax({
           url: "{{ secure_url('/feit/post') }}",
           method: 'post',
           dataType: 'json',
           data: {
               lijst: 'soort'
           },
           success: function(result){
                for (var i=0;i<result.length;i++) {
                    if (result[i].soort != null){
                        soorten[i]=encodeURI(result[i].soort);
                    }
                }
            }
        });
    } else {
        addSoortSearchBlockFinal(arrIndex);
    }
}

function addOobjtypeSearchBlock(arrIndex) {

if (oobjtypes.length == 0) {
       $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
       });
       $.ajax({
           url: "{{ secure_url('/feit/post') }}",
           method: 'post',
           dataType: 'json',
           data: {
               lijst: 'oobjtype'
           },
           success: function(result){
                for (var i=0;i<result.length;i++) {
                    if (result[i].oobjtype != null){
                        oobjtypes[i]=encodeURI(result[i].oobjtype);
                    }
                }
            }
        });
    } else {
        addOobjtypeSearchBlockFinal(arrIndex);
    }
}


function limZoekFeit()
{
    var filter = $(".feitenTextBox").val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
    });
          
    $.ajax({
        url: "{{ secure_url('/feit/post') }}",
        method: 'post',
        dataType: 'json',
        data: {
           lijst: 'zoekFeit',
           filter: filter,
        },
        success: function(result){
            alResultFeiten(result);
            $('#feitenbox').slideDown();
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
        url: "{{ secure_url('/feit/post') }}",
        method: 'post',
        dataType: 'json',
        data: {
           lijst: 'zoekSubtype',
           filter: filter,
        },
        success: function(result){
            alResultSubtypes(result);
            $('#subtypesbox').slideDown();
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
           url: "{{ secure_url('/feit/post') }}",
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
           url: "{{ secure_url('/feit/post') }}",
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


function  liToMainPage(){
        $('#li_navbar_detail').hide();
        $('#al_detailResultList').hide();
        $('#al_resultList').show();
        $('#li_navbar').show();
    };

function criterialijst_change(itemNr) {
        var val1 = $('#criterialijst_'+itemNr+' option:selected').val();
        var andOrNot = $('#andOrNotlijst_'+itemNr+' option:selected').val();

        if (val1 == 'datum') {
            addDatumSearchBlock(itemNr);
        } else if (val1 == 'authority'){
            addAuthSearchBlockFinal(itemNr);
        } else if (val1 == 'rol'){
            addRoleSearchBlockFinal(itemNr);
        } else if (val1 == 'soort'){
            addSoortSearchBlockFinal(itemNr);
        } else if (val1 == 'categorie'){
            addBronSearchBlockFinal(itemNr);
        } else if (val1 == 'oobjtype'){
            addOobjtypeSearchBlockFinal(itemNr);
        } else {
            addSearchBlock(itemNr);
        }
        updItemNr = searchItemNr-1;
        updateSearchBlock(updItemNr,val1,andOrNot,null);
        
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == itemNr ) {
                    removeSearchBlock(itemNr);
                    itemNr = ind;
                    break;
                }
            } 
        }
    }
    
function authoritylist_change(itemNr) {
        var val1 = $('#criterialijst_'+itemNr+' option:selected').val();
        var andOrNot = $('#andOrNotlijst_'+itemNr+' option:selected').val();
        var auth = $('#authoritylijst_'+itemNr+' option:selected').val();

        if (auth.includes('datum')) {
            addDatumAuthSearchBlock(itemNr);
        } else {
            addAuthSearchBlock(itemNr);
        }
        updItemNr = searchItemNr-1;
        updateSearchBlock(updItemNr,val1,andOrNot,auth);
        
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == itemNr ) {
                    removeSearchBlock(itemNr);
                    itemNr = ind;
                    break;
                }
            } 
        }
    }    
    
    


function getGoogleDriveADAFileId(adacode){
         $.ajaxSetup({
           headers: {
               'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
           }
        });

        $.ajax({
           url: "{{ secure_url('/feit/post') }}",
           method: 'post',
           dataType: 'json',
           data: {
               lijst: 'file',
               adacode: adacode,
           },
           success: function(result){
               newwindow = window.open(result[0], "_blank");
               imageresult = result;
               newwindow.onload = function () {
                    $.ajax({
                        url: "{{ secure_url('/feit/post') }}",
                        method: 'post',
                        dataType: 'json',
                        data: {
                            lijst: 'verwijder_file',
                            filepathJpg: imageresult[1],
                            filepathOrig: imageresult[2],
                        },
                        success: function(result){
                        }
                    }); 
                }               
            }
        })
    }
    
    
</script>
   
@endsection
