function solve() {
    const fields = Array.from(document.querySelectorAll('div.store form input'));
    const addBtn = document.querySelector('div.store form button');
    
    const furnitureList = document.getElementById('furniture-list');

    const input = {
        model: fields[0],
        year: fields[1],
        price: fields[2],
    };

    const descriptionField = document.getElementById('description');

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const model = input.model.value.trim();
        const year = Number(input.year.value.trim());
        const description = descriptionField.value.trim();
        const price = Number(input.price.value.trim());
        
        if (model == '' || year < 0 || description == '' || price <= 0) {
            return;
        }

        const trInfo = document.createElement('tr');
        trInfo.classList.add('info');
        trInfo.innerHTML = `<td>${model}</td><td>${price.toFixed(2)}</td><td><button class="moreBtn">More Info</button><button class="buyBtn">Buy it</button></td>`;

        const trHide = document.createElement('tr');
        trHide.classList.add('hide');

        trHide.innerHTML = `<td>Year: ${year}</td><td colspan="3">Description: ${description}</td>`;

        furnitureList.appendChild(trInfo);
        furnitureList.appendChild(trHide);

        input.model.value = '';
        input.year.value = '';
        descriptionField.value = '';
        input.price.value = '';
        
        const moreBtn = furnitureList.querySelector('tr.info button.moreBtn');

        moreBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (moreBtn.textContent == 'More Info') {
                moreBtn.textContent = 'Less Info';
                trHide.style.display = 'contents';
            } else {
                moreBtn.textContent = 'More Info';
                trHide.style.display = 'none';
            }
        });

        const buyBtn = furnitureList.querySelector('tr.info button.buyBtn');
        
        const tableInfo = document.getElementById('information');
        const totalElement = tableInfo.querySelector('td.total-price');
        let total = Number(totalElement.textContent);

        buyBtn.addEventListener('click', (e) => {
            e.preventDefault();

            let currTotal = total += price;
            totalElement.textContent = `${currTotal.toFixed(2)}`;

            trInfo.remove();
            trHide.remove();
        });
    });
}
