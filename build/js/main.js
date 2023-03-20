document.addEventListener('DOMContentLoaded', function(event) {
  fetch("https://opendata.takamatsu-fact.com/data-updates.json")
  .then((response) => {
    return response.json()
  }).then((result) => {
    let = html = '';
    for (let i = 0; i < 3; i++) {
      const update = result[i];
      const match = update.mtime.match(/^(\d{4})-(\d{2})-(\d{2})/);
      const year = match[1];
      const month = match[2];
      const day = match[3];
      html += `<dt>${year}/${month}/${day}</dt><dd><a href="https://raw.githubusercontent.com/takamatsu-city/opendata/main/${update.file}">${update.category}</a></dd>`;
    }
    document.getElementById('data-updates').innerHTML = html; 
  })
  .catch((e) => {
    console.log(e); 
  })
});