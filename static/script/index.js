var remove = document.getElementById('js-remove')

if (remove) {
  remove.addEventListener('click', onremove)
}

function onremove(ev) {
  var node = ev.target
  var id = node.dataset.id…
}

var res = new XMLHttpRequest()

res.open('DELETE', '/' + id)
res.onload = onload
res.send()

function onload() {
  if (res.status !== 200) {
    throw new Error('Could not delete!')
  }


  window.location = '/'
}


/* Bron: https://docs.google.com/presentation/d/137YTmMadaUNCJ2ksKHzU_NCZT-BIv3q9tGhXc38EZ3g/edit#slide=id.g4e3b0a74b9_1_1260
 */