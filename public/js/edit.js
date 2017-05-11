var quill = new Quill('#editor', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'blockquote', 'image', 'code-block']
      ]
    },
    theme: 'snow'
});

function getContent(){
  document.getElementById("content").value = quill.getText();
}




