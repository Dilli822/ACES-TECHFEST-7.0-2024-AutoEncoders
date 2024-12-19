<x-app-layout>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h5>Create</h5>
            <a href="{{route('ecategory.index')}}" class="btn btn-primary btn-sm">See Expense Category</a>
        </div>
        <div class="card-body">
            <form action="{{route('ecategory.store')}}" method="post">
                @csrf
                <div class="form-group">
                    <label for="title">Income Category</label>
                    <input id="title" class="form-control" type="text" name="title">
                </div>
                <button type="submit" class="btn btn-primary btn-sm">Save</button>
            </form>
        </div>
    </div>
</x-app-layout>

