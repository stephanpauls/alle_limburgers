$(document).ready(function(){

    var init = function() {
        $(this).toggle(function() {
            $('#jqdt').find('li:eq(0)').css('background', '#ff0');
            return false;
        }, function() {
            $('#jqdt').find('li:eq(0)').css('background', 'transparent');
            return false;
        });
    };

    var destroy = function() {
        $(this).unbind('toggle').unbind('click');
    };

    $('#dt-link1').livequery(init, destroy);



    $('#qfilter1').livequery(function(){
        
           var targetUrlOrg="http://"+websiteIP+websitePath+"/suggestions/searchSuggestions.php";
         
        $.post(targetUrlOrg, function(data){
            $('#content').find('input').autocomplete(data.split(";"));
        });
    });

});
