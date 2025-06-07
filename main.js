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

  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  }

  window.addOnlineItem = function(item) {
    addItem(item, 'online');
  };

  window.addItem = function(item, list='supermarket') {
    const li = document.createElement('li');
    li.textContent = item;
    li.onclick = () => removeItem(li);
    if (list === 'online') {
      onlineList.appendChild(li);
    } else {
      supermarketList.appendChild(li);
    }
 
        showToast(`${item} aggiunto alla lista ${list}`);
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
 
    // ------------------  S T O R I C O   S C O N T R I N I  ------------------

  window.receipts = JSON.parse(localStorage.getItem('receipts') || '[]');

  function saveReceipts() {
    localStorage.setItem('receipts', JSON.stringify(window.receipts));
  }

  window.addReceipt = function (receipt) {
    window.receipts.push(receipt);
    saveRec
      receipt.items.forEach(it => {
    const key = it.name.toLowerCase();
    if (!window.productHistory[key]) window.productHistory[key] = [];
    window.productHistory[key].push(receipt.date);
  });
  saveHistory();
  updateLowStock();
      eipts();
    renderHistory();
  };

  function renderHistory() {
    const historyDiv = document.getElementById('history');
    if (!historyDiv) return;
    historyDiv.innerHTML = '';

    window.receipts.slice().reverse().forEach(r => {
      const wrapper = document.createElement('div');
      wrapper.className = 'receipt-card mb-2 p-2 border rounded';

      const header = document.createElement('div');
      header.innerHTML = `<strong>${r.store}</strong> – ${r.date} – Totale: €${r.total.toFixed(2)}`;
      wrapper.appendChild(header);

      const ul = document.createElement('ul');
      r.items.forEach(it => {
        const li = document.createElement('li');
        li.textContent = `${it.qty} × ${it.name} – €${it.price.toFixed(2)}`;
        ul.appendChild(li);
      });
      wrapper.appendChild(ul);

      historyDiv.appendChild(wrapper);
    });
  }

  renderHistory();
    

})();};

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
