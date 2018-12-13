
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

resultlijst = [];
currentIndex = 1;

function alResultFeiten(result){
    
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


function alResultSubtypes(result){
    
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


function createStartSearchBlock(lijn,crit,andOrNot) {
    
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
    targetToPush += '<div class="card" style="background-color:#eaecef;" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row li_align_center">';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
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
    targetToPush += '<option selected value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';
    targetToPush += '<option value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option selected value="bevat">'+transtab['contains']+'</option>';
    targetToPush += '<option value="bevat_exact">'+transtab['contains_exact']+'</option>';
    targetToPush += '<option value="begint">'+transtab['starts_with']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<input type="text" id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'" onkeyup="composeQuery();" placeholder="'+transtab['fill_out']+'">';
    targetToPush += '</div>';
    

    targetToPush += '<div class="col-sm">';
     targetToPush += '<div class="searchConditionActions width10" style="margin-top:5px;">';
 targetToPush += '<a id="DeleteCondition1" title="Delete Condition" style="text-decoration: none;" class="remove-red cursor-pointer" onclick="return submitByButtonAjax(this.id);" value="DeleteCondition1">';
 targetToPush += '<span class="uxf-icon uxf-minus-circle"></span>';
 targetToPush += '</a>';
 targetToPush += '<a id="addNewCondition1" title="Add New Condition" style="text-decoration: none;" class="add-green cursor-pointer" onclick="return submitByButtonAjax(this.id);" value="addNewCondition1">';
 targetToPush += '<span class="uxf-icon uxf-plus-circle"></span>';
 targetToPush += '</a>';
 targetToPush += '<a id="addNewConditionWithOperator1" title=" Add New Condition With Operator" style="text-decoration: none;" class="add-green cursor-pointer" onclick="return submitByButtonAjax(this.id);" value="addNewConditionWithOperator1">';
 targetToPush += '<span class="uxf-icon uxf-code"></span>';
 targetToPush += '</a>';
 targetToPush += '<noscript>';
 targetToPush += '<input type="hidden" name="noJS" value="true" />';
 targetToPush += '<input name="operation" value="addNewCondition1" class="add" type="submit"/>';
 targetToPush += '<input name="operation" value="addConditionsWithOperator1" class="addConditionOperator" type="submit"/>';
 targetToPush += '</noscript>';
 targetToPush += '</div>';
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
        $('#andOrNotlijst_'+itemNr+' select').val(andOrNot);                
    }
    if (lijn==0) {
        searchItemNr++;
    }
}

function createStartDatumSearchBlock(andOrNot) {
    
    var targetToPush = '';
            
    var poutput = [];// voorbereiding
    var targetToPush = '';
    targetToPush = '<div class="row li_align_center" style="background-color:#eaecef;">';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_1" style="margin-left:10px">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option value="AND">'+transtab['and']+'</option>';
    targetToPush += '<option value="OR">'+transtab['or']+'</option>';
    targetToPush += '<option value="NOT">'+transtab['not']+'</option>';
    targetToPush += '<option value="(">(</option>';
    targetToPush += '<option value=")">)</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';    
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_1">';
    targetToPush += '<select onchange="criterialijst_change_'+itemNr+'();"composeQuery()">';
    targetToPush += '<option selected value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';
    targetToPush += '<option value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_1">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option selected value="vanaf">'+transtab['from']+'</option>';
    targetToPush += '<option value="totmet">'+transtab['until_with']+'</option>';
    targetToPush += '<option value="exact">'+transtab['is_exactly']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<div>';
    targetToPush += '<input type="text" id="dp_1" placeholder="'+transtab['fill_out']+'">';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    poutput.push(targetToPush);

    $('#liSearchCrit_1').html('');
    $('#liSearchCrit_1').html( poutput.join(''));
    $('#andOrNotlijst_'+itemNr+' select').val(andOrNot);            
        
    tijd = $( "#dp_1" ).datepicker({
        defaultDate: "+1w",
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showOtherMonths: true,
        selectOtherMonths: true
    }).on( "change", function() {
        li_datum( this.value,$( "#operatorlijst_1 option:selected" ).val());
    });


}


function createDatumSearchBlock(lijn,andOrNot) {

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
    if (lijn==0) var targetToPush = '<div class="card" id="liSearchCrit_'+itemNr+'" style="background-color:#eaecef;">';
    
    targetToPush += '<div class="row li_align_center">';
    targetToPush += '<div class="col-sm">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
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
    targetToPush += '<option selected value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option selected value="vanaf">'+transtab['from']+'</option>';
    targetToPush += '<option value="totmet">'+transtab['until_with']+'</option>';
    targetToPush += '<option value="exact">'+transtab['is_exactly']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<div>';
    targetToPush += '<input type="text" id="dp_'+itemNr+'" placeholder="'+transtab['fill_out']+'">';
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
        $('#andOrNotlijst_'+itemNr+' select').val(andOrNot);            
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
        li_datum( this.value,$( "#operatorlijst_"+itemNr+" option:selected" ).val());
    });
    if (lijn==0) searchItemNr++;

}    

function createSearchBlock(lijn,crit,andOrNot) {


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
   if (lijn==0) var targetToPush = '<div class="card" style="background-color:#eaecef;" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row li_align_center" >';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
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
    targetToPush += '<option selected value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';
    targetToPush += '<option value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery()">';
    targetToPush += '<option selected value="bevat">'+transtab['contains']+'</option>';
    targetToPush += '<option value="bevat_exact">'+transtab['contains_exact']+'</option>';
    targetToPush += '<option value="begint">'+transtab['starts_with']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<input type="text" id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'" onkeyup="composeQuery();" placeholder="'+transtab['fill_out']+'">';
    targetToPush += '</div>';
    

    targetToPush += '<div class="col-sm">';
    targetToPush += '<a href="" title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="http://localhost/limburgers/public/img/remove.png" alt=""></a>';
    targetToPush += '<a href=""  title="'+transtab['add']+'" onclick="addSearchBlock('+itemNr+')";><img class="li_img" src="http://localhost/limburgers/public/img/add.png" alt=""></a>';
    targetToPush += '<a href=""  title="'+transtab['bracket']+'" onclick="addNewCondition('+itemNr+')";><img class="li_img" src="http://localhost/limburgers/public/img/brackets.png" alt=""></a>';
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
        $('#andOrNotlijst_'+itemNr+' select').val(andOrNot);    
        $('#criterialijst_'+itemNr+' select').val(crit);    
    } 
    if (lijn==0) searchItemNr++;

}    

function composeQuery() {

        $('#liCreateQuery').show();
        if (selFeit.length>0) {
            if (selSubtype.length == 0) {
                if (searchItemNr < 2) {
                    $('#liCreateQuery').hide();
                }
            } 
        } else {
            if (selSubtype.length > 0) {
                if (searchItemNr < 2) {
                    $('#liCreateQuery').hide();
                } 
            } else {
                return;
            }
        }
        for (var i=1;i<searchItemNr;i++)
        {
            if ((!$.trim($("#al_filter_"+i).val())) && (!$.trim($("#dp_"+i).val()))) {
                $('#liCreateQuery').hide();
            }
        }


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
        
        if ($( "#criterialijst_"+i+" option:selected" ).val() == 'datum') {
            if ($( "#operatorlijst_"+i+" option:selected" ).val() == 'vanaf') {
                li_val = $("#dp_"+i).datepicker().val();
            } else if ($( "#operatorlijst_"+i+" option:selected" ).val() == 'totmet') {
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
            targetToPush +=  '> ' + $( "#andOrNotlijst_"+i+" option:selected" ).text();
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
        targetToPush += '> ' + $( "#criterialijst_"+i+" option:selected" ).text();
        targetToPush += ' ' + $( "#operatorlijst_"+i+" option:selected" ).text();
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

function alResultTable(result,transtab){
    
    resultlijst = [];
    resultlijst = result;
    
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
    if (maxNavBarNrs > nrOfPages) maxNavBarNrs = nrOfPages;

    for (var i = 0;i< result.length;i++){
        if (i==0) {
            
            targetToPush = '<div id=al_navbar_'+(i+1)+'>';
            targetToPush += '<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #9fd7a3;">';
            targetToPush += '<div class="col-lg-1">';
            targetToPush += '<a class="navbar-text" href="#">Pag. '+(i+1)+'</a>';
            targetToPush += '</div>';
            targetToPush += '<div class ="col-lg-5">';
            targetToPush += '<span class="navbar-text">';
            targetToPush += result.length + ' '+transtab['results'];
            targetToPush += '</span>';
            targetToPush += '</div>';
            targetToPush += '<div class ="col-lg-auto">';
            targetToPush += '<span class="navbar-text">'
            targetToPush += 'Pag. '+(i+1)+'/'+nrOfPages+'&nbsp';
            targetToPush += '</span>';
            targetToPush += '</div>';
            targetToPush += '<div class="col-lg-auto">';
            targetToPush += '<nav aria-label="Page navigation example" style="padding-top: 15px; padding-bottom: 5px">';
            targetToPush += '<ul class="pagination">';
            if (nrOfPages > 4) targetToPush += '<li class="page-item"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';
            
            for (var k = 1;k < maxNavBarNrs+1;k++) {
                targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+k+','+nrOfPages+');">'+k+'</a></li>';
            }
            if (k<nrOfPages+1) targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+k+','+nrOfPages+');" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';
            targetToPush += '</ul>';
            targetToPush += '</nav></div></nav></div>';
            poutput_bar.push(targetToPush);
            targetToPush_list = '<div id=al_resultlist_'+(i+1)+' class="list-group">';
        } else if ( j = (i%pagelength) == 0) {

            var pagina = ((i/pagelength)+1);
            targetToPush_list += '</div>';
            poutput_list.push(targetToPush_list);
            
            targetToPush += '</div>';
            targetToPush = '<div id=al_navbar_'+((i/pagelength)+1)+' style="display: none;">';
            targetToPush += '<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #9fd7a3;">';
            targetToPush += '<div class="col-lg-1">';
            targetToPush += '<a class="navbar-text" href="#">Pag. '+((i/pagelength)+1)+'</a>';
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
            targetToPush += '<ul class="pagination">';        
            if (k>1) targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+startIndex+','+nrOfPages+');" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';
            
            for (k;k < maxNavBarNrs+startnavPage;k++) {
                    targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+k+','+nrOfPages+');">'+k+'</a></li>';
            }
            
            if (k<nrOfPages+1) targetToPush += '<li class="page-item"><a class="page-link" href="javascript:jumpToPage('+k+','+nrOfPages+');" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';
            targetToPush += '</ul>';
            targetToPush += '</nav></div></nav></div>';
            poutput_bar.push(targetToPush);
            targetToPush_list = '<div id=al_resultlist_'+((i/pagelength)+1)+' class="list-group" style="display: none;">';
        }
        targetToPush_list += '<a type="'+i+'" id="'+result[i].feit_id+'" href="'+result[i].pers_id+'" class="list-group-item list-group-item-action flex-column align-items-start" data-toggle="list">';
        targetToPush_list += '<div class="d-flex w-100 justify-content-between">';
        targetToPush_list += '<h5 class="mb-1">'+result[i].feittype+'</h5>';
        targetToPush_list += '<small>'+(i+1)+'</small></div>';
        
        targetToPush_list += '<h3 class="li_keyList">'+transtab['name']+'</h3><h4 class="li_valueList">'+result[i].naam+'</h4>';
        targetToPush_list += '<h3 class="li_keyList">'+transtab['first_name']+'</h3><h4 class="li_valueList">'+result[i].voornamen+'</h4>';
        targetToPush_list += '<h3 class="li_keyList">'+transtab['role']+'</h3><h4 class="li_valueList">'+result[i].rol+'</h4>';
        
        style="display: none;"
//        targetToPush_list += '<small>('+transtab['dig_available']+')</small>';
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

function alResultDetailTable(resultaat,transtab) {
    
    $('#al_detailResultList').empty();
    var poutput = [];
    var targetToPush = '';
    
        targetToPush = '<div style="width: 200px;float:left;background-color: #f2f2f2">';
        targetToPush += '<p class="card-text">Scans</p>';  
        targetToPush += '<a href="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjHiL7Fn6TeAhVL3KQKHYwYBUQQjRx6BAgBEAU&url=https%3A%2F%2Fwww.voertuigkosten.be%2Fauto%2Fpk-cc-omrekenen%2F&psig=AOvVaw3tHTnxBiSgOBvJtQdzz6gS&ust=1540648093602313" target="_blank">image1</a>';
        targetToPush += '<a href="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi7qJfcn6TeAhVO2qQKHdk2A9sQjRx6BAgBEAU&url=https%3A%2F%2Fwww.autowereld.com%2Fmultimedia%2Ffotogalleries%2Fid%2F10519&psig=AOvVaw3tHTnxBiSgOBvJtQdzz6gS&ust=1540648093602313" target="_blank">image2</a>';
        targetToPush += '</div>';
        targetToPush += '<div style="width:50px;float:left;">&nbsp;</div>';
        targetToPush += '<div style="width: 100px;float:left;">';
        targetToPush += '<p>'+transtab['name']+'</p>';
        targetToPush += '<p>'+transtab['first_name']+'</p>';
        targetToPush += '<p>'+transtab['municipality']+'</p>';
        targetToPush += '<p>'+transtab['place']+'</p>';
        targetToPush += '<p>'+transtab['description']+'</p>';
        targetToPush += '<p>'+transtab['fact']+'</p>';
        targetToPush += '<p>'+transtab['text']+'</p>';
        targetToPush += '<p>'+transtab['date']+'</p>';
        targetToPush += '<p>'+transtab['keyword']+'</p>';
        targetToPush += '<p>'+transtab['source_class']+'</p>';
        targetToPush += '<p>'+transtab['archive_law']+'</p>';
        targetToPush += '</div>';
        targetToPush += '<div>';
        for (var i = 0;i< resultaat.length;i++) {
            targetToPush += '<p><span class="li_span">'+resultaat[i].naam+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].voornamen+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].gemeente+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].plaats+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].omschrijving+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].feittype+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].tekst+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].datum+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].trefwoord+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].bronklasse+'</span></p>';
            targetToPush += '<p><span class="li_span">'+resultaat[i].archiefwet+'</span></p>';
            
        }
        targetToPush += '</div>';
        poutput.push(targetToPush);
        $('#al_detailResultList').empty();
        $('#al_detailResultList').append(poutput.join(''));
        $('#al_resultList').hide();
        $('#li_navbar').hide();
        $('#li_navbar_detail').show();
        $('#al_detailResultList').show();
}