
selFeit = [];
selSubtype = [];
firstOpenFeit = false;
firstOpenSubtype = false;
searchItemNr = 1;
fieldTypeArray  = new Array();
subtypeArray  = new Array();
advSQLFieldsArray  = new Array();
newwindow = '';
vanafdatum = 0;
totdatum = 0;
exactdatum = 0;


function limZoekFeit()
{
    var filter = $(".feitenTextBox").val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
    });
          
    $.ajax({
        url: "http://localhost/limburgers/feit/post",
        method: 'post',
        dataType: 'json',
        data: {
           lijst: 'zoekFeit',
           filter: filter,
        },
        success: function(result){
            var poutput = [];
            var targetToPush = '';  
            i_count = 0;
            i_count2 = 0;
            while(i_count2<selFeit.length)
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
                for(i_count2=0;i_count2<result.length;i_count2++)
                {
                    targetToPush +=  '<li><a href="#" class="small" data-value="'+i_count2+'" tabIndex="-1"><input type="checkbox" />'+result[i_count2].feittype+'</a></li>';              
                }                
                poutput.push(targetToPush);
            }        
            $('#feitenbox').html('');
            $('#feitenbox').html(poutput.join(''));
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
        url: "http://localhost/limburgers/feit/post",
        method: 'post',
        dataType: 'json',
        data: {
           lijst: 'zoekSubtype',
           filter: filter,
        },
        success: function(result){
            var poutput = [];
            var targetToPush = '';  
            i_count = 0;
            i_count2 = 0;
            while(i_count2<selSubtype.length)
            {            
                targetToPush += '<li><a href="#" class="small" data-value="';
                targetToPush += i_count;//id
                targetToPush += '" tabIndex="-1"><input type="checkbox" checked/>&nbsp;';
                targetToPush += selSubtype[i_count2] ;//Item
                targetToPush += '</a></li>';                  

                i_count++;                
                i_count2++;                
            }
            if(result.length>0)
            {
                for(i_count2=0;i_count2<result.length;i_count2++)
                {
                    targetToPush +=  '<li><a href="#" class="small" data-value="'+i_count2+'" tabIndex="-1"><input type="checkbox" />'+result[i_count2].trefwoord+'</a></li>';              
                }                
                poutput.push(targetToPush);
            }        
            $('#subtypesbox').html('');
            $('#subtypesbox').html(poutput.join(''));
        }
    });
    
    
}


function createStartSearchBlock(lijn,crit) {
    
    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    
    
    if (lijn==0) {
        searchItemNr = 1;
        itemNr = searchItemNr;
    } else {
        itemNr = lijn;
    }
    var targetToPush = '';
            
        var poutput = [];// voorbereiding

        if (lijn==0) targetToPush = '<div class="card" id="liSearchCrit_'+itemNr+'">';
        targetToPush += '<div class="card" id="liSearchCrit_'+itemNr+'">';
        targetToPush += '<div class="row">';
        targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option value="AND">AND</option>';
    targetToPush += '<option value="OR">OR</option>';
    targetToPush += '<option value="NOT">NOT</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';          
    targetToPush += '</div>';          
        targetToPush += '<div class="col-sm">';
        targetToPush += '<div id="criterialijst_'+itemNr+'">';
        targetToPush += '<select onchange="criterialijst_change_'+itemNr+'();composeQuery()">';
        targetToPush += '<option selected value="naam">naam</option>';
        targetToPush += '<option value="voornamen">voornaam</option>';
        targetToPush += '<option value="datum">datum</option>';
        targetToPush += '<option value="rol">rol</option>';
        targetToPush += '<option value="authoritylijst">authoritylijst</option>';
        targetToPush += '</select>';
        targetToPush += '</div>';
        targetToPush += '</div>';
        targetToPush += '<div class="col-sm">';
        targetToPush += '<div id="operatorlijst_'+itemNr+'">';
        targetToPush += '<select onchange="composeQuery()">';
        targetToPush += '<option selected value="bevat">bevat</option>';
        targetToPush += '<option value="bevat_exact">bevat exact</option>';
        targetToPush += '<option value="begint">begint met</option>';
        targetToPush += '</select>';
        targetToPush += '</div>';
        targetToPush += '</div>';
        targetToPush += '<div class="col-sm">';
        targetToPush += '<input type="text" id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'" onkeyup="composeQuery()"; value="Some text...">';
        //targetToPush += '<textarea onkeyup="composeQuery()"; id="al_filter_'+itemNr+'" cols="20" rows="1"></textarea>';
        targetToPush += '</div>';
        targetToPush += '</div>';
        if (lijn==0) targetToPush += '</div>';

        poutput.push(targetToPush);

        if (lijn==0) { 
            $('#alSearchCriterium').html('');
            $('#alSearchCriterium').html( poutput.join(''));
        } else {
            $('#liSearchCrit_'+lijn).html('');
            $('#liSearchCrit_'+lijn).html( poutput.join(''));
            $('#criterialijst_'+itemNr+' select').val(crit);
        }
        if (lijn==0) {
            searchItemNr++;
        }
}

function createStartDatumSearchBlock() {
    
    var targetToPush = '';
            
    var poutput = [];// voorbereiding
     var targetToPush = '';
        targetToPush = '<div class="row">';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_1">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option value="AND">AND</option>';
    targetToPush += '<option value="OR">OR</option>';
    targetToPush += '<option value="NOT">NOT</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';    
        targetToPush += '<div class="col-sm">';
        targetToPush += '<div id="criterialijst_1">';
        targetToPush += '<select onchange="criterialijst_change_'+itemNr+'();"composeQuery()">';
        targetToPush += '<option selected value="datum">datum</option>';
        targetToPush += '<option value="naam">naam</option>';
        targetToPush += '<option value="voornamen">voornaam</option>';
        targetToPush += '<option value="rol">rol</option>';
        targetToPush += '<option value="authoritylijst">authoritylijst</option>';
        targetToPush += '</select>';
        targetToPush += '</div>';
        targetToPush += '</div>';
        targetToPush += '<div class="col-sm">';
        targetToPush += '<div id="operatorlijst_1">';
        targetToPush += '<select onchange="composeQuery()">';
        targetToPush += '<option selected value="vanaf">vanaf</option>';
        targetToPush += '<option value="totmet">tot en met</option>';
        targetToPush += '<option value="exact">is exact</option>';
        targetToPush += '</select>';
        targetToPush += '</div>';
        targetToPush += '</div>';
        targetToPush += '<div class="col-sm col-md-offset-0">';
        targetToPush += '<div>';
        targetToPush += '<input type="text" id="dp_1">';
        targetToPush += '</div>';
        targetToPush += '</div>';
        targetToPush += '</div>';
        poutput.push(targetToPush);

        $('#liSearchCrit_1').html('');
        $('#liSearchCrit_1').html( poutput.join(''));
        
    tijd = $( "#dp_1" ).datepicker({
        defaultDate: "+1w",
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showOtherMonths: true,
        selectOtherMonths: true
    }).on( "change", function() {
        li_datum( this.value,$( "#operatorlijst_1 option:selected" ).text());
    });


}


function createDatumSearchBlock(lijn) {

    if (lijn == 0) {
        itemNr = searchItemNr;
        for (var i=1;i<itemNr;i++)
        {
            if ((!$.trim($("#al_filter_"+i).val())) && (!$.trim($("#dp_"+i).val()))) {
            return;
            }
        }        
    } else {
        itemNr = lijn;
    }

    var poutput = [];// voorbereiding
    var targetToPush = '';
    if (lijn==0) var targetToPush = '<div class="card" id="liSearchCrit_'+itemNr+'">';
    
    targetToPush += '<div class="row">';
    targetToPush += '<div class="col-sm">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option value="AND">AND</option>';
    targetToPush += '<option value="OR">OR</option>';
    targetToPush += '<option value="NOT">NOT</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_'+itemNr+'">';
    targetToPush += '<select onchange="criterialijst_change_'+itemNr+'();composeQuery()">';
    targetToPush += '<option selected value="datum">datum</option>';
    targetToPush += '<option value="rol">rol</option>';
    targetToPush += '<option value="naam">naam</option>';
    targetToPush += '<option value="voornamen">voornaam</option>';
    targetToPush += '<option value="authoritylijst">authoritylijst</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option selected value="vanaf">vanaf</option>';
    targetToPush += '<option value="totmet">tot en met</option>';
    targetToPush += '<option value="exact">is exact</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<div>';
    targetToPush += '<input type="text" id="dp_'+itemNr+'">';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    if (lijn==0) targetToPush += '</div>';

    poutput.push(targetToPush);
    if (lijn==0) {
        $('#alSearchCriterium').append( poutput.join(''));
    }
    else {
        $('#liSearchCrit_'+lijn).html('');
        $('#liSearchCrit_'+lijn).html( poutput.join(''));
    } 
        
    tijd = $( "#dp_"+itemNr ).datepicker({
        defaultDate: "+1w",
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showOtherMonths: true,
        selectOtherMonths: true
    }).on( "change", function() {
        li_datum( this.value,$( "#operatorlijst_"+itemNr+" option:selected" ).text());
    });
    if (lijn==0) searchItemNr++;

}    

function createSearchBlock(lijn,crit) {


    if (lijn == 0) {
        itemNr = searchItemNr;
        for (var i=1;i<itemNr;i++)
        {
            if ((!$.trim($("#al_filter_"+i).val())) && (!$.trim($("#dp_"+i).val()))) {
            return;
            }
        }        
    } else {
        itemNr = lijn;
    }

    var poutput = [];// voorbereiding
    var targetToPush = '';
   if (lijn==0) var targetToPush = '<div class="card" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row">';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option value="AND">AND</option>';
    targetToPush += '<option value="OR">OR</option>';
    targetToPush += '<option value="NOT">NOT</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_'+itemNr+'">';
    targetToPush += '<select onchange="criterialijst_change_'+itemNr+'();composeQuery()">';
    targetToPush += '<option selected value="rol">rol</option>';
    targetToPush += '<option value="naam">naam</option>';
    targetToPush += '<option value="voornamen">voornaam</option>';
    targetToPush += '<option value="datum">datum</option>';
    targetToPush += '<option value="authoritylijst">authoritylijst</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option selected value="bevat">bevat</option>';
    targetToPush += '<option value="bevat_exact">bevat exact</option>';
    targetToPush += '<option value="begint">begint met</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<input type="text" id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'" onkeyup="composeQuery()"; value="Some text...">';
    //targetToPush += '<textarea onkeyup="composeQuery()"; id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'"cols="20" rows="1"  ></textarea>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    if (lijn==0) targetToPush += '</div>';

    poutput.push(targetToPush);

    if (lijn==0) {
        $('#alSearchCriterium').append( poutput.join(''));
    }
    else {
        $('#liSearchCrit_'+lijn).html('');
        $('#liSearchCrit_'+lijn).html( poutput.join(''));
        $('#criterialijst_'+itemNr+' select').val(crit);    
    } 
    if (lijn==0) searchItemNr++;

}    

function composeQuery() {

    var poutput = [];
    advSQLFieldsArray = [];
    var targetToPush = '<p>';
    var targetToPush = '> Feittype: ';
    for (var i=0;i<selFeit.length;i++)
    {
        if (i>0) targetToPush += ' OR ';
        targetToPush += selFeit[i];
    }
    targetToPush += '</br>';
    targetToPush += '> Subtype: ';
    for (var i=0;i<selSubtype.length;i++)
    {
        if (i>0) targetToPush += ' OR ';
        targetToPush += selSubtype[i];
    }
    targetToPush += '</br>';

    for (var i =1;i<searchItemNr;i++) {
        
        if ($( "#criterialijst_"+i+" option:selected" ).text() == 'datum') {
            if ($( "#operatorlijst_"+i+" option:selected" ).text() == 'vanaf') {
                li_val = $("#dp_"+i).datepicker().val();
            } else if ($( "#operatorlijst_"+i+" option:selected" ).text() == 'totmet') {
                li_val = $("#dp_"+i).datepicker().val();
            } else {
                li_val = $("#dp_"+i).datepicker().val();
            }
            if (li_val != 0) {
                li_val_fin = li_val.replace(/-/g, '')+'5';     
            } else {
                li_val_fin = 0;
            }
        } else {
            li_val = li_val_fin = $( "#al_filter_"+i).val();
        }        

//        if (i>1) {
            targetToPush +=  '> ' + $( "#andOrNotlijst_"+i+" option:selected" ).val();
            advSQLFieldsArray[i-1] = { 'poort':$( "#andOrNotlijst_"+i+" option:selected" ).val(), 
                                        'term':$( "#criterialijst_"+i+" option:selected" ).val(),
                                        'operator':$( "#operatorlijst_"+i+" option:selected" ).val(),
                                        'filter':li_val_fin
                                    }; 
  /*      } else {
            targetToPush += ' > AND';
            advSQLFieldsArray[i-1] = { 'poort':'AND', 
                                        'term':$( "#criterialijst_"+i+" option:selected" ).val(),
                                        'operator':$( "#operatorlijst_"+i+" option:selected" ).val(),
                                        'filter':li_val_fin
                                    }; 
        }
*/        
        targetToPush += '</br>';
        targetToPush += '> ' + $( "#criterialijst_"+i+" option:selected" ).val();
        targetToPush += ' ' + $( "#operatorlijst_"+i+" option:selected" ).val();
        targetToPush += ' ' + li_val + '</br>';        
        
    }
    targetToPush += '</p>';
    poutput.push(targetToPush);
    $('#alQuery').empty();
    $('#alQuery').append( poutput.join(''));
}

function resetQuery() {

    selFeit.splice(0,selFeit.length);
    selSubtype.splice(0,selSubtype.length);
    window.open('./feit','_self');
        
}

function alResultTable(result){
    
    var poutput_bar= [];
    var poutput_list = [];
    var targetToPush = '';
    var targetToPush_list = '';
    var pagelength =20;
    var j = 0;
    var nrOfPages = 0;
    var maxNavBarNrs = 4;
    
    if (( nrOfPages = result.length%pagelength ) != 0){
        nrOfPages = parseInt(result.length/pagelength)+1;
    } else {
        nrOfPages = result.length/pagelength;
    }
    
    for (var i = 0;i< result.length;i++){
        if (i==0) {
            
            targetToPush = '<div id=al_navbar_'+(i+1)+'>';
            targetToPush += '<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">';
            targetToPush += '<div class="col-lg-1">';
            targetToPush += '<a class="navbar-brand" href="#">Pag. '+(i+1)+'</a>';
            targetToPush += '</div>';
            targetToPush += '<div class ="col-lg-5">';
            targetToPush += '<span class="navbar-text">';
            targetToPush += result.length + ' resultaten';
            targetToPush += '</span>';
            targetToPush += '</div>';
            targetToPush += '<div class ="col-lg-auto">';
            targetToPush += '<span class="navbar-text">'
            targetToPush += 'Pag. '+(i+1)+'/'+nrOfPages+'&nbsp';
            targetToPush += '</span>';
            targetToPush += '</div>';
            targetToPush += '<div class="col-lg-auto">';
            targetToPush += '<form class="form-inline">';
            targetToPush += '<input class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search">';
            targetToPush += '</form>';
            targetToPush += '</div>';
            targetToPush += '<div class="col-lg-auto">';
            targetToPush += '<nav aria-label="Page navigation example" style="padding-top: 15px; padding-bottom: 5px">';
            targetToPush += '<ul class="pagination"><li class="page-item"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';
            
            for (var k = 1;k < maxNavBarNrs+1;k++) {
                targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+k+','+nrOfPages+');">'+k+'</a></li>';
            }
            if (k<nrOfPages+1) targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+k+','+nrOfPages+');" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li></ul>';
            
            targetToPush += '</nav></div></nav></div>';
            poutput_bar.push(targetToPush);
            targetToPush_list = '<div id=al_resultlist_'+(i+1)+'>';
        } else if ( j = (i%pagelength) == 0) {

var pagina = ((i/pagelength)+1);

    targetToPush_list += '</div>';
    poutput_list.push(targetToPush_list);
//    $('#al_resultList').empty();
//    $('#al_resultList').append( poutput.join(''));       
            
            targetToPush += '</div>';
            targetToPush = '<div id=al_navbar_'+((i/pagelength)+1)+' style="display: none;">';
            targetToPush += '<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">';
            targetToPush += '<div class="col-lg-1">';
            targetToPush += '<a class="navbar-brand" href="#">Pag. '+((i/pagelength)+1)+'</a>';
            targetToPush += '</div>';
            targetToPush += '<div class ="col-lg-5">';
            targetToPush += '<span class="navbar-text">';
            targetToPush += result.length + ' resultaten';
            targetToPush += '</span>';
            targetToPush += '</div>';
            targetToPush += '<div class ="col-lg-auto">';
            targetToPush += '<span class="navbar-text">'
            targetToPush += 'Pag. '+pagina+'/'+nrOfPages+'&nbsp';
            targetToPush += '</span>';
            targetToPush += '</div>';
            targetToPush += '<div class="col-lg-auto">';
            targetToPush += '<form class="form-inline">';
            targetToPush += '<input class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search">';
            targetToPush += '</form>';
            targetToPush += '</div>';
            targetToPush += '<div class="col-lg-auto">';
            targetToPush += '<nav aria-label="Page navigation example" style="padding-top: 15px; padding-bottom: 5px">';
            
            var startnavPage = nrOfPages - pagina - maxNavBarNrs;
            
            if (startnavPage >=0) {
                startnavPage = pagina;
            } else {
                startnavPage = pagina + startnavPage + 1;
            }
            var k = startnavPage;            
            var startIndex = 0;
            if (startnavPage > maxNavBarNrs) {
                startIndex = startnavPage - 4;
            } else {
                startIndex = 1;
            }
        
            if (k>1) targetToPush += '<ul class="pagination"><li class="page-item"><a class="page-link" href="javascript:jumpToPage('+startIndex+','+nrOfPages+');" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';
            
            for (k;k < maxNavBarNrs+startnavPage;k++) {
                    targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+k+','+nrOfPages+');">'+k+'</a></li>';
            }
            
            if (k<nrOfPages+1) targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+k+','+nrOfPages+');" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li></ul>';
            
            targetToPush += '</nav></div></nav></div>';
            poutput_bar.push(targetToPush);
            targetToPush_list = '<div id=al_resultlist_'+((i/pagelength)+1)+' style="display: none;">';
        }
        targetToPush_list +=  '<a href="/limburgers/feit/'+result[i].feit_id+'" class="list-group-item list-group-item-action flex-column align-items-start" data-toggle="list">';
        targetToPush_list += '<div class="d-flex w-100 justify-content-between">';
        targetToPush_list += '<h5 class="mb-1">Type: '+result[i].feittype+'</h5>';
        targetToPush_list += '<small>'+(i+1)+'</small></div>';
        
        targetToPush_list += '<p class="mb-1">Naam: '+result[i].naam+'</p>';
        targetToPush_list += '<p class="mb-1">Voornaam: '+result[i].voornamen+'</p>';
        targetToPush_list += '<p class="mb-1">Rol: '+result[i].rol+'</p>';
        targetToPush_list += '<small>(Digitale versie beschikbaar)</small>';
        targetToPush_list += '</a>';
    }
    targetToPush_list += '</div>';
    poutput_list.push(targetToPush_list);
    $('#al_resultList').empty();
    $('#al_resultList').append(poutput_list.join(''));
    $('#li_navbar').empty();
    $('#li_navbar').append( poutput_bar.join(''));        
    poutput_bar = [];
    poutput_list = [];
}

function alFeitenTable(result){
    
    var poutput = [];
    var targetToPush = '';
    
    for (var i = 0;i< result.length;i++){
        targetToPush +=  '<li><a href="#" class="small" data-value="'+result[i].feittype+'" tabIndex="-1"><input type="checkbox" />'+result[i].feittype+'</a></li>';              
    }
    poutput.push(targetToPush);
    $('#feitenbox').empty();
    $('#feitenbox').append( poutput.join(''));
}
function alSubtypesTable(result){
    
    var poutput = [];
    var targetToPush = '';
    
    for (var i = 0;i< result.length;i++){
        targetToPush +=  '<li><a href="#" class="small" data-value="'+result[i].trefwoord+'" tabIndex="-1"><input type="checkbox" />'+result[i].trefwoord+'</a></li>';              
    }
    poutput.push(targetToPush);
    $('#subtypesbox').empty();
    $('#subtypesbox').append( poutput.join(''));
    $('#al_resultList').empty();
    $('#alQuery').empty();
    $('#alSearchCriterium').empty();    
    
}

function  li_datum (tijd,crit)  {
    if (crit == 'vanaf') {
        vanafdatum = tijd;
    } else if (crit == 'totmet') {
        totdatum = tijd;
    } else {
        exactdatum = tijd;
    }
    composeQuery();
}

function jumpToPage(pg,nrOfPages) {
    
    for (var j = 1; j < nrOfPages+1;j++) {
        if (j == pg) {
            $('#al_navbar_'+j).show();
            $('#al_resultlist_'+j).show();
        } else {
            $('#al_navbar_'+j).hide();
            $('#al_resultlist_'+j).hide();
        }
    }
    
}