import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams }) {
  try {
    const accounts = await getUserAccounts().catch(() => []);
    const editId = searchParams?.edit;

    let initialData = null;
    if (editId) {
      try {
        const transaction = await getTransaction(editId);
        initialData = transaction;
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    }

    return (
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex justify-center md:justify-normal mb-8">
          <h1 className="text-5xl gradient-title ">{editId ? 'Edit' : 'Add'} Transaction</h1>
        </div>
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!editId}
          initialData={initialData}
        />
      </div>
    );
  } catch (error) {
    console.error('Transaction page error:', error);
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Unable to load transaction form. Please try again later.</p>
      </div>
    );
  }
}
