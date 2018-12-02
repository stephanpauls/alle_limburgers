@extends('layouts.app')
@section('content')
       
<div class="container">
    <div id="li_navbar_detail">
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #9fd7a3;">
            <div class ="col-lg-10">
                <span class="navbar-text">
                    {{__('app.detail')}}
                </span>
            </div>            
            <div class="col-lg-auto">
                <nav aria-label="Page navigation example" style="padding-top: 15px; padding-bottom: 5px">
                <ul class="pagination">
                <li class="page-item"><a class="page-link" href="javascript:jumpToPreviousDetailPage('+k+','+nrOfPages+');"  aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>
                <li class="page-item"><a class="page-link" href="javascript:jumpToNextDetailPage('+k+','+nrOfPages+');" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>
                </ul>
                </nav>
            </div>            
            <div class="col-lg-auto">
                <input id="liToMainPage" type="button" onclick="liToMainPage(); return false;" size="12" readonly value="{{__('app.back')}}" >
            </div>            
        </nav>
    </div>
    <div id="alDetailResultList" style="overflow: auto;">
        <div style="width: 200px;float:left;background-color: #f2f2f2">
            <p class="card-text">Scans</p>  
            <a href="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjHiL7Fn6TeAhVL3KQKHYwYBUQQjRx6BAgBEAU&url=https%3A%2F%2Fwww.voertuigkosten.be%2Fauto%2Fpk-cc-omrekenen%2F&psig=AOvVaw3tHTnxBiSgOBvJtQdzz6gS&ust=1540648093602313" target="_blank">
                image1
            </a>
            <a href="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi7qJfcn6TeAhVO2qQKHdk2A9sQjRx6BAgBEAU&url=https%3A%2F%2Fwww.autowereld.com%2Fmultimedia%2Ffotogalleries%2Fid%2F10519&psig=AOvVaw3tHTnxBiSgOBvJtQdzz6gS&ust=1540648093602313" target="_blank">
                image2
            </a>    
        </div>

            <div style="width:50px;float:left;">
                &nbsp;
            </div>

        <div style="width: 100px;float:left;">
            <p>@lang('app.fact')</p> 
            <p>{{__('app.text')}}</p>               
            <p>{{__('app.date')}}</p>               
            <p>{{__('app.place')}}</p>               
            <p>{{__('app.keyword')}}</p>               
            <p>{{__('app.source_class')}}</p>               
            <p>{{__('app.archive_law')}}</p>               
        </div>
        <div >
        @foreach($feiten as $feit)
            <p><span class="li_span">{{$feit->feittype}}</span></p> 
            <p><span class="li_span">{{$feit->tekst}}</span></p>               
            <p><span class="li_span">{{$feit->datum}}</span></p>               
            <p><span class="li_span">{{$feit->plaats}}</span></p>               
            <p><span class="li_span">{{$feit->trefwoord}}</span></p>               
            <p><span class="li_span">{{$feit->bronklasse}}</span></p>               
            <p><span class="li_span">{{$feit->archiefwet}}</span></p>               
        @endforeach
        </div>
    </div>
</div>
<script>
$(document).ready(function(){
            $('#liToMainPage').click(function(e){
            e.preventDefault();    
             //window.history.back();
             //return window.history.go(-1);
             window.close();
        });
});
</script>    
@endsection
