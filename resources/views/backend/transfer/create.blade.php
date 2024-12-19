<x-app-layout>
    <div class="card">
        <div class="card-header">
            <h5>Transfer Create Section</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('transfer.store') }}" method="post">
                @csrf
             <div class="form-group">
                <label for="user_id">User Name</label>
                <input id="user_id" value="{{Auth::user()->name}}" class="form-control" type="text" name="user_id">
             </div>
                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input id="amount" class="form-control" type="text" name="amount">
                </div>
               <div class="form-group">
                <label for="tcategory_id">Transfer Type</label>
                <select id="tcategory_id" class="form-control" name="tcategory_id">
                    @foreach ($tcategories as $tcategory)
                    <option value="{{$tcategory->id}}">{{$tcategory->title}}</option>

                    @endforeach
                </select>
               </div>
               <div class="form-group">
                <label for="description">Description</label>
                <input id="description" class="form-control" type="description" name="description">
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
