import React from 'react'
import TransactionForm from '../_components/transaction-form'

function NewTransactionPage() {
  return (
    <div>
         <h1 className="text-xl font-bold">New Transaction</h1>
         <TransactionForm />
    </div>
  )
}

export default NewTransactionPage