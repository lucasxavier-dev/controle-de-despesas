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

const addTransactionIntoDOM = ({ amount, name, id}) => {
    const operator = amount < 0 ? '-' : '+';
    const amountWithoutOperator = Math.abs(amount)
    const CSSClasses = amount < 0 ? 'minus' : 'plus';
    const li = document.createElement('li');

    li.classList.add(CSSClasses);
    li.innerHTML = `
        
        ${name}
         <span>${operator} R$ ${Math.abs(amountWithoutOperator)}</span>
        
        <button class="delete-btn" onclick="removeTransaction(${id})">x</button>        
        `   //interplolação
    console.log(li)

    transactionsUl.prepend(li)
}
    // expensesBlock --------
const getExpenses = (transactionAmounts) => Math.abs(transactionAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2));


    //incomeBlock -------- 
const getIncome = transactionAmounts => transactionAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

    // totalBlock
const getTotal = transactionAmounts => transactionAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);



const updateBalanceValues = () => {             //map utilizado para pegar os arrays e transformar em apenas um array
    const transactionAmounts = transactions.map(({amount}) => amount);
    const total = transactionAmounts
    const income = getIncome(transactionAmounts) 
    // Math.abs - remove symbol minus
    const expense = getExpenses(transactionAmounts)
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
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

const generateID = () => Math.round(Math.random() * 1000);

    const addToTransactionsArray = (transactionName, transactionAmount) => {
        transactions.push({
            id: generateID(),
            name: transactionName,
            amount: Number(transactionAmount)})
    };

const clearInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = '' 
};


const handleFormSubmit = event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === '' || transactionAmount === '';


    if (isSomeInputEmpty) {
        alert('Por favor preencha o Nome e o Valor da transação')
        return
    }


        addToTransactionsArray(transactionName, transactionAmount)
        init()
        updateLocalStorage()
        clearInputs()


}
    form.addEventListener('submit', handleFormSubmit)
 
    //Para exibir a operação desejadaz, ele verifica o valor do número