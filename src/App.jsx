import { useState, useEffect } from 'react'
import ListItem from './components/ListItem';
import { formatValueToMoney } from './helpers';

//let expenses = []; //|| localStorage.getItem('expenses');

function App() {

    const [selectedType, setSelectedType] = useState('');
    const [expenses, setExpenses] = useState(() => {
        const expenses = localStorage.getItem('expenses');
        return expenses ? JSON.parse(expenses) : [];
    }
    );
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const expenseItem = {
        id: 0,
        description : '',
        amount : 0,
        type : ''
    }

    const typesExpenses = [
        { value: '', name: 'Select Type Expense' },
        { value: 'food', name: 'Food' },
        { value: 'transport', name: 'Transport' },
        { value: 'laundry', name: 'Laundry' }
    ]

    const handleSelectType = (e) => {
        setSelectedType(e.target.value);
    }

    const handleSetExpenseDescription = (e) => {
        setExpenseDescription(e.target.value);
    }

    const handleSetExpenseAmount = (e) => {
        const value = parseInt(e.target.value, 10);
        if(value <= 0 || isNaN(value)) return;
        
        setExpenseAmount(value);
    }

    const handleClickButton = () => {

        let hiddenError;
        let expenseId = Date.now();
        const errorMessageDiv = document.getElementById('error-message');
        const arrayErrors = [];

        if (expenseDescription === '' ) {
            arrayErrors.push('Description is required');
            hiddenError = true;
        }
        if (expenseAmount === 0) {
            arrayErrors.push('Amount is required');
            hiddenError = true;
            
        }
        if (selectedType === '') {
            arrayErrors.push('Type is required');
            hiddenError = true;
        }

        if (hiddenError) {
            errorMessageDiv.classList.remove('hidden');
            errorMessageDiv.innerHTML = arrayErrors.join('<br>');
            setTimeout(() => {
                errorMessageDiv.classList.add('hidden')
            }, 3000);
            return;
        }

        expenseItem.id = expenseId;
        expenseItem.description = expenseDescription;
        expenseItem.amount = expenseAmount;
        expenseItem.type = selectedType;
        setExpenses([...expenses, {...expenseItem}]);
        resetExpense();
    }

    
    function resetExpense() {
        expenseItem.id = 0;
        expenseItem.description = '';
        expenseItem.amount = 0;
        expenseItem.type = '';
        setExpenseDescription('');
        setExpenseAmount(0);
        setSelectedType('');
    }

    function handleClickDelete(e) {
        const expenseId = parseInt(e.target.dataset.id);
        setExpenses(expenses.filter(expense => expense.id !== expenseId));
    }


    useEffect(() => {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalAmount(total);
      }, [expenses]);

    //localStorage expenses useEffect
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
      }
    , [expenses]);
  

  return (

    <div className="bg-gray-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-4 font-bold text-blue-700">Expense Tracker</h1>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-4 font-bold text-blue-700">with React</h1>

        <form id="form" className="w-full px-2 sm:px-0 sm:max-w-md mx-auto space-y-2 sm:space-y-4">

            <label htmlFor="description" className="w-full max-w-md text-lg font-bold mb-2">Description:</label>
            <input type="text" id="description" name="description" 
            className="w-full max-w-md px-3 py-2 mb-4 text-lg border rounded-lg focus:outline-none focus:shadow-outline" 
            onChange={handleSetExpenseDescription}
            value={expenseDescription}
            />

            <label htmlFor="amount" className="w-full max-w-md text-lg font-bold mb-2">Amount:</label>
            <input type="number" id="amount" name="amount" 
            className="w-full max-w-md px-3 py-2 mb-4 text-lg border rounded-lg focus:outline-none focus:shadow-outline" 
            onChange={handleSetExpenseAmount}
            value={expenseAmount}
            />
        
            <label htmlFor="type" className="w-full max-w-md text-lg font-bold mb-2">Type:</label>
            <select 
                id="type"
                name="type"
                className="w-full max-w-md px-3 py-2 mb-4 text-lg border rounded-lg focus:outline-none focus:shadow-outline"
                onChange={handleSelectType}
                value={selectedType}
                >
              {typesExpenses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
            </select>

            <button 
                type="button" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={ handleClickButton }
                >
                Save Expense
            </button>
        </form>

        <div id="error-message" className="hidden text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl my-4 font-bold text-red-600"></div>
        

        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-4 font-bold text-blue-700">Expense History</h2>
        <ul id="expense-list" name="expense-list" className="list-none  my-4 flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
            {expenses.map((expense) => (
                <ListItem 
                    key={expense.id}
                    id = {expense.id} 
                    description={expense.description} 
                    amount={expense.amount} 
                    type={expense.type} 
                    handleDelete={ handleClickDelete}/>
            ))}

        </ul>
               
        <div id="total-amount" className="mx-auto text-center items-center bg-gray-800 text-white p-4 rounded font-mono max-w-md">
            <label htmlFor="totalAmount" className="w-full text-xl sm:text-2xl md:text-4xl lg:text-4xl font-bold mb-2">Total Amount</label>
            <div>
            <span id="total" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{formatValueToMoney(totalAmount)}</span>
            </div>
        </div>
    </div>
</div>
  )
}

export default App
