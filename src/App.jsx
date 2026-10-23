
import { useState } from 'react'

function App() {
   const [title, setTitle] = useState('')     //stores the expense name
  const [amount, setAmount] = useState('')   //stores the enetred amount
  const [expenses, setExpenses] = useState([])   //stores all expenses objects in an array
  const [category, setCategory] = useState('Food')
  const [filter, setFilter] = useState('All')
  const [editId, setEditId] = useState(null)


  function addExpense(e) {
    e.preventDefault()

    if (!title.trim() || Number(amount) <= 0) {
      return
    }

    
    const newExpense = {    //ek expense ka object bnata h
      id: Date.now(),         //expense k lie id bnata h
      title: title,
      amount: Number(amount),
      category: category
    }

    setExpenses([...expenses, newExpense])    //purane expenses k saath nya expense add krta h
    setTitle('')    //input clear krta h
    setAmount('')
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id))   //is condition se match krke new array bnaega mtlbb jiski id delete krne wali id k equal h vo new array m nhi aaega
  }

  function editExpense(expense) {
  setTitle(expense.title)
  setAmount(String(expense.amount))
  setCategory(expense.category)
  setEditId(expense.id)
  }

  function updateExpense(e) {
  e.preventDefault()

  if (!title.trim() || amount === '' || Number(amount) <= 0) {
    return
  }

  setExpenses(
    expenses.map((expense) =>
      expense.id === editId
        ? {
            ...expense,
            title: title,
            amount: Number(amount),
            category: category
          }
        : expense
    )
  )

  setTitle('')
  setAmount('')
  setCategory('Food')
  setEditId(null)
}

  

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  )
  
  const filteredExpenses =
  filter === 'All'
    ? expenses
    : expenses.filter((expense) => expense.category === filter)


  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-blue-50 to-pink-100 px-4 py-10">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl sm:p-8">
        <h1 className="mb-5 bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-3xl font-extrabold text-transparent">
          Expense Tracker
        </h1>

        <h2 className="mb-5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 p-5 text-2xl font-bold text-white shadow-lg">
          Total: ₹{total}
        </h2>

        <form
          onSubmit={editId !== null ? updateExpense : addExpense}
          className="space-y-3"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Expense title"
            className="w-full rounded-xl border border-violet-200 bg-white p-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full rounded border p-3"
          />
          
          <select
           value={category}
           onChange={(e) => setCategory(e.target.value)}
           className="w-full rounded border p-3"
          >
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 p-3 font-semibold text-white shadow-md transition hover:scale-[1.01] hover:shadow-lg"
          >
            {editId !== null ? 'Update Expense' : 'Add Expense'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {filteredExpenses.length === 0 ? (
          <p className="py-6 text-center text-gray-500">
          No expenses found.
          </p>
          ) : (
          filteredExpenses.map((expense) => (  //expenses array pr iterarte krta h or saari entries ko screen pr dikhaega
            <div
              key={expense.id}   //hrr entry ko uniqely identify krne m help krta h
              className="flex flex-col gap-3 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{expense.title}</p>
                <p>₹{expense.amount}</p>
                <p className="text-sm text-gray-500">
                    {expense.category}
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => editExpense(expense)}
                className="rounded bg-yellow-500 px-3 py-2 text-white"
              >
              Edit
              </button>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="rounded bg-red-500 px-3 py-2 text-white"
              >
                Delete
              </button>
            </div>
          ))
        )}
        </div>
      </div>
    </div>
  )
}

export default App
