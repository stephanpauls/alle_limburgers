
selFeit = [];
selSubtype = [];
firstOpenFeit = false;
firstOpenSubtype = false;
searchItemNr = 1;
searchArr = new Array();
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
    $('#liCreateQuery').hide();
    
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
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option value="AND">'+transtab['and']+'</option>';
    targetToPush += '<option value="OR">'+transtab['or']+'</option>';
    targetToPush += '<option value="NOT">'+transtab['not']+'</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';          
    targetToPush += '</div>';          
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_'+itemNr+'">';
    targetToPush += '<select onchange="criterialijst_change('+itemNr+');">';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '<option selected value="omschrijving">'+transtab['source']+'</option>';
    targetToPush += '<option value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option  value="oobjtype">'+transtab['objecttype']+'</option>';
    targetToPush += '<option  value="plaats">'+transtab['place']+'</option>';
    targetToPush += '<option value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option  value="soort">'+transtab['type']+'</option>';
    targetToPush += '<option  value="tekst">'+transtab['text']+'</option>';
    targetToPush += '<option  value="toponiem">'+transtab['toponym']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option selected value="bevat">'+transtab['contains']+'</option>';
    targetToPush += '<option value="bevat_exact">'+transtab['contains_exact']+'</option>';
    targetToPush += '<option value="begint">'+transtab['starts_with']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<input type="text" id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'" onkeyup="composeQuery('+itemNr+');" placeholder="'+transtab['fill_out']+'">';
    targetToPush += '</div>';
    

    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['bracket']+'" onclick="addNewCondition('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/brackets.png" alt=""></a>';
    targetToPush += '</div>';
    
    
    targetToPush += '</div>';
    if (lijn==0) targetToPush += '</div>';

//    poutput.push(targetToPush);
    searchArr[itemNr] = {'html':targetToPush,
                         'poort':$( "#andOrNotlijst_"+itemNr+" option:selected" ).val(), 
                         'term':$( "#criterialijst_"+itemNr+" option:selected" ).val(),
                         'operator':$( "#operatorlijst_"+itemNr+" option:selected" ).val(),
                         'filter':$( "#al_filter_"+itemNr).val(),
                         'orgindex':itemNr
                     };
    
    $('#alSearchCriterium').html('');
    for (ind=1;ind<itemNr;ind++)
    {
        poutput.push(searchArr[ind]['html']);
    }
    //LAATSTE LIJN IS AL INGEVULD
    poutput.push(searchArr[ind]['html']);
    $('#alSearchCriterium').append( poutput.join(''));

    for (ind=1;ind<itemNr;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value="+searchArr[ind]['operator']+"]").attr('selected', 'selected');
            $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
        }
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
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
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
    targetToPush += '<select onchange="criterialijst_change_('+itemNr+');">';
    targetToPush += '<option  value="omschrijving">'+transtab['source']+'</option>';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '<option selected value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option  value="oobjtype">'+transtab['objecttype']+'</option>';
    targetToPush += '<option  value="plaats">'+transtab['place']+'</option>';
    targetToPush += '<option value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option  value="soort">'+transtab['type']+'</option>';
    targetToPush += '<option  value="tekst">'+transtab['text']+'</option>';
    targetToPush += '<option  value="toponiem">'+transtab['toponym']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';    
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_1">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option selected value="vanaf">'+transtab['from']+'</option>';
    targetToPush += '<option value="totmet">'+transtab['until_with']+'</option>';
    targetToPush += '<option value="exact">'+transtab['is_exactly']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<div>';
    targetToPush += '<input type="text" id="dp_1" onkeyup="checkDate(1);" placeholder="'+transtab['fill_out']+'">';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    searchArr[itemNr] = {'html':targetToPush};
    $('#alSearchCriterium').html('');

    for (ind=1;ind<itemNr+1;ind++)
    {
      poutput.push(searchArr[ind]['html']);
    }
    $('#alSearchCriterium').append( poutput.join(''));
    

}


function addDatumSearchBlock(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    $('#liCreateQuery').hide();
        
    var itemNr = searchItemNr;
    if (arrIndex == 0) {
        arrIndex = itemNr;
    } else {
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == arrIndex ) {
                    arrIndex = ind;
                    break;
                }
            } 
        }  
    } 
    var poutput = [];// voorbereiding
    var targetToPush = '';
    var targetToPush = '<div class="card" id="liSearchCrit_'+itemNr+'" style="background-color:#eaecef;">';
    
    targetToPush += '<div class="row li_align_center">';
    targetToPush += '<div class="col-sm">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option value="AND">'+transtab['and']+'</option>';
    targetToPush += '<option value="OR">'+transtab['or']+'</option>';
    targetToPush += '<option value="NOT">'+transtab['not']+'</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_'+itemNr+'">';
    targetToPush += '<select onchange="criterialijst_change('+itemNr+');">';
    targetToPush += '<option  value="omschrijving">'+transtab['source']+'</option>';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '<option selected value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option  value="oobjtype">'+transtab['objecttype']+'</option>';
    targetToPush += '<option  value="plaats">'+transtab['place']+'</option>';
    targetToPush += '<option value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option  value="soort">'+transtab['type']+'</option>';
    targetToPush += '<option  value="tekst">'+transtab['text']+'</option>';
    targetToPush += '<option  value="toponiem">'+transtab['toponym']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';    
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option selected value="vanaf">'+transtab['from']+'</option>';
    targetToPush += '<option value="totmet">'+transtab['until_with']+'</option>';
    targetToPush += '<option value="exact">'+transtab['is_exactly']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<div>';
    targetToPush += '<input type="text" class="li_input" id="dp_'+itemNr+'" onkeyup="checkDate('+itemNr+');" placeholder="'+transtab['fill_out_date']+'">';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['bracket']+'" onclick="addBracketsBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/brackets.png" alt=""></a>';
    targetToPush += '</div>';    
    targetToPush += '</div>';
    targetToPush += '</div>';

    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':'-'};
       
    if (searchArr.length ==  0) searchArr[itemNr] = item;
    else searchArr.splice(arrIndex+1,0,item);
    
    $('#alSearchCriterium').html('');
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            poutput.push(searchArr[ind]['html']);
        }
    }
    $('#alSearchCriterium').append( poutput.join(''));
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value="+searchArr[ind]['operator']+"]").attr('selected', 'selected');
            if (searchArr[ind]['date']) {
                $("#dp_"+orgindex ).val(searchArr[ind]['date']);
            } else if (searchArr[ind]['term'] == 'rol') {
                $("#rollijst_"+orgindex+" option[value="+searchArr[ind]['filter']+"]").attr('selected', 'selected');
             } else {
                $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
            }
        }
    } 
    searchItemNr++;
}    

function addSearchBlock(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    $('#liCreateQuery').hide();
        
    var itemNr = searchItemNr;
    if (arrIndex == 0) {
        arrIndex = itemNr;
    } else {
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == arrIndex ) {
                    arrIndex = ind;
                    break;
                }
            } 
        }  
    }    
    
    var poutput = [];// voorbereiding
    var targetToPush = '<div class="card" style="background-color:#eaecef;" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row li_align_center" >';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option value="AND">'+transtab['and']+'</option>';
    targetToPush += '<option value="OR">'+transtab['or']+'</option>';
    targetToPush += '<option value="NOT">'+transtab['not']+'</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_'+itemNr+'">';
    targetToPush += '<select onchange="criterialijst_change('+itemNr+');">';
    targetToPush += '<option  value="omschrijving">'+transtab['source']+'</option>';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '<option  value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option  value="oobjtype">'+transtab['objecttype']+'</option>';
    targetToPush += '<option  value="plaats">'+transtab['place']+'</option>';
    targetToPush += '<option  value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option  value="soort">'+transtab['type']+'</option>';
    targetToPush += '<option  value="tekst">'+transtab['text']+'</option>';
    targetToPush += '<option  value="toponiem">'+transtab['toponym']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';    
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option selected value="bevat">'+transtab['contains']+'</option>';
    targetToPush += '<option value="bevat_exact">'+transtab['contains_exact']+'</option>';
    targetToPush += '<option value="begint">'+transtab['starts_with']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<input class="li_input" type="text" id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'" onkeyup="composeQuery('+itemNr+');" placeholder="'+transtab['fill_out']+'">';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['bracket']+'" onclick="addBracketsBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/brackets.png" alt=""></a>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';

    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':'-'};
       
    if (searchArr.length ==  0) searchArr[itemNr] = item;
    else searchArr.splice(arrIndex+1,0,item);
    
    $('#alSearchCriterium').html('');
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            poutput.push(searchArr[ind]['html']);
        }
    }
    $('#alSearchCriterium').append( poutput.join(''));

    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value="+searchArr[ind]['operator']+"]").attr('selected', 'selected');
            if (searchArr[ind]['date']) {
                $("#dp_"+orgindex ).val(searchArr[ind]['date']);
             } else if (searchArr[ind]['term'] == 'rol') {
                $("#rollijst_"+orgindex+" option[value="+searchArr[ind]['filter']+"]").attr('selected', 'selected');
            } else {
                $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
            }
        }
    } 
    searchItemNr++;
}    

function addRoleSearchBlock(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    $('#liCreateQuery').hide();
        
    var itemNr = searchItemNr;
    if (arrIndex == 0) {
        arrIndex = itemNr;
    } else {
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == arrIndex ) {
                    arrIndex = ind;
                    break;
                }
            } 
        }  
    }    
    
    var poutput = [];// voorbereiding
    var targetToPush = '<div class="card" style="background-color:#eaecef;" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row li_align_center" >';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option value="AND">'+transtab['and']+'</option>';
    targetToPush += '<option value="OR">'+transtab['or']+'</option>';
    targetToPush += '<option value="NOT">'+transtab['not']+'</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_'+itemNr+'">';
    targetToPush += '<select onchange="criterialijst_change('+itemNr+');">';
    targetToPush += '<option value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '<option  value="omschrijving">'+transtab['source']+'</option>';
    targetToPush += '<option  value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option  value="oobjtype">'+transtab['objecttype']+'</option>';
    targetToPush += '<option  value="plaats">'+transtab['place']+'</option>';
    targetToPush += '<option selected value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option  value="soort">'+transtab['type']+'</option>';
    targetToPush += '<option  value="tekst">'+transtab['text']+'</option>';
    targetToPush += '<option  value="toponiem">'+transtab['toponym']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';  
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option value="bevat_exact">'+transtab['contains_exact']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="rollijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')" class="li_input">';
    for (var i=0;i<rollen.length;i++){
        if (i==0) targetToPush += '<option selected value='+rollen[i]+'>'+rollen[i]+'</option>';
        else targetToPush += '<option value='+rollen[i]+'>'+rollen[i]+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['bracket']+'" onclick="addBracketsBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/brackets.png" alt=""></a>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';

    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':'-'};
       
    if (searchArr.length ==  0) searchArr[itemNr] = item;
    else searchArr.splice(arrIndex+1,0,item);
    
    $('#alSearchCriterium').html('');
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            poutput.push(searchArr[ind]['html']);
        }
    }
    $('#alSearchCriterium').append( poutput.join(''));

    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value="+searchArr[ind]['operator']+"]").attr('selected', 'selected');
            if (searchArr[ind]['date']) {
                $("#dp_"+orgindex ).val(searchArr[ind]['date']);
            } else if (searchArr[ind]['term'] == 'rol') {
                $("#rollijst_"+orgindex+" option[value="+searchArr[ind]['filter']+"]").attr('selected', 'selected');
            } else {
                $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
            }
        }
    } 
    searchItemNr++;
}    


function addAuthSearchBlock(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    $('#liCreateQuery').hide();
        
    var itemNr = searchItemNr;
    if (arrIndex == 0) {
        arrIndex = itemNr;
    } else {
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == arrIndex ) {
                    arrIndex = ind;
                    break;
                }
            } 
        }  
    }    
    
    var poutput = [];// voorbereiding
    var targetToPush = '<div class="card" style="background-color:#eaecef;" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row li_align_center" >';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option value="AND">'+transtab['and']+'</option>';
    targetToPush += '<option value="OR">'+transtab['or']+'</option>';
    targetToPush += '<option value="NOT">'+transtab['not']+'</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_'+itemNr+'">';
    targetToPush += '<select onchange="criterialijst_change('+itemNr+');">';
    targetToPush += '<option selected value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '<option  value="omschrijving">'+transtab['source']+'</option>';
    targetToPush += '<option  value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option  value="oobjtype">'+transtab['objecttype']+'</option>';
    targetToPush += '<option  value="plaats">'+transtab['place']+'</option>';
    targetToPush += '<option  value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option  value="soort">'+transtab['type']+'</option>';
    targetToPush += '<option  value="tekst">'+transtab['text']+'</option>';
    targetToPush += '<option  value="toponiem">'+transtab['toponym']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';  
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option selected value="bevat">'+transtab['contains']+'</option>';
    targetToPush += '<option value="bevat_exact">'+transtab['contains_exact']+'</option>';
    targetToPush += '<option value="begint">'+transtab['starts_with']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="authoritylijst_'+itemNr+'">';
    targetToPush += '<select class="li_input_auth" onchange="authoritylist_change('+itemNr+')">';
    for (var i=0;i<authorities.length;i++){
        targetToPush += '<option value='+authorities[i]+'>'+authorities[i]+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<input class="li_input_auth" type="text" id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'" onkeyup="composeQuery('+itemNr+');" placeholder="'+transtab['fill_out']+'">';
    targetToPush += '</div>';
    
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['bracket']+'" onclick="addBracketsBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/brackets.png" alt=""></a>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';

    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':'-'};
       
    if (searchArr.length ==  0) searchArr[itemNr] = item;
    else searchArr.splice(arrIndex+1,0,item);
    
    $('#alSearchCriterium').html('');
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            poutput.push(searchArr[ind]['html']);
        }
    }
    $('#alSearchCriterium').append( poutput.join(''));

    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value="+searchArr[ind]['operator']+"]").attr('selected', 'selected');
            if (searchArr[ind]['date']) {
                $("#dp_"+orgindex ).val(searchArr[ind]['date']);
            } else if (searchArr[ind]['term'] == 'rol') {
                $("#rollijst_"+orgindex+" option[value="+searchArr[ind]['filter']+"]").attr('selected', 'selected');
            } else {
                $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
            }
        }
    } 
    searchItemNr++;
}    

function addDatumAuthSearchBlock(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    $('#liCreateQuery').hide();
        
    var itemNr = searchItemNr;
    if (arrIndex == 0) {
        arrIndex = itemNr;
    } else {
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == arrIndex ) {
                    arrIndex = ind;
                    break;
                }
            } 
        }  
    }    
    
    var poutput = [];// voorbereiding
    var targetToPush = '<div class="card" style="background-color:#eaecef;" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row li_align_center" >';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option value="AND">'+transtab['and']+'</option>';
    targetToPush += '<option value="OR">'+transtab['or']+'</option>';
    targetToPush += '<option value="NOT">'+transtab['not']+'</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="criterialijst_'+itemNr+'">';
    targetToPush += '<select onchange="criterialijst_change('+itemNr+');">';
    targetToPush += '<option selected value="authority">'+transtab['authority_list']+'</option>';
    targetToPush += '<option  value="omschrijving">'+transtab['source']+'</option>';
    targetToPush += '<option  value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option  value="oobjtype">'+transtab['objecttype']+'</option>';
    targetToPush += '<option  value="plaats">'+transtab['place']+'</option>';
    targetToPush += '<option  value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option  value="soort">'+transtab['type']+'</option>';
    targetToPush += '<option  value="tekst">'+transtab['text']+'</option>';
    targetToPush += '<option  value="toponiem">'+transtab['toponym']+'</option>';
    targetToPush += '<option value="voornamen">'+transtab['first_name']+'</option>';      targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="operatorlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option selected value="vanaf">'+transtab['from']+'</option>';
    targetToPush += '<option value="totmet">'+transtab['until_with']+'</option>';
    targetToPush += '<option value="exact">'+transtab['is_exactly']+'</option>';    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="authoritylijst_'+itemNr+'">';
    targetToPush += '<select class="li_input_auth" onchange="authoritylist_change('+itemNr+')">';
    for (var i=0;i<authorities.length;i++){
        targetToPush += '<option value='+authorities[i]+'>'+authorities[i]+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<input type="text" class="li_input_auth" id="dp_'+itemNr+'" onkeyup="checkDate('+itemNr+');" placeholder="'+transtab['fill_out_date']+'">';
    targetToPush += '</div>';
    
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['bracket']+'" onclick="addBracketsBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/brackets.png" alt=""></a>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';

    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':'-'};
       
    if (searchArr.length ==  0) searchArr[itemNr] = item;
    else searchArr.splice(arrIndex+1,0,item);
    
    $('#alSearchCriterium').html('');
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            poutput.push(searchArr[ind]['html']);
        }
    }
    $('#alSearchCriterium').append( poutput.join(''));

    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value="+searchArr[ind]['operator']+"]").attr('selected', 'selected');
            if (searchArr[ind]['date']) {
                $("#dp_"+orgindex ).val(searchArr[ind]['date']);
            } else if (searchArr[ind]['term'] == 'rol') {
                $("#rollijst_"+orgindex+" option[value="+searchArr[ind]['filter']+"]").attr('selected', 'selected');
            } else {
                $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
            }
        }
    } 
    searchItemNr++;
}


function addBracketsBlock(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    $('#liCreateQuery').hide();
        
    var itemNr = searchItemNr;
    if (arrIndex == 0) {
        arrIndex = itemNr;
    } else {
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == arrIndex ) {
                    arrIndex = ind;
                    break;
                }
            } 
        }  
    }    
    
    var poutput = [];// voorbereiding
    var targetToPush = '<div class="card" style="background-color:#eaecef;" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row li_align_center" >';
    targetToPush += '<div class="col-sm col-md-offset-1">';    
    targetToPush += '<div id="andOrNotlijst_'+itemNr+'" style="margin-left:10px">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')">';
    targetToPush += '<option value="AND">'+transtab['and']+'</option>';
    targetToPush += '<option value="OR">'+transtab['or']+'</option>';
    targetToPush += '<option value="NOT">'+transtab['not']+'</option>';
    targetToPush += '</select>';  
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a><img class="br_img" src="'+transtab['url']+'/public/img/openbracket.png" alt=""></a>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '</div>';    
    targetToPush += '</div>';
    targetToPush += '</div>';
 
    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':'(',
                'term':'bracket'
                };
       
    if (searchArr.length ==  0) searchArr[itemNr] = item;
    else searchArr.splice(arrIndex+1,0,item);
    
    searchItemNr++;
    addSearchBlock(itemNr);
    
    itemNr=searchItemNr;
    poutput = [];// voorbereiding
    targetToPush = '<div class="card" style="background-color:#eaecef;" id="liSearchCrit_'+itemNr+'">';
    targetToPush += '<div class="row li_align_center" >';
    targetToPush += '<div class="col-sm col-md-offset-1">';     
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a><img class="br_img" src="'+transtab['url']+'/public/img/closebracket.png" alt=""></a>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '</div>';    
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a></a>';
    targetToPush += '</div>';    
    targetToPush += '</div>';
    targetToPush += '</div>';
 
    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':')',
                'term':'bracket'
                };
    
    searchArr.splice(arrIndex+3,0,item);
    
    $('#alSearchCriterium').html('');
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            poutput.push(searchArr[ind]['html']);
        }
    }
    $('#alSearchCriterium').append( poutput.join(''));

    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value="+searchArr[ind]['operator']+"]").attr('selected', 'selected');
            if (searchArr[ind]['date']) {
                $("#dp_"+orgindex ).val(searchArr[ind]['date']);
            } else if (searchArr[ind]['term'] == 'rol') {
                $("#rollijst_"+orgindex+" option[value="+searchArr[ind]['filter']+"]").attr('selected', 'selected');
            } else {
                $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
            }
        }
    }
    searchItemNr++;
    
} 

function checkDate(itemNr) {
    
    for (var ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            if (orgindex == itemNr ) {
                break;
            }
        } 
    }
    
    var dat = $('#dp_'+itemNr).val();
    if (dat.length < 4 ) { 
        $('#dp_'+itemNr).css("background-color","yellow");
        $('#liCreateQuery').hide();
        return;
    } else if (dat.length == 4){
        if (parseInt(dat) != 'NaN') {
            searchArr[ind]['date'] = dat+'-01-01';
            $('#dp_'+itemNr).css("background-color","white");
            composeQuery(itemNr);
        } else {
            $('#dp_'+itemNr).css("background-color","yellow");
            $('#dp_'+itemNr).val('');
            $('#liCreateQuery').hide();
        }
    } else if (dat.length == 7) {
        if (dat.indexOf('-') == 4) {
            var jaar = dat.substr(0,4);
            var maand = dat.substr(5,2);
            if (parseInt(maand) == 'NaN') {
                searchArr[ind]['date'] = jaar;
            } else {
                searchArr[ind]['date'] = dat+'-01';
            }
            $('#dp_'+itemNr).css("background-color","white");
            composeQuery(itemNr);
        }
    } else if (dat.length == 10) {
        var jaar = dat.substr(0,4);
        var maand = dat.substr(5,2);
        var dag = dat.substr(8,2);
        if (parseInt(dag) == 'NaN') {
           searchArr[ind]['date'] = jaar+'-'+maand;
        } else {
           searchArr[ind]['date'] = dat;
        }
        $('#dp_'+itemNr).css("background-color","white");
        composeQuery(itemNr);
    } else {
        $('#dp_'+itemNr).css("background-color","yellow");
        searchArr[ind]['date'] ="";
        $('#liCreateQuery').hide();
    }
}

function updateSearchBlock(lijn,crit,andOrNot,auth) {
    
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            if (orgindex == lijn ) {
                searchArr[ind]['poort']= andOrNot;
                searchArr[ind]['term']= crit;
                if (auth!=null) searchArr[ind]['auth']= auth;
                /*
                $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
                $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
                if (auth!=null)$("#authoritylijst_"+orgindex+" option[value="+searchArr[ind]['auth']+"]").attr('selected', 'selected');
                */
                break;
            }
        } 
    }
}

function removeSearchBlock(itemNr){

    var poutput = [];
    $('#li_navbar').html('');
    $('#li_navbar_detail').hide('');
    $('#al_resultList').html('');
    $('#al_detailResultList').empty();    
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            if (orgindex == itemNr ) {
                itemNr = ind;
                break;
            }
        } 
    }     
    
    //check if it's a bracket
    if (searchArr[itemNr]['bracket'] == '(') {
        var diepte = 1;
        searchArr.splice(itemNr,1);
        while (itemNr < searchArr.length) {
           if (searchArr[ind]['bracket'] == '(') {
               diepte++;
           }
           if (searchArr[ind]['bracket'] == ')') {
               diepte--;
           }
           searchArr.splice(itemNr,1);
           if (diepte == 0) {
               break;
           }
        }
    } else {
        searchArr.splice(itemNr,1);
        if ((itemNr < searchArr.length) && (searchArr[itemNr]['bracket'] == ')') && (searchArr[itemNr-1]['bracket'] == '(')) {
            searchArr.splice(itemNr,1);
            searchArr.splice(itemNr-1,1);
        }
    }
    
    $('#alSearchCriterium').html('');
    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) poutput.push(searchArr[ind]['html']);
    }
    $('#alSearchCriterium').append( poutput.join(''));

    for (ind=1;ind<searchArr.length+1;ind++)
    {
        if (null != searchArr[ind]) {
            var orgindex = searchArr[ind]['orgindex'];
            $("#andOrNotlijst_"+orgindex+" option[value="+searchArr[ind]['poort']+"]").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value="+searchArr[ind]['term']+"]").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value="+searchArr[ind]['operator']+"]").attr('selected', 'selected');
            if (searchArr[ind]['auth'])$("#authoritylijst_"+orgindex+" option[value="+searchArr[ind]['auth']+"]").attr('selected', 'selected');            
            if (searchArr[ind]['date']) {
                $("#dp_"+orgindex ).val(searchArr[ind]['date']);
            } else {
                $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
            }
        }
    }    
    composeQuery(0);
}

function composeQuery(itemNr) {

    var tmpArr=[];
    var li_val = '0';
    var li_val_fin = '0';
    if (itemNr > 0){
        tmpArr = {
            'poort':$( "#andOrNotlijst_"+itemNr+" option:selected" ).val(),
            'term':$( "#criterialijst_"+itemNr+" option:selected" ).val(),
            'operator':$( "#operatorlijst_"+itemNr+" option:selected" ).val(),
            'auth':$("#authoritylijst_"+itemNr+" option:selected" ).text(),
            'filter':$( "#al_filter_"+itemNr).val(),
        };
        for (ind=1;ind<searchArr.length+1;ind++)
        {
            if (null != searchArr[ind]) {
                var orgindex = searchArr[ind]['orgindex'];
                if (orgindex == itemNr ) {
                    jQuery.extend(searchArr[ind],tmpArr);
                    break;
                }
            } 
        }    
    }


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
        } else if (searchItemNr < 3) {
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
    var advInd = 0;
    for (j=1;j<searchArr.length+1;j++) {
        
        if (null != searchArr[j]) {
            i = searchArr[j]['orgindex'];
            if (($("#criterialijst_"+i+" option:selected" ).val() == 'datum') ||
                (($("#criterialijst_"+i+" option:selected" ).val() == 'authority') &&  
                ($("#authoritylijst_"+i+" option:selected" ).val().includes('datum') == true))    
                )
            {
                if ($( "#dp_"+i).val().length >= 4){
                    li_val = searchArr[j]['date'];
                    li_val_fin = li_val.replace(/-/g, '')+'5';     
                } else {
                    li_val_fin = li_val ="";
                }
                if ((!li_val) || ((li_val) === (transtab['fill_out_date']))) {
                    $('#liCreateQuery').hide();
                }
            } else if ($( "#criterialijst_"+i+" option:selected" ).val() == 'rol') {
                li_val = li_val_fin = $( "#rollijst_"+i+" option:selected" ).val();
            } else if (searchArr[j]['bracket'] == '-') {
                li_val = li_val_fin = $( "#al_filter_"+i).val();
                if ((!li_val) || ((li_val) === (transtab['fill_out']))) {
                    $('#liCreateQuery').hide();
                }
            }        

            advSQLFieldsArray[advInd] = { 
                                            'poort':$( "#andOrNotlijst_"+i+" option:selected" ).val(), 
                                            'term':searchArr[j]['term'],
                                            'operator':$( "#operatorlijst_"+i+" option:selected" ).val(),
                                            'auth':$("#authoritylijst_"+i+" option:selected" ).text(),                                        
                                            'bracket':searchArr[j]['bracket'],
                                            'filter':li_val_fin
                                        }; 
        
            if ((searchArr[j]['bracket'] == '(') || (searchArr[j]['bracket'] == ')')) {
                targetToPush +=  '> ' + $( "#andOrNotlijst_"+i+" option:selected" ).text();
                targetToPush += ' ' + searchArr[j]['bracket'];
                targetToPush += '</br>';        
            } else { 
                targetToPush +=  '> ' + $( "#andOrNotlijst_"+i+" option:selected" ).text();
                targetToPush += ' ' + $( "#criterialijst_"+i+" option:selected" ).text();
                targetToPush += ' ' + $( "#operatorlijst_"+i+" option:selected" ).text();
                if (searchArr[j]['auth']) {
                    targetToPush += ' ' + $( "#authoritylijst_"+i+" option:selected" ).text();
                }
                targetToPush += ' ' + li_val + '</br>';        
            }
            advInd++;
        }
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
        targetToPush_list += '<h3 class="li_keyList">'+transtab['source']+'</h3><h4 class="li_valueList">'+result[i].omschrijving+'</h4>';
        targetToPush_list += '<h3 class="li_keyList">'+transtab['date']+'</h3><h4 class="li_valueList">'+result[i].datum.substr(0,8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");+'</h4>';
        targetToPush_list += '<h3 class="li_keyList">'+transtab['place']+'</h3><h4 class="li_valueList">'+result[i].plaats+'</h4>';
        targetToPush_list += '<h3 class="li_keyList">'+transtab['text']+'</h3><h4 class="li_valueList">'+result[i].tekst+'</h4>';
        targetToPush_list += '<h3 class="li_keyList">'+transtab['objecttype']+'</h3><h4 class="li_valueList">'+result[i].oobjtype+'</h4>';
        targetToPush_list += '<h3 class="li_keyList">'+transtab['type']+'</h3><h4 class="li_valueList">'+result[i].soort+'</h4>';
        targetToPush_list += '<h3 class="li_keyList">'+transtab['toponym']+'</h3><h4 class="li_valueList">'+result[i].toponiem+'</h4>';
        
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

    var result = resultaat[0].metadata;
    result = JSON.parse(result);
    $('#al_detailResultList').empty();
    var poutput = [];
    var targetToPush = '';
    
        targetToPush = '<div style="width: 200px;float:left;background-color: #f2f2f2">';
        targetToPush += '<p class="card-text">Scans</p>';  
        targetToPush += '<a href="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjHiL7Fn6TeAhVL3KQKHYwYBUQQjRx6BAgBEAU&url=https%3A%2F%2Fwww.voertuigkosten.be%2Fauto%2Fpk-cc-omrekenen%2F&psig=AOvVaw3tHTnxBiSgOBvJtQdzz6gS&ust=1540648093602313" target="_blank">image1</a>';
        targetToPush += '<a href="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi7qJfcn6TeAhVO2qQKHdk2A9sQjRx6BAgBEAU&url=https%3A%2F%2Fwww.autowereld.com%2Fmultimedia%2Ffotogalleries%2Fid%2F10519&psig=AOvVaw3tHTnxBiSgOBvJtQdzz6gS&ust=1540648093602313" target="_blank">image2</a>';
        targetToPush += '</div>';
        targetToPush += '<div style="width:50px;float:left;">&nbsp;</div>';
        targetToPush += '<div style="float:left;">';
        
            targetToPush += '<h2 class=class="mb-1">'+transtab['fact']+'</h2>';
            targetToPush += '<h3 class="li_keyList">'+transtab['source']+'</h3><h4 class="li_valueList">'+result.feit[0].bronklasse+'</h4>';
            targetToPush += '<h3 class="li_keyList">'+transtab['subtype']+'</h3><h4 class="li_valueList">'+result.feit[0].feitsubtype+'</h4>';
        targetToPush += '</div>'
        targetToPush += '</div>'
/*        
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
*/        
        poutput.push(targetToPush);
        $('#al_detailResultList').empty();
        $('#al_detailResultList').append(poutput.join(''));
        $('#al_resultList').hide();
        $('#li_navbar').hide();
        $('#li_navbar_detail').show();
        $('#al_detailResultList').show();
}

