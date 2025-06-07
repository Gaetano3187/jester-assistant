(function(){
  const supermarketList = document.getElementById('list');
  const onlineList = document.getElementById('onlineList');
  const favoritesList = document.getElementById('favoritesList');
  const statsDiv = document.getElementById('stats');

  function updateStats() {
    const total = supermarketList.children.length + onlineList.children.length;
    const purchased = document.querySelectorAll('li.purchased').length;
    statsDiv.innerText = `Totale: ${total} • Acquistati: ${purchased}`;
  }

  window.addItem = function(item, list='supermarket') {
    const li = document.createElement('li');
    li.textContent = item;
    li.onclick = () => removeItem(li);
    if (list === 'online') {
      onlineList.appendChild(li);
    } else {
      supermarketList.appendChild(li);
    }
    updateStats();
  };

  window.removeItem = function(li) {
    li.remove();
    updateStats();
  };

  window.markPurchased = function() {
    const allItems = [...supermarketList.children, ...onlineList.children];
    allItems.forEach(li => li.classList.add('purchased'));
    updateStats();
  };

  window.downloadList = function() {
    const items = [...supermarketList.children, ...onlineList.children].map(li => li.textContent);
    const blob = new Blob([items.join('\n')], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lista_spesa.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // Funzioni di supporto per voice.js
  window.addItemToList = window.addItem;
  window.removeItemFromList = function(item) {
    [...supermarketList.children, ...onlineList.children].forEach(li => {
      if (li.textContent.toLowerCase() === item.toLowerCase()) li.remove();
    });
    updateStats();
  };

  /**
   * Segna come acquistati gli articoli riconosciuti via OCR
   * @param {string[]} items - Array di nomi prodotto
   */
  window.markPurchasedByNames = function (items) {
    items.forEach(name => {
      [...supermarketList.children, ...onlineList.children].forEach(li => {
        if (li.textContent.trim().toLowerCase() === name.trim().toLowerCase()) {
          li.classList.add('purchased');
        }
      });
    });
 
    
    updateStats();
  };

})();
