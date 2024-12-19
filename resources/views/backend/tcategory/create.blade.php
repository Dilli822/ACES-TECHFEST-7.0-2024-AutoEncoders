<x-app-layout>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
        <h5>Transfer Category</h5>
        <a href="{{route('tcategory.index')}}" class="btn btn-primary btn-sm">See Transfer Category</a>
        </div>
        <div class="card-body">
            <form action="{{route('tcategory.store')}}" method="post">
                @csrf
                <div class="form-group">
                    <label for="title">Category Name</label>
                    <input id="title" class="form-control" type="text" name="title">
                </div>
                <button type="submit" class="btn btn-primary btn-sm">Save</button>

            </form>

        </div>
    </div>
</x-app-layout>
