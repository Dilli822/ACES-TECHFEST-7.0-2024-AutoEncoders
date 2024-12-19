<x-app-layout>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h5>Income Categories</h5>
            <a href="{{route('icategory.create')}}" class="btn btn-primary btn-sm">Create New</a>
        </div>
        <div class="card-body">
          <table class="table">
            <tr>
                <th>S.N</th>
                <th>Category Name</th>
                <th>Action</th>
            </tr>
            @foreach ($icategories as $icategory)
            <tr>
                <td>{{$loop->iteration}}</td>
                <td>{{$icategory->name}}</td>
                <td>
                    <form action="{{route('icategory.destroy',$icategory->id)}}" method="post">
                        @csrf
                        @method('delete')
                        {{-- <a href="{{route('icategory.show',$icategory->id)}}" class="btn btn-info btn-sm">View</a>
                        <a href="{{route('icategory.edit',$icategory->id)}}" class="btn btn-primary btn-sm">Edit</a> --}}
                        <button class="btn btn-danger btn-sm" type="submit">Delete</button>
                    </form>
                </td>
            </tr>

            @endforeach
          </table>
        </div>
    </div>
</x-app-layout>
