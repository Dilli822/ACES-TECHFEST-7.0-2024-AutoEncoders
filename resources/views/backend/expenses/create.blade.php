<x-app-layout>
<div class="card">
    <div class="card-header">
        <h5>Expense Create Section</h5>
    </div>
    <div class="card-body">
        <form action="{{ route('expense.create') }}" method="post">
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
            <label for="ecategory_id">Category Type</label>
            <select id="ecategory_id" class="form-control" name="ecategory_id">
                @foreach ($ecategories as $ecategory)
                <option value="{{$ecategory->id}}">{{$ecategory->title}}</option>

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
