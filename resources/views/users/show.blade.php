@extends('layouts.app')
@section('content')
<div class="col-md-6 col-lg-6 col-lg-offset-3">
<div class="card">
  <div class="card-header">
    Users
  </div>
    <ul class="list-group">
        <li class="list-group-item"><a href="./users/{{$user->id}}">{{$user->name}}</a></li>
    </ul>
</div>
@endsection
