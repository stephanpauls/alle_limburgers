@extends('layouts.app')
@section('content')
<div class="col-md-6 col-lg-6 col-lg-offset-3">
<div class="card">
  <div class="card-header">
    Bronnen
  </div>
    <ul class="list-group">
        @foreach($bronnen as $feit)
        <li class="list-group-item"><a href="./bron/{{$feit->bron_id}}">{{$feit->rubriek}}</a></li>
        @endforeach
    </ul>
</div>
@endsection