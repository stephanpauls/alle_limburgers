@extends('layouts.app')
@section('content')
       
<div class="container">
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
            <div class ="col-lg-8">
                <span class="navbar-text">
                    Record 1 van 4 &nbsp;
                </span>
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
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>    
            </div>
<div class="col-lg-auto">
    <input id="liToMainPage" type="button" onclick="liToMainPage(); return false;" size="12" readonly value="Terug naar zoekresultaten" >
</div>            
        </nav>
        
    </div>
    <div style="overflow: auto;">
    <div class="card" style="width: 300px;float:left;">
        <p class="card-text">Scans</p>  
        <a href="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjHiL7Fn6TeAhVL3KQKHYwYBUQQjRx6BAgBEAU&url=https%3A%2F%2Fwww.voertuigkosten.be%2Fauto%2Fpk-cc-omrekenen%2F&psig=AOvVaw3tHTnxBiSgOBvJtQdzz6gS&ust=1540648093602313" target="_blank">
            image1
        </a>
        <a href="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi7qJfcn6TeAhVO2qQKHdk2A9sQjRx6BAgBEAU&url=https%3A%2F%2Fwww.autowereld.com%2Fmultimedia%2Ffotogalleries%2Fid%2F10519&psig=AOvVaw3tHTnxBiSgOBvJtQdzz6gS&ust=1540648093602313" target="_blank">
            image2
        </a>    
    </div>
    
    <div class="card">
   <div class="card-body">
               @foreach($feiten as $feit)
<p class="card-text">{{$feit->feittype}}</p>               
<p class="card-text">{{$feit->tekst}}</p>               
<p class="card-text">{{$feit->datum}}</p>               
<p class="card-text">{{$feit->plaats}}</p>               
<p class="card-text">{{$feit->trefwoord}}</p>               
<p class="card-text">{{$feit->bronklasse}}</p>               
<p class="card-text">{{$feit->archiefwet}}</p>               
        @endforeach
       
    
  </div>
</div>
    </div>
    

</div>
<input type="submit" value="" />
<script>
$(document).ready(function(){
            $('#liToMainPage').click(function(e){
            e.preventDefault();    
             //window.history.back();
             window.history.go(-1);
        });
});
</script>    
@endsection
