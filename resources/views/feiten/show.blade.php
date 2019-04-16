@extends('layouts.app')
@section('content')

<div id=al_loading style="display: none;margin-top:10px;margin-bottom: 20px;">
    <p class="li_bold_info">{{__('app.wait')}}</p>
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
    
    transtab = [];
    transtab['url']='{{ url('') }}';
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

    zoekFeit({!! $feit_id !!});
    
    $('#al_detailResultList').empty();

    
    $( document ).ajaxStart(function() {
          $( "#al_loading" ).show();
    });
    $( document ).ajaxStop(function() {
          $( "#al_loading" ).hide();
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
    });
    $('#al_resultList').on('hide.bs.tab', function (e){
        e.preventDefault();
        
    });
    $('#al_resultList').on('hidden.bs.tab', function (e){
        e.preventDefault();
    });

    $('#al_resultList').on('shown.bs.tab', function (e) {
        e.preventDefault();
    });
});

function zoekFeit(feit_id) {
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
            feit_id: feit_id,
            pers_id: null
        },
        success: function(result){
            alResultDetailTable(result,transtab);
    }});
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


function  liToMainPage(){
        $('#li_navbar_detail').hide();
        $('#al_detailResultList').hide();
        $('#al_resultList').show();
        $('#li_navbar').show();
    };


function getGoogleDriveADAFileId(adacode){
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
               lijst: 'file',
               adacode: adacode,
           },
           success: function(result){
               newwindow = window.open('../'+result[0], "_blank");
               imageresult = result;
               newwindow.onload = function () {
                    $.ajax({
                        url: "{{ url('/feit/post') }}",
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
