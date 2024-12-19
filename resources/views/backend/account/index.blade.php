<x-app-layout>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h5 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Index Page</h5>
            <a href="{{route('account.create')}}" class="btn btn-primary btn-sm">Create New</a>
        </div>
        <div class="card-body">
         <table class="table">
            <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>Cash</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
            @foreach ($accounts as $account)
            <tr>
                <td>1</td>
                <td>{{$account->account_id}}</td>
                <td>{{$account->salary}}</td>
                <td>{{$account->description}}</td>
                <td><td>{{\Carbon\Carbon::parse($account->date)->format('d-M-y')}}</td></td>
                <td>
                    <form action="{{route('account.destroy',$account->id)}}" method="post">
                        @csrf
                        @method('delete')
                        <a href="{{route('account.show',$account->id)}}" class="btn btn-info btn-sm">View</a>
                        <a href="{{route('account.edit',$account->id)}}" class="btn btn-primary btn-sm">Edit</a>
                        <button class="btn btn-danger btn-sm" type="submit">Delete</button>
                    </form>
                </td>
            </tr>

            @endforeach
         </table>
        </div>
    </div>
</x-app-layout>
