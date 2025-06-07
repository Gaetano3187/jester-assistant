(function () {
    // Aggiorna la sezione "Prodotti in esaurimento"
    window.updateLowStock = function () {
        const listEl = document.getElementById('lowStockList');
        if (!listEl || !window.productHistory) return;

        listEl.innerHTML = '';
        const now = Date.now();

        Object.entries(window.productHistory).forEach(([name, dates]) => {
            if (dates.length < 2) return;

            // ordina date
            dates.sort();
            const intervals = [];
            for (let i = 1; i < dates.length; i++) {
                intervals.push(dates[i] - dates[i - 1]);
            }
            const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
            const msSinceLast = now - dates[dates.length - 1];

            // Se mancano meno di 2 giorni al prossimo acquisto stimato
            if (msSinceLast >= avgMs - 2 * 24 * 60 * 60 * 1000) {
                const li = document.createElement('li');
                const daysLeft = Math.max(0, Math.round((avgMs - msSinceLast) / (24 * 60 * 60 * 1000)));
                li.textContent = `${name} (≈ ${daysLeft}g)`;
                listEl.appendChild(li);
            }
        });
    };

    // prima esecuzione all’avvio
    window.updateLowStock();
})();
