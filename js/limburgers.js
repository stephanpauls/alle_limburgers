
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

persoonsoort = new Array();
persoonsoort[1] = 'persoon';
persoonsoort[2] = 'gemeentelijk';
persoonsoort[3] = 'provinciaal';
persoonsoort[4] = 'landelijk';
persoonsoort[5] = 'kerkelijk';

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
    fadeSearchButton();
    
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
    targetToPush += '<option selected value="categorie">'+transtab['source']+'</option>';
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
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
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
    targetToPush += '<option  value="categorie">'+transtab['source']+'</option>';
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
    fadeSearchButton();
        
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
    targetToPush += '<option  value="categorie">'+transtab['source']+'</option>';
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
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['bracket']+'" onclick="addBracketsBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/brackets.png" alt=""></a>';
    targetToPush += '</div>';    
    targetToPush += '</div>';
    targetToPush += '</div>';

    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':'-'};
       
    if (searchArr.length ==  0) searchArr[itemNr] = item;
    else searchArr.splice(arrIndex+1,0,item);
    
    fillOutSearchBlocks();
    searchItemNr++;
}    

function addSearchBlock(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    fadeSearchButton();
        
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
    targetToPush += '<option selected value="categorie">'+transtab['source']+'</option>';
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
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
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
    
    fillOutSearchBlocks();
    searchItemNr++;
}    



function addRoleSearchBlockFinal(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    fadeSearchButton();
        
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
    targetToPush += '<option  value="categorie">'+transtab['source']+'</option>';
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
        if (i==0) targetToPush += '<option selected value='+rollen[i]+'>'+decodeURI(rollen[i])+'</option>';
        else targetToPush += '<option value='+rollen[i]+'>'+decodeURI(rollen[i])+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
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
    
    fillOutSearchBlocks();
    searchItemNr++;
}    

function addSoortSearchBlockFinal(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    fadeSearchButton();
        
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
    targetToPush += '<option  value="categorie">'+transtab['source']+'</option>';
    targetToPush += '<option  value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option  value="oobjtype">'+transtab['objecttype']+'</option>';
    targetToPush += '<option  value="plaats">'+transtab['place']+'</option>';
    targetToPush += '<option  value="rol">'+transtab['role']+'</option>';
    targetToPush += '<option selected value="soort">'+transtab['type']+'</option>';
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
    targetToPush += '<div id="soortlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')" class="li_input">';
    for (var i=0;i<soorten.length;i++){
        if (i==0) targetToPush += '<option selected value='+soorten[i]+'>'+decodeURI(soorten[i])+'</option>';
        else targetToPush += '<option value='+soorten[i]+'>'+decodeURI(soorten[i])+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
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
    
    fillOutSearchBlocks();
    searchItemNr++;
}    
///START BLOCK!!!
function addBronSearchBlockFinal(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
        
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
    targetToPush += '<option  selected value="categorie">'+transtab['source']+'</option>';
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
    targetToPush += '<option value="bevat_exact">'+transtab['contains_exact']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="bronlijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')" class="li_input">';
    for (var i=0;i<bronnen.length;i++){
        if (i==0) targetToPush += '<option selected value='+bronnen[i]+'>'+decodeURI(bronnen[i])+'</option>';
        else targetToPush += '<option value='+bronnen[i]+'>'+decodeURI(bronnen[i])+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['bracket']+'" onclick="addBracketsBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/brackets.png" alt=""></a>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '</div>';

    var item = {'html':targetToPush,
                'orgindex':itemNr,
                'bracket':'-'};
    
    
    if (searchArr.length ==  0) {
        searchArr[itemNr] = item;
    }
    else searchArr.splice(arrIndex+1,0,item);
    
    fillOutSearchBlocks();
    searchItemNr++;
    composeQuery(0); //moet opgeroepen worden omdat anders de zoek button zou kunnen wegvallen
}    

function addOobjtypeSearchBlockFinal(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    fadeSearchButton();
        
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
    targetToPush += '<option  value="categorie">'+transtab['source']+'</option>';
    targetToPush += '<option  value="datum">'+transtab['date']+'</option>';
    targetToPush += '<option  value="naam">'+transtab['name']+'</option>';
    targetToPush += '<option selected value="oobjtype">'+transtab['objecttype']+'</option>';
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
    targetToPush += '<option value="bevat_exact">'+transtab['contains_exact']+'</option>';
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<div id="oobjtypelijst_'+itemNr+'">';
    targetToPush += '<select onchange="composeQuery('+itemNr+')" class="li_input">';
    for (var i=0;i<oobjtypes.length;i++){
        if (i==0) targetToPush += '<option selected value='+oobjtypes[i]+'>'+decodeURI(oobjtypes[i])+'</option>';
        else targetToPush += '<option value='+oobjtypes[i]+'>'+decodeURI(oobjtypes[i])+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
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
    
    fillOutSearchBlocks();
    searchItemNr++;
}    


function addAuthSearchBlockFinal(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    fadeSearchButton();
        
    var itemNr = searchItemNr;
    var auth;
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
    targetToPush += '<option  value="categorie">'+transtab['source']+'</option>';
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
        if (i==0) targetToPush += '<option selected value='+authorities[i]+'>'+decodeURI(authorities[i])+'</option>';
        else targetToPush += '<option value='+authorities[i]+'>'+decodeURI(authorities[i])+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<input class="li_input_auth" type="text" id="al_filter_'+itemNr+'" name="al_filter_'+itemNr+'" onkeyup="composeQuery('+itemNr+');" placeholder="'+transtab['fill_out']+'">';
    targetToPush += '</div>';
    
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
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
    
    fillOutSearchBlocks();
    searchItemNr++;
}    

function addDatumAuthSearchBlockFinal(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    fadeSearchButton();
        
    var itemNr = searchItemNr;
    var auth;
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
    targetToPush += '<option  value="categorie">'+transtab['source']+'</option>';
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
        //auth =authorities[i].replace(/ /g, "°");
        targetToPush += '<option value='+authorities[i]+'>'+decodeURI(authorities[i])+'</option>';
    }
    targetToPush += '</select>';
    targetToPush += '</div>';
    targetToPush += '</div>';
    targetToPush += '<div class="col-sm col-md-offset-0">';
    targetToPush += '<input type="text" class="li_input_auth" id="dp_'+itemNr+'" onkeyup="checkDate('+itemNr+');" placeholder="'+transtab['fill_out_date']+'">';
    targetToPush += '</div>';
    
    targetToPush += '<div class="col-sm">';
    targetToPush += '<a title="'+transtab['remove']+'" onclick="removeSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/remove.png" alt=""></a>';
    targetToPush += '<a title="'+transtab['add']+'" onclick="addBronSearchBlock('+itemNr+')";><img class="li_img" src="'+transtab['url']+'/public/img/add.png" alt=""></a>';
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
    
    fillOutSearchBlocks();
    searchItemNr++;
}


function addBracketsBlock(arrIndex) {

    $('#feitenbox').hide();
    $('#subtypesbox').hide();
    fadeSearchButton();
        
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
    addBronSearchBlock(itemNr);
    
    itemNr=searchItemNr;
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
    
   fillOutSearchBlocks();
    searchItemNr++;
    
} 


function fillOutSearchBlocks() {
    
    var poutput = [];// voorbereiding    
    
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
            $("#andOrNotlijst_"+orgindex+" option[value='"+searchArr[ind]['poort']+"']").attr('selected', 'selected');
            $("#criterialijst_"+orgindex+" option[value='"+searchArr[ind]['term']+"']").attr('selected', 'selected');
            $("#operatorlijst_"+orgindex+" option[value='"+searchArr[ind]['operator']+"']").attr('selected', 'selected');
            if (searchArr[ind]['auth']) {
                $("#authoritylijst_"+orgindex+" option[value='"+searchArr[ind]['auth']+"']").attr('selected', 'selected');      
            }
            if (searchArr[ind]['date']) {
                $("#dp_"+orgindex ).val(searchArr[ind]['date']);
            } else if (searchArr[ind]['term'] == 'rol') {
                $("#rollijst_"+orgindex+" option[value='"+searchArr[ind]['filter']+"']").attr('selected', 'selected');
            } else if (searchArr[ind]['term'] == 'soort') {
                $("#soortlijst_"+orgindex+" option[value='"+searchArr[ind]['filter']+"']").attr('selected', 'selected');
            } else if (searchArr[ind]['term'] == 'oobjtype') {
                $("#oobjtypelijst_"+orgindex+" option[value='"+searchArr[ind]['filter']+"']").attr('selected', 'selected');
            } else if (searchArr[ind]['term'] == 'categorie') {
                $("#bronlijst_"+orgindex+" option[value='"+searchArr[ind]['filter']+"']").attr('selected', 'selected');
            } else {
                $("#al_filter_"+orgindex ).val(searchArr[ind]['filter']);
            }
        }
    }
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
        fadeSearchButton();
        
        return;
    } else if (dat.length == 4){
        if (parseInt(dat) != 'NaN') {
            searchArr[ind]['date'] = dat+'-01-01';
            $('#dp_'+itemNr).css("background-color","white");
            composeQuery(itemNr);
        } else {
            $('#dp_'+itemNr).css("background-color","yellow");
            $('#dp_'+itemNr).val('');
            fadeSearchButton();
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
        fadeSearchButton();
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
    
    fillOutSearchBlocks();
    composeQuery(0);
}

function composeQuery(itemNr) {

    var tmpArr=[];
    var li_val = '0';
    var li_val_fin = '0';
    if (itemNr > 0){
        
         if ($( "#criterialijst_"+itemNr+" option:selected" ).val() == 'rol') {
                li_val = li_val_fin = $( "#rollijst_"+itemNr+" option:selected" ).val();
            } else if ($( "#criterialijst_"+itemNr+" option:selected" ).val() == 'categorie') {
                li_val = li_val_fin = $( "#bronlijst_"+itemNr+" option:selected" ).val();
            } else if ($( "#criterialijst_"+itemNr+" option:selected" ).val() == 'soort') {
                li_val = li_val_fin = $( "#soortlijst_"+itemNr+" option:selected" ).val();
            } else if ($( "#criterialijst_"+itemNr+" option:selected" ).val() == 'oobjtype') {
                li_val = li_val_fin = $( "#oobjtypelijst_"+itemNr+" option:selected" ).val(); 
            } else {
                 li_val = li_val_fin = $( "#al_filter_"+itemNr).val();
            }
        
        
        
        tmpArr = {
            'poort':$( "#andOrNotlijst_"+itemNr+" option:selected" ).val(),
            'term':$( "#criterialijst_"+itemNr+" option:selected" ).val(),
            'operator':$( "#operatorlijst_"+itemNr+" option:selected" ).val(),
            'auth':$("#authoritylijst_"+itemNr+" option:selected" ).text(),
            'filter':li_val,
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
    showSearchButton();

    for (j=1;j<searchArr.length+1;j++) {
        
        if (null != searchArr[j]) {
            i = searchArr[j]['orgindex'];
            if (($("#criterialijst_"+i+" option:selected" ).val() == 'datum') ||
                (($("#criterialijst_"+i+" option:selected" ).val() == 'authority') && ($("#authoritylijst_"+i+" option:selected" ).val().includes('datum') == true))    
                )
            {
                if ($( "#dp_"+i).val().length >= 4){
                    li_val = searchArr[j]['date'];
                    li_val_fin = li_val.replace(/-/g, '')+'5';     
                } else {
                    li_val_fin = li_val ="";
                }
                if ((!li_val) || ((li_val) === (transtab['fill_out_date']))) {
                    fadeSearchButton();
                }
            } else if ($( "#criterialijst_"+i+" option:selected" ).val() == 'rol') {
                li_val = li_val_fin = $( "#rollijst_"+i+" option:selected" ).val();
            } else if ($( "#criterialijst_"+i+" option:selected" ).val() == 'categorie') {
                li_val = li_val_fin = $( "#bronlijst_"+i+" option:selected" ).val();
            } else if ($( "#criterialijst_"+i+" option:selected" ).val() == 'soort') {
                li_val = li_val_fin = $( "#soortlijst_"+i+" option:selected" ).val();
            } else if ($( "#criterialijst_"+i+" option:selected" ).val() == 'oobjtype') {
                li_val = li_val_fin = $( "#oobjtypelijst_"+i+" option:selected" ).val();
            } else if (searchArr[j]['bracket'] == '-') {
                li_val = li_val_fin = $( "#al_filter_"+i).val();
                if ((!li_val) || ((li_val) === (transtab['fill_out']))) {
                    fadeSearchButton();
                }
            }        
            advSQLFieldsArray[advInd] = { 
                                            'poort':$( "#andOrNotlijst_"+i+" option:selected" ).val(), 
                                            'term':searchArr[j]['term'],
                                            'operator':$( "#operatorlijst_"+i+" option:selected" ).val(),
                                            'auth':$("#authoritylijst_"+i+" option:selected" ).val(),                                        
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


    if (selFeit.length>0) {
        if (selSubtype.length == 0) {
            if (advInd < 1) {
                fadeSearchButton();
            }
        } 
    } else {
        if (selSubtype.length > 0) {
            if (advInd < 1) {
                fadeSearchButton();
            } 
        } else if (advInd < 2) {
                fadeSearchButton();
        }
    } 
}

function fadeSearchButton() {
    $('#liCreateQuery').fadeTo("fast",0.4);
    $('#liCreateQuery').prop("disabled", true);
//    $("#liCreateQuery span").text(transtab['search']+' ('+transtab['two_choices']+')');
    $("#liCreateQuery span").text(transtab['search']);
    $( "#al_two_choices" ).show();
    
}
function showSearchButton() {
    $('#liCreateQuery').fadeTo("fast",1);
    $('#liCreateQuery').prop("disabled", false);
    $("#liCreateQuery span").text(transtab['search']);
    $( "#al_two_choices" ).hide();
    
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
            targetToPush += '<div class ="col-lg-3">';
            targetToPush += '<span class="navbar-text">';
            targetToPush += result.length + ' '+transtab['results'];
            targetToPush += '</span>';
            targetToPush += '</div>';
            targetToPush += '<div class ="col-lg-3">';
            targetToPush += '<span class="navbar-text">';
            targetToPush += '    '+transtab['details'];
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
            targetToPush += '<div class ="col-lg-3">';
            targetToPush += '<span class="navbar-text">';
            targetToPush += result.length + ' '+transtab['results'];
            targetToPush += '</span>';
            targetToPush += '</div>';
            targetToPush += '<div class ="col-lg-3">';
            targetToPush += '<span class="navbar-text">';
            targetToPush += '    '+transtab['details'];
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
        
        if (result[i].naam) targetToPush_list += '<h3 class="li_keyList">'+transtab['name']+'</h3><h4 class="li_valueList">'+result[i].naam+'</h4>';
        if (result[i].voornamen)targetToPush_list += '<h3 class="li_keyList">'+transtab['first_name']+'</h3><h4 class="li_valueList">'+result[i].voornamen+'</h4>';
        if (result[i].rol)targetToPush_list += '<h3 class="li_keyList">'+transtab['role']+'</h3><h4 class="li_valueList">'+result[i].rol+'</h4>';
        if (result[i].omschrijving)targetToPush_list += '<h3 class="li_keyList">'+transtab['source']+'</h3><h4 class="li_valueList">'+result[i].omschrijving+'</h4>';
        if (result[i].datum)targetToPush_list += '<h3 class="li_keyList">'+transtab['date']+'</h3><h4 class="li_valueList">'+result[i].datum.substr(0,8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");+'</h4>';
        if (result[i].plaats)targetToPush_list += '<h3 class="li_keyList">'+transtab['place']+'</h3><h4 class="li_valueList">'+result[i].plaats+'</h4>';
        if (result[i].tekst)targetToPush_list += '<h3 class="li_keyList">'+transtab['text']+'</h3><h4 class="li_valueList">'+result[i].tekst+'</h4>';
        if (result[i].oobjtype)targetToPush_list += '<h3 class="li_keyList">'+transtab['objecttype']+'</h3><h4 class="li_valueList">'+result[i].oobjtype+'</h4>';
        if (result[i].soort)targetToPush_list += '<h3 class="li_keyList">'+transtab['type']+'</h3><h4 class="li_valueList">'+result[i].soort+'</h4>';
        if (result[i].toponiem)targetToPush_list += '<h3 class="li_keyList">'+transtab['toponym']+'</h3><h4 class="li_valueList">'+result[i].toponiem+'</h4>';
        
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
    $('#al_resultList').show();
    $('#li_navbar').show();
    
    poutput_bar = [];
    poutput_list = [];
}

function alFeitenTable(feiten){
    
    var poutput = [];
    var targetToPush = '';
    
    for (var i = 0;i< feiten.length;i++){
        targetToPush +=  '<li><a href="#" class="small" data-value="'+feiten[i]+'" tabIndex="-1"><input type="checkbox" />'+feiten[i]+'</a></li>';              
    }
    poutput.push(targetToPush);
    $('#feitenbox').empty();
    $('#feitenbox').append( poutput.join(''));
}
function alSubtypesTable(subtypes){
    
    var poutput = [];
    var targetToPush = '';
    
    for (var i = 0;i< subtypes.length;i++){
        targetToPush +=  '<li><a href="#" class="small" data-value="'+subtypes[i]+'" tabIndex="-1"><input type="checkbox" />'+subtypes[i]+'</a></li>';              
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

    $('#al_detailResultList').empty();
    var poutput = [];
    var targetToPush = '';

    if (result.indexOf("scan oat") > -1){
        result = result.replace(/ /g,"_");
        result = JSON.parse(result);
        

        targetToPush += '<div class="col-md-8">';
        
        targetToPush += '<h2 class=class="mb-1"> </h2>';
        targetToPush += '<h2 class=class="mb-1">'+transtab['person']+'</h2>';

        if(result.naam)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['name']+'</h3><h4 class="li_valueList">'+result.naam+'</h4></div>';
        if(result.voornamen)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['firstnames']+'</h3><h4 class="li_valueList">'+result.voornamen+'</h4></div>';
        if(result.woonplaats)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['woonplaats']+'</h3><h4 class="li_valueList">'+result.woonplaats+'</h4></div>';
        if(result.beroep)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['beroep']+'</h3><h4 class="li_valueList">'+result.beroep+'</h4></div>';
        
        targetToPush += '<h2 class=class="mb-1"> </h2>';
        targetToPush += '<h2 class=class="mb-1">Oat</h2>';
        if(result.toponiem)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['toponiem']+'</h3><h4 class="li_valueList">'+result.toponiem+'</h4></div>';
        if(result.artikel_type)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['artikel_type']+'</h3><h4 class="li_valueList">'+result.artikel_type+'</h4></div>';
        if(result.artikelnummer)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['artikelnummer']+'</h3><h4 class="li_valueList">'+result.artikelnummer+'</h4></div>';
        if(result.soort)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['type']+'</h3><h4 class="li_valueList">'+result.soort+'</h4></div>';
        if(result.gemeente)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['municipality']+'</h3><h4 class="li_valueList">'+result.gemeente+'</h4></div>';
        if(result.perceelnr)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['perceelnr']+'</h3><h4 class="li_valueList">'+result.perceelnr+'</h4></div>';
        if(result.sectie)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['section']+'</h3><h4 class="li_valueList">'+result.sectie+'</h4></div>';
        if(result.grootte)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['grootte']+'</h3><h4 class="li_valueList">'+result.grootte+'</h4></div>';
        if(result.belastbaar_inkomen_ongebouwd)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['belastbaar_inkomen_ongebouwd']+'</h3><h4 class="li_valueList">'+result.belastbaar_inkomen_ongebouwd+'</h4></div>';
        if(result.voorlopige_klassering)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['voorlopige_klassering']+'</h3><h4 class="li_valueList">'+result.voorlopige_klassering+'</h4></div>';
        if(result.ongebouwde_grootte_1e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['ongebouwde_grootte_1e_klasse']+'</h3><h4 class="li_valueList">'+result.ongebouwde_grootte_1e_klasse+'</h4></div>';
        if(result.ongebouwde_grootte_2e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['ongebouwde_grootte_2e_klasse']+'</h3><h4 class="li_valueList">'+result.ongebouwde_grootte_2e_klasse+'</h4></div>';
        if(result.ongebouwde_grootte_3e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['ongebouwde_grootte_3e_klasse']+'</h3><h4 class="li_valueList">'+result.ongebouwde_grootte_3e_klasse+'</h4></div>';
        if(result.tarief_ongebouwde_1e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['tarief_ongebouwde_1e_klasse']+'</h3><h4 class="li_valueList">'+result.tarief_ongebouwde_1e_klasse+'</h4></div>';
        if(result.tarief_ongebouwde_2e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['tarief_ongebouwde_2e_klasse']+'</h3><h4 class="li_valueList">'+result.tarief_ongebouwde_2e_klasse+'</h4></div>';
        if(result.tarief_ongebouwde_3e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['tarief_ongebouwde_3e_klasse']+'</h3><h4 class="li_valueList">'+result.tarief_ongebouwde_3e_klasse+'</h4></div>';
        if(result.scan_oat)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['scan_oat']+'</h3><h4 class="li_valueList">'+result.scan_oat+'</h4></div>';
        if(result.scan_kaart)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['scan_kaart']+'</h3><h4 class="li_valueList">'+result.scan_kaart+'</h4></div>';
        if(result.verwijzing_suppletoire_aanwijzende_tafel)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['verwijzing_suppletoire_aanwijzende_tafel']+'</h3><h4 class="li_valueList">'+result.verwijzing_suppletoire_aanwijzende_tafel+'</h4></div>';
        if(result.object_koppelveld)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['object_koppelveld']+'</h3><h4 class="li_valueList">'+result.object_koppelveld+'</h4></div>';
        targetToPush += '</div>';
        
        targetToPush += '<div class="col-md-4">';
        targetToPush += '<h2 class=class="mb-1">Scans</h2>'
        if(result.scan_kaart) {
            targetToPush += '<div><button type=\"button\" onclick=\"getGoogleDriveADAFileId(\''+result.scan_kaart+'\');\" class=\"btn btn-secondary\">'+transtab['scan_kaart']+'</button></div>';
        }
        if(result.scan_oat) {
            targetToPush += '<div><button type=\"button\" onclick=\"getGoogleDriveADAFileId(\''+result.scan_oat+'\');\" class=\"btn btn-secondary\">'+transtab['scan_oat']+'</button></div>';
        }
//        targetToPush += '<div><button type=\"button\" onclick=\"getGoogleDriveADAFileId(\'NL-LI-RMD00-100-001-1842-a02\');\" class=\"btn btn-secondary\">NL-LI-RMD00-100-001-1842-a02</button></div>';
        targetToPush += '</div>';        
        
    } else if (result.indexOf("blad") > -1){
        result = result.replace(/ /g,"_");
        result = JSON.parse(result);
        
        targetToPush += '<div class="col-md-8">';
        
        targetToPush += '<h2 class=class="mb-1"> </h2>';
        targetToPush += '<h2 class=class="mb-1">Admin</h2>';
        if(result.toponiem)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['toponiem']+'</h3><h4 class="li_valueList">'+result.toponiem+'</h4></div>';
        if(result.artikel_type)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['artikel_type']+'</h3><h4 class="li_valueList">'+result.artikel_type+'</h4></div>';
        if(result.artikelnummer)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['artikelnummer']+'</h3><h4 class="li_valueList">'+result.artikelnummer+'</h4></div>';
        if(result.soort)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['type']+'</h3><h4 class="li_valueList">'+result.soort+'</h4></div>';
        if(result.gemeente)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['municipality']+'</h3><h4 class="li_valueList">'+result.gemeente+'</h4></div>';
        if(result.perceelnr)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['perceelnr']+'</h3><h4 class="li_valueList">'+result.perceelnr+'</h4></div>';
        if(result.blad)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['blad']+'</h3><h4 class="li_valueList">'+result.blad+'</h4></div>';
        if(result.sectie)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['section']+'</h3><h4 class="li_valueList">'+result.sectie+'</h4></div>';
        if(result.grootte)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['grootte']+'</h3><h4 class="li_valueList">'+result.grootte+'</h4></div>';
        if(result.belastbaar_inkomen_ongebouwd)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['belastbaar_inkomen_ongebouwd']+'</h3><h4 class="li_valueList">'+result.belastbaar_inkomen_ongebouwd+'</h4></div>';
        if(result.voorlopige_klassering)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['voorlopige_klassering']+'</h3><h4 class="li_valueList">'+result.voorlopige_klassering+'</h4></div>';
        if(result.ongebouwde_grootte_1e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['ongebouwde_grootte_1e_klasse']+'</h3><h4 class="li_valueList">'+result.ongebouwde_grootte_1e_klasse+'</h4></div>';
        if(result.ongebouwde_grootte_2e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['ongebouwde_grootte_2e_klasse']+'</h3><h4 class="li_valueList">'+result.ongebouwde_grootte_2e_klasse+'</h4></div>';
        if(result.ongebouwde_grootte_3e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['ongebouwde_grootte_3e_klasse']+'</h3><h4 class="li_valueList">'+result.ongebouwde_grootte_3e_klasse+'</h4></div>';
        if(result.tarief_ongebouwde_1e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['tarief_ongebouwde_1e_klasse']+'</h3><h4 class="li_valueList">'+result.tarief_ongebouwde_1e_klasse+'</h4></div>';
        if(result.tarief_ongebouwde_2e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['tarief_ongebouwde_2e_klasse']+'</h3><h4 class="li_valueList">'+result.tarief_ongebouwde_2e_klasse+'</h4></div>';
        if(result.tarief_ongebouwde_3e_klasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['tarief_ongebouwde_3e_klasse']+'</h3><h4 class="li_valueList">'+result.tarief_ongebouwde_3e_klasse+'</h4></div>';
        if(result.scan_oat)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">scan oat</h3><h4 class="li_valueList">'+result.scan_oat+'</h4></div>';
        if(result.scan_kaart)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['scan_kaart']+'</h3><h4 class="li_valueList">'+result.scan_kaart+'</h4></div>';
        if(result.verwijzing_suppletoire_aanwijzende_tafel)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['verwijzing_suppletoire_aanwijzende_tafel']+'</h3><h4 class="li_valueList">'+result.verwijzing_suppletoire_aanwijzende_tafel+'</h4></div>';
        if(result.object_koppelveld)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['object_koppelveld']+'</h3><h4 class="li_valueList">'+result.object_koppelveld+'</h4></div>';
        targetToPush += '</div>';
        
        targetToPush += '<div class="col-md-4">';
        targetToPush += '<h2 class=class="mb-1">Scans</h2>'
        if(result.scan_kaart) {
            targetToPush += '<div><button type=\"button\" onclick=\"getGoogleDriveADAFileId(\''+result.scan_kaart+'\');\" class=\"btn btn-secondary\">'+transtab['scan_kaart']+'</button></div>';
        }
        targetToPush += '<div><button type=\"button\" onclick=\"getGoogleDriveADAFileId(\'NL-LI-RMD00-100-001-1842-a02\');\" class=\"btn btn-secondary\">NL-LI-RMD00-100-001-1842-a02</button></div>';
        targetToPush += '</div>';

        
    } else {
        result = JSON.parse(result);
        if (result == null) {
            targetToPush = ' No data available ';
        } else {


            targetToPush += '<div class="col-md-8">';

            targetToPush += '<h2 class=class="mb-1">'+transtab['fact']+'</h2>';
            if (result.feit) {
            if (result.feit[0].feittype) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['type']+'</h3><h4 class="li_valueList">'+result.feit[0].feittype+'</h4></div>';
            if (result.feit[0].text) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['text']+'</h3><h4 class="li_valueList">'+result.feit[0].tekst+'</h4></div>';
            if (result.feit[0].datum) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['date']+'</h3><h4 class="li_valueList">'+result.feit[0].datum.toString().substr(0,8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")+'</h4></div>';
            if (result.feit[0].feitsubtype) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['subtype']+'</h3><h4 class="li_valueList">'+result.feit[0].feitsubtype+'</h4></div>';
            if (result.feit[0].archiefwet) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['archive_law']+'</h3><h4 class="li_valueList">'+result.feit[0].archiefwet+'</h4></div>';
            if (result.feit[0].trefwoord) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['keyword']+'</h3><h4 class="li_valueList">'+result.feit[0].trefwoord+'</h4></div>';
            if (result.feit[0].bronklasse) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['source']+'</h3><h4 class="li_valueList">'+result.feit[0].bronklasse+'</h4></div>';
            if (result.feit[0].kenmerk) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['characteristic']+'</h3><h4 class="li_valueList">'+result.feit[0].kenmerk+'</h4></div>';
            if (result.feit[0].opmerking) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['remark']+'</h3><h4 class="li_valueList">'+result.feit[0].opmerking+'</h4></div>';
            if (result.feit[0].plaats) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['place']+'</h3><h4 class="li_valueList">'+result.feit[0].plaats+'</h4></div>';

            if (result.persoon != null) {
            if (result.persoon.length> 0){
                var curr_pers_id = result.persoon[0].pers_id;
                for(i=0;i<result.persoon.length;i++) {

                    if ((i==0) || (curr_pers_id != result.persoon[i].pers_id)) {
                        curr_pers_id = result.persoon[i].pers_id;
                        targetToPush += '<h2 class=class="mb-1"> </h2>';
                        targetToPush += '<h2 class=class="mb-1">'+transtab['person']+'</h2>';
                        if(result.persoon[i].rol)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['role']+'</h3><h4 class="li_valueList">'+result.persoon[i].rol+'</h4></div>';
                        if(result.persoon[i].naam)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['name']+'</h3><h4 class="li_valueList">'+result.persoon[i].naam+'</h4></div>';
                        if(result.persoon[i].voornamen)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['firstnames']+'</h3><h4 class="li_valueList">'+result.persoon[i].voornamen+'</h4></div>';
                        if(result.persoon[i].perstype)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['type']+'</h3><h4 class="li_valueList">'+persoonsoort[result.persoon[i].perstype]+'</h4></div>';
                        if(result.persoon[i].kenmerk)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['characteristic']+'</h3><h4 class="li_valueList">'+result.persoon[i].kenmerk+'</h4></div>';
                        if(result.persoon[i].opmerking)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['remark']+'</h3><h4 class="li_valueList">'+result.persoon[i].opmerking+'</h4></div>';
                    }            
                    if (result.persoon[i].waarde) { 
                        if (result.persoon[i].authority.indexOf('atum') != -1){
                            var datum = result.persoon[i].waarde.toString().substr(0,8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
                            targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab[result.persoon[i].authority.toString().replace(' ','_')]+'</h3><h4 class="li_valueList">'+datum+'</h4></div>';
                        } else {
                            targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab[result.persoon[i].authority.toString().replace(' ','_')]+'</h3><h4 class="li_valueList">'+result.persoon[i].waarde+'</h4></div>';
                        }
                    }
                }
            }
        }
            for(i=0;i<result.bron.length;i++) {
                targetToPush += '<h2 class=class="mb-1"> </h2>';
                targetToPush += '<h2 class=class="mb-1">'+transtab['source']+'</h2>';
                if(result.bron[i].land)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['country']+'</h3><h4 class="li_valueList">'+result.bron[i].land+'</h4></div>';
                if(result.bron[i].provincie)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['province']+'</h3><h4 class="li_valueList">'+result.bron[i].provincie+'</h4></div>';
                if(result.bron[i].gemeente)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['municipality']+'</h3><h4 class="li_valueList">'+result.bron[i].gemeente+'</h4></div>';
                if(result.bron[i].plaats)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['place']+'</h3><h4 class="li_valueList">'+result.bron[i].plaats+'</h4></div>';
                if(result.bron[i].plaatscode)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['placecode']+'</h3><h4 class="li_valueList">'+result.bron[i].plaatscode+'</h4></div>';
                if(result.bron[i].categorie)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['category']+'</h3><h4 class="li_valueList">'+result.bron[i].categorie+'</h4></div>';
                if(result.bron[i].bronklasse)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['source_class']+'</h3><h4 class="li_valueList">'+result.bron[i].bronklasse+'</h4></div>';
                if(result.bron[i].brontext)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['text']+'</h3><h4 class="li_valueList">'+result.bron[i].brontext+'</h4></div>';
                if (result.bron[i].bdatum) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['startdate']+'</h3><h4 class="li_valueList">'+result.bron[i].bdatum.toString().substr(0,8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")+'</h4></div>';
                if (result.bron[i].edatum) targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['enddate']+'</h3><h4 class="li_valueList">'+result.bron[i].edatum.toString().substr(0,8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")+'</h4></div>';
                if(result.bron[i].trefwoord)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['keyword']+'</h3><h4 class="li_valueList">'+result.bron[i].trefwoord+'</h4></div>';
                if(result.bron[i].adacode)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['adacode']+'</h3><h4 class="li_valueList">'+result.bron[i].adacode+'</h4></div>';
                if(result.bron[i].opmerking)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['remark']+'</h3><h4 class="li_valueList">'+result.bron[i].opmerking+'</h4></div>';
                if(result.bron[i].rubriek)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['column']+'</h3><h4 class="li_valueList">'+result.bron[i].rubriek+'</h4></div>';
                if(result.bron[i].omschrijving)targetToPush += '<div class="col-md-12" style="display: inline-block;"><h3 class="li_keyList">'+transtab['description']+'</h3><h4 class="li_valueList">'+result.bron[i].omschrijving+'</h4></div>';
            }
            }
            targetToPush += '</div>';
            targetToPush += '</div>';
            
            targetToPush += '<div class="col-md-4" >';
            targetToPush += '<h2 class=class="mb-1">Scans</h2>'
                if(result.scan_kaart) {
                    targetToPush += '<div><button type=\"button\" onclick=\"getGoogleDriveADAFileId(\''+result.scan_kaart+'\');\" class=\"btn btn-secondary\">'+result.scan_kaart+'</button></div>';
                }

            for(i=0;i<result.bron.length;i++) {        
                if(result.bron[i].adacode) targetToPush += '<div><button type=\"button\" onclick=\"getGoogleDriveADAFileId(\''+result.bron[i].adacode+'\');\" class=\"btn btn-secondary\">'+transtab['adacode']+'</button></div>';
            }
            targetToPush += '<div><button type=\"button\" onclick=\"getGoogleDriveADAFileId(\'NL-LI-RMD00-100-001-1842-a02\');\" class=\"btn btn-secondary\">'+transtab['adacode']+'</button></div>';

            targetToPush += '</div>';
        }
    }
    poutput.push(targetToPush);
    $('#al_detailResultList').empty();
    $('#al_detailResultList').append(poutput.join(''));
    $('#al_resultList').hide();
    $('#li_navbar').hide();
    $('#li_navbar_detail').show();
    $('#al_detailResultList').show();
}


function closeFactBoxes() {
    $('#feitenbox').slideUp();
    firstOpenFeit = false;        
    $('#subtypesbox').slideUp();
    firstOpenSubtype = false;
}

    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var result = 'false';
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){
                result = pair[1];
            }
        }
        return(result);
    }
