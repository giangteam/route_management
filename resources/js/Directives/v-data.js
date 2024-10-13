export const vData = {
    mounted(el, binding) {
        const { data, columns } = binding.value;

        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column.label;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        if (Array.isArray(data)) {
            data.forEach(item => {
                const tr = document.createElement('tr');

                columns.forEach(column => {
                    const td = document.createElement('td');
                    const fieldPath = column.field.split('.');
                    let value = item;

                    fieldPath.forEach(field => {
                        value = value[field];
                    });


                    if(fieldPath[0] === 'action'){
                        td.innerHTML = `<a data-id="${item.id}" class="edit cursor-pointer"><i class="fas fa-edit mr-2"></i>Sửa</a>`;
                        tr.appendChild(td);
                    } else{
                        td.textContent = value !== undefined ? value : '';
                    }
                    tr.appendChild(td);
                });


                tbody.appendChild(tr);
            });
        } else {
            console.warn('v-data expects an array');
        }

        el.innerHTML = '';
        el.appendChild(thead);
        el.appendChild(tbody);
    }
};
