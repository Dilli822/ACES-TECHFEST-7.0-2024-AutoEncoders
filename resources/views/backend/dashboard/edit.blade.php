<x-app-layout>
    <div class="card">
        <div class="card-header">
            <h5>Edit Page</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('user.dashboard.update', $dashboard->id) }}" method="post" enctype="multipart/form-data" onsubmit="return validateImage()">
                @csrf
                @method('put')

                <div class="form-group">
                    <label for="username">Username</label>
                    <input id="username" class="form-control" type="text" name="username" value="{{$dashboard->username}}">
                </div>

                <div class="form-group">
                    <label for="address">Address</label>
                    <input id="address" class="form-control" type="text" name="address" value="{{$dashboard->address}}">
                </div>

                <div class="form-group">
                    <label for="contact">Contact</label>
                    <input id="contact" class="form-control" type="text" name="contact" value="{{$dashboard->contact}}">
                </div>

                <div class="form-group">
                    <label for="image">Upload Image</label>
                    <input id="image" class="form-control-file" type="file" name="image" onchange="checkFileSize(this)">
                    <div>
                        <img src="{{asset($dashboard->image)}}" width="50%" height="50%" alt="">
                    </div>
                    <span id="image-error" style="color: red; display: none;">Image must be less than 2 MB and an image file.</span>
                </div>

                <button type="submit" class="btn btn-primary btn-sm">Confirm</button>
            </form>
        </div>
    </div>

    <script>
        // Validate the image file size and type before form submission
        function validateImage() {
            const fileInput = document.getElementById('image');
            const file = fileInput.files[0];

            if (file) {
                // Check if file is an image
                const fileType = file.type.split('/')[0];
                if (fileType !== 'image') {
                    alert("Please upload a valid image file.");
                    return false;  // Prevent form submission
                }

                // Check if file size exceeds 2 MB
                if (file.size > 2 * 1024 * 1024) {  // 2MB limit
                    alert("Image size must be less than 2 MB.");
                    return false;  // Prevent form submission
                }
            }
            return true;
        }

        // Check file size and type on file selection
        function checkFileSize(input) {
            const file = input.files[0];
            const errorElement = document.getElementById('image-error');

            if (file) {
                // Check if file is an image
                const fileType = file.type.split('/')[0];
                if (fileType !== 'image') {
                    alert("Please upload a valid image file.");
                    errorElement.style.display = 'block';
                    input.value = '';  // Clear the file input
                    return;
                }

                // Check file size
                if (file.size > 2 * 1024 * 1024) {  // 2MB limit
                    errorElement.textContent = "Image size must be less than 2 MB.";
                    errorElement.style.display = 'block';
                    input.value = '';  // Clear the file input
                } else {
                    errorElement.style.display = 'none';  // Hide error message
                }
            }
        }
    </script>
</x-app-layout>
