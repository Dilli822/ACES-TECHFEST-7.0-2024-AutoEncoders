<x-app-layout>
    <div class="card">
        <div class="card-header">
            <h5 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">User Account Details
            </h5>
            <a href="{{route('account.index')}}">Back</a>
        </div>
        <div class="card-body">
            <form action="{{route('account.store')}}" method="post" enctype="multipart/form-data">
                @csrf
              <div class="form-group">
                <label for="user_id">User Name</label>
                <input id="user_id" value="{{Auth::user()->name}}" class="form-control" type="text" name="user_id">
              </div>
               {{-- <div class="form-group">
                <label for="user_id">User ID</label>
                <input id="user_id" value="{{Auth::user()->id}}" class="form-control" type="text" name="user_id">
               </div> --}}
                <div class="form-group">
                    <label for="salary">Cash</label>
                    <input id="salary" class="form-control" type="text" name="salary">
                </div>
                <div class="form-group">
                    <label for="date">Date</label>
                    <input id="date" class="form-control" type="date" name="date">
                </div>
                <div class="form-group">
                    <label for="description">Note</label>
                    <input id="description" class="form-control" type="text" name="description">
                </div>

                <button type="submit" class="btn btn-primary btn-sm">Confirm</button>
            </form>

        </div>
    </div>

</x-app-layout>
