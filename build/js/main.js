document.addEventListener('DOMContentLoaded', function(event) {
  fetch("https://opendata.takamatsu-fact.com/data-updates.json")
  .then((response) => {
    return response.json()
  }).then((result) => {
    const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    let = html = '';
    for (let i = 0; i < 3; i++) {
      const update = result[i];
      const match = update.date.match(/^(\d{4})-(\d{2})-(\d{2})/);
      const year = match[1];
      const month = match[2];
      const day = match[3];
      html += `<dt>${year}/${month}/${day}</dt><dd><a href="https://github.com/takamatsu-city/opendata/tree/main/data/${esc(update.category)}">${esc(update.category_name)}</a></dd>`;
    }
    document.getElementById('data-updates').innerHTML = html; 
  })
  .catch((e) => {
    console.log(e); 
  })
});
