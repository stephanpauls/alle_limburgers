@extends('layouts.app')
@section('content')
<div class="col-md-6 col-lg-6 col-lg-offset-3">
<div class="card">
  <div class="card-header">
    Feiten
  </div>
    <ul class="list-group">
        @foreach($subtypes as $subtype)
        <li class="list-group-item"><a href="./feit/{{$subtype->feit_id}}">{{$subtype->naam}}</a></li>
        @endforeach
    </ul>
</div>
@endsection
