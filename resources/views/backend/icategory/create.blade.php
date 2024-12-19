<x-app-layout>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h5>Create</h5>
            <a href="{{route('icategory.index')}}" class="btn btn-primary btn-sm">See Income Category</a>
        </div>
        <div class="card-body">
            <form action="{{route('icategory.store')}}" method="post">
                @csrf
                <div class="form-group">
                    <label for="name">Income Category</label>
                    <input id="name" class="form-control" type="text" name="name">
                </div>
                <button type="submit" class="btn btn-primary btn-sm">Save</button>
            </form>
        </div>
    </div>
</x-app-layout>
