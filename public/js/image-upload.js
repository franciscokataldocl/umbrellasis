
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(e)
          $('#imagePreview').css('background-image', 'url('+e.target.result+')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function() {
  readURL(this);

});


function readURLEdit(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#imgPreviewEditar').css('background-image', 'url('+e.target.result+')');
          $('#imgPreviewEditar').hide();
          $('#imgPreviewEditar').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUploadEditar").change(function() {
  readURLEdit(this);
});
