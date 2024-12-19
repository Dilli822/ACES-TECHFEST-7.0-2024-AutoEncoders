<x-app-layout>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h5>User Profile</h5>
            <!-- <a href="{{route('user.dashboard.create')}}" class="btn btn-primary btn-sm">Create New</a> -->
        </div>
        <div class="card-body">
            <table class="table">
                @if ($dashboard)
                        <form action="{{route('user.dashboard.destroy',$dashboard->id)}}" method="post">
                            @csrf
                            @method('delete')
                            <!-- <a href="{{route('user.dashboard.show',$dashboard->id)}}" class="btn btn-info btn-sm">View</a> -->
                            <a href="{{route('user.dashboard.edit',$dashboard->id)}}" class="btn btn-primary btn-sm">Edit</a>
                            <button class="btn btn-danger btn-sm" type="submit">Delete</button>
                        </form>
                @endif
            </table>
        </div>
    </div>
</x-app-layout>
