const transactionsUl = document.querySelector('#transactions');

const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

// aplicação de api localstorage
    const localstorageTransactions = JSON.parse(localStorage
        .getItem('transactions'));
    
        let transactions = localStorage
    .getItem('transactions') !== null ? localstorageTransactions : [];

    const removeTransaction = ID => {
        transactions = transactions.filter(transaction => transaction.id !== ID);
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const amountWithoutOperator = Math.abs(transaction.amount)
    const CSSClasses = transaction.amount < 0 ? 'minus' : 'plus';
    const li = document.createElement('li');

    li.classList.add(CSSClasses);
        li.innerHTML = `
        
        ${transaction.name}
         <span>${operator} R$ ${Math.abs(amountWithoutOperator)}</span>
        
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>        
        `   //interplolação
        console.log(li)

    transactionsUl.prepend(li) 
                    // 
}

const updateBalanceValues = () => {             //map utilizado para pegar os arrays e transformar em apenas um array
    const transactionAmonts = transactions
        .map(transaction => transaction.amount);

    const total = transactionAmonts
        .reduce((accumulator, transaction) => accumulator + transaction, 0);

    const income = transactionAmonts
        .filter(value => value > 0)
        .reduce((accumulator,value) => accumulator + value, 0)
        .toFixed(2);    
                        // Math.abs - remove symbol minus
    const expense = Math.abs(transactionAmonts
        .filter(value => value < 0)
        .reduce((accumulator,value) => accumulator + value, 0)
        .toFixed(2));
        balanceDisplay.textContent = `R$ ${total}`
        incomeDisplay.textContent =  `R$ ${income}`
        expenseDisplay.textContent = `R$ ${expense}`
    console.log(expense)
}

const init = () => {     //forEach utilizado para acessar cada uma das arrays
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues(); 
}

init();

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)


form.addEventListener(`submit`, event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount =  inputTransactionAmount.value.trim();


    if (transactionName  === '' || transactionAmount === '') {
        alert('Por favor preencha o Nome e o Valor da transação')
        return
    }

        const transaction = {
             id: generateID(), 
             name: transactionName, 
             amount: Number(transactionAmount)
        }

            transactions.push(transaction)
            init()
            updateLocalStorage()

            inputTransactionName.value = ''
            inputTransactionAmount.value = ''

});
    //Para exibir a operação desejadaz, ele verifica o valor do número