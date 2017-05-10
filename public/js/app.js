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

axios.defaults.maxContentLength = 12000;

var title = document.querySelector('.title');
var shortContent = document.querySelector('.short');
var content = document.querySelector('.ql-editor');
var saveBtn = document.querySelector('.save-post');


saveBtn.addEventListener("click", function(e) {
  e.preventDefault();
  var data = new FormData();

  if (!title.value || !content.innerHTML) {
    return false;
  }

  data.append('title', title.value);
  data.append('content', content.innerHTML);
  data.append('shortContent', shortContent.value);
  data.append('image', document.getElementById('file').files[0]);
  axios.post('/post', data).then(function (res) {
    location.reload();
  });
}, false);
