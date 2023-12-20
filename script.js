let name   = document.querySelector('#name');
let price  = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add    = document.querySelector('#add');
let table  = document.querySelector('#table');
let total  = document.querySelector('#total');

add.addEventListener('click', function() {
	let tr = document.createElement('tr');
	
    allowEdit(createCell(tr, name.value, 'name'));
    allowEdit(createCell(tr, price.value, 'price'));
    allowEdit(createCell(tr, amount.value, 'amount'));
	createCell(tr, price.value * amount.value, 'cost');
	createCell(tr, 'удалить', 'remove').addEventListener('click', function() {
        table.removeChild(tr);
        recountTotal()
    });

	table.appendChild(tr);
    recountTotal();
});

function createCell(tr, value, name) {
	let td = document.createElement('td');
    td.textContent = value;
    td.classList.add(name);
    tr.appendChild(td);
    return td;
}

function recountTotal() {
	let costs = table.querySelectorAll('.cost');
    let sum = 0;
	if (costs) {
        for (const cost of costs) {
            sum += +cost.textContent;
        }
		total.textContent = sum; 
	}
}

function allowEdit(td) {
	td.addEventListener('dblclick', function() {
		td.textContent = '';
        let input = document.createElement('input');
        td.appendChild(input);
        input.focus();
        input.addEventListener('keydown', function(event) {
            if (event.key == 'Enter') {
                td.textContent = this.value;
            }
            input.addEventListener('keydown', function(event) {
                if (event.key == 'Enter') {
                    td.textContent = this.value;
    
                    if (td.classList.contains('price') || td.classList.contains('amount')) {
                        if (td.classList.contains('price')) {
                            let cost_td = td.nextElementSibling.nextElementSibling
                            cost_td.textContent = +td.textContent * +td.nextElementSibling.textContent
                        }
                        else {
                            let cost_td = td.nextElementSibling
                            cost_td.textContent = +td.textContent * +td.previousElementSibling.textContent
                        }
                        recountTotal()
                    }
                }
            });
        })
	});
}