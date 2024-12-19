<x-app-layout>
    <div class="card">
        <div class="card-header">
            <h5>Income Create Section</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('income.store') }}" method="post">
                @csrf
             <div class="form-group">
                <label for="user_id">User Name</label>
                <input id="user_id" value="{{Auth::user()->name}}" class="form-control" type="text" name="user_id">
             </div>
                <div class="form-group">
                    <label for="salary">Cash</label>
                    <input id="salary" class="form-control" type="text" name="salary">
                </div>
               <div class="form-group">
                <label for="icategory_id">Category Type</label>
                <select id="icategory_id" class="form-control" name="icategory_id">
                    @foreach ($icategories as $icategory)
                    <option value="{{$icategory->id}}">{{$icategory->name}}</option>

                    @endforeach
                </select>
               </div>
               <div class="form-group">
                <label for="date">Date</label>
                <input id="date" class="form-control" type="date" name="date">
               </div>
                <button type="submit" class="btn btn-primary btn-sm">Confirm</button>
            </form>
        </div>
    </div>
</x-app-layout>
