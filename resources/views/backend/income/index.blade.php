<x-app-layout>
    <div class="card">
        <div class="card-header">
            <h5>Income Index Page</h5>
        </div>
        <div class="card-body">
           <table class="table">
            <tr>
                <th>S.N</th>
                {{-- <th>User Name</th> --}}
                <th>Amount</th>
                <th>Date</th>
                <th>Posted On</th>
                <th>Action</th>
            </tr>
            @foreach ($incomes as $income)
            <tr>
                <td>1</td>
                {{-- <td>{{$income->username}}</td> --}}
                <td>{{$income->amount}}</td>
                <td>{{\Carbon\Carbon::parse($income->date)->format('d-M-y')}}</td>
                <td>{{$income->created_at->format('d-Y-M')}}</td>
                <td>
                    <form action="{{route('income.destroy',$income->id)}}" method="post">
                        @csrf
                        @method('delete')
                        <a href="{{route('income.show',$income->id)}}" class="btn btn-info btn-sm">View</a>
                        <a href="{{route('income.edit',$income->id)}}" class="btn btn-primary btn-sm">Edit</a>
                        <button class="btn btn-danger btn-sm" type="submit">Delete</button>
                    </form>
                </td>
            </tr>

            @endforeach
           </table>
        </div>
    </div>
</x-app-layout>
