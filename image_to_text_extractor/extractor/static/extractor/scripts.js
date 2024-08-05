function copyText() {
    var textArea = document.getElementById("extractedText");
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand("copy");

    var alert = document.getElementById("alert");
    alert.style.display = "block";
    setTimeout(function() {
        alert.style.display = "none";
    }, 2000);
}

document.addEventListener('paste', function(event) {
    var items = event.clipboardData.items;
    for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            var file = items[i].getAsFile();
            var reader = new FileReader();
            reader.onload = function(event) {
                var imgElement = document.getElementById('imagePreview');
                imgElement.src = event.target.result;
                imgElement.style.display = 'block';

                // Create a DataTransfer to simulate a file input change event
                var dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                var imageInput = document.getElementById('imageInput');
                imageInput.files = dataTransfer.files;

                // Update the form to ensure the file input is submitted
                var formData = new FormData();
                formData.append('csrfmiddlewaretoken', document.querySelector('input[name="csrfmiddlewaretoken"]').value);
                formData.append('image', file);

                // Send the form data using fetch
                fetch('/', {
                    method: 'POST',
                    body: formData
                }).then(response => response.json()).then(data => {
                    if (data.success) {
                        // Handle success
                    } else {
                        // Handle error
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    }
});
