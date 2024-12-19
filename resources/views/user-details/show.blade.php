<!-- resources/views/profile/show.blade.php -->

@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>User Profile</h2>

        <!-- Success Message -->
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <!-- Display user profile details -->
        <div class="row">
            <div class="col-md-6">
                <strong>Phone Number:</strong> {{ $user->userDetail->phone_number ?? 'N/A' }} <br>
                <strong>Address:</strong> {{ $user->userDetail->address ?? 'N/A' }} <br>

            
            </div>
        </div>

        <a href="{{ route('profile.edit') }}" class="btn btn-warning">Edit Profile</a>
    </div>
@endsection
